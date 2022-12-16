import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../App/components/Container'
import { db } from '../App/database/firebase'
import getFavicon from '../App/utils/getFavicon'
import formatDate from '../App/utils/formatDate'
import QRCode from 'react-qr-code'
import { minimizeString } from '../App/utils/minimizeString'
import { isValidUrl } from '../App/utils/isValidUrl'
import Popup, { PopUpcontent } from '../App/components/Popup'
import { useStateValue } from '../App/components/StateProvider'
import Main from '../App/components/Main'
import Messages from '../App/utils/Messages'
import {makeFriendly} from '../App/utils/makeFriendly'



export default function Edit() {


    const { LinkID } = useParams()

    const [{user}] = useStateValue()


    const [User, setUser] = useState([])

    useEffect(e=> {
        db.collection('users').onSnapshot(snapshot => {
            setUser(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    const isUserPremium = User.filter(e=> e.email === user?.email).map(e=> e)[0]?.plan !== 'FREE'


    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        const getUser = new Promise((resolve, reject) => {
            resolve(user?.email)
        })

        getUser
        .then(userEmail => {
            db.collection('DB').doc('links').collection(userEmail).orderBy('date').onSnapshot(snapshot => {
                setUserLinks(snapshot.docs.map(doc => doc.data()))
            })
        })

    }, [user])



    function getLink() {
        for (const v in UserLinks) {
            if (UserLinks[v].user === user?.email) {
                if (UserLinks[v].id === LinkID) return UserLinks[v]
            }
        }
    }

    const Link = getLink()



    const [PopUpMessage, setPopUpMessage] = useState({})


    function preDeleteLink() {
        setPopUpMessage({
            title: 'Attention',
            message: 'Vous êtes sur le point de supprimer ce lien',
            question: 'Voulez-vous continuer ?',
            buttonText: 'Supprimer',
            buttonColor: 'red',
            valid: () => deleteLink(),
            close: () => setPopUpMessage({}),
            statu: 'question'
        })
    }

    function deleteLink() {

        setPopUpMessage({loader: true})

        db.collection('DB').doc('links').collection('links').doc(Link.id).delete()

        db.collection('DB').doc('links').collection(user?.email).doc(Link.id).delete()
        .then(e=> {
            setPopUpMessage({loader: false})
            window.location.href = '/dashboard'
        })
    }


    const [editLink, seteditLink] = useState({})

    const [tag, settag] = useState('')

    function addTags() {

        if (tag.length > 0) {

            let conditions = {
                tags : Link.tags ?? [],
                maxLength: 10
            }

            if (conditions.tags.length >= conditions.maxLength + 1) {
                setPopUpMessage({
                    title: 'Erreur',
                    message: "Vous pouvez ajouter que 10 tags",
                    buttonText: 'Continuer',
                    buttonColor: 'blue',
                    valid: () => setPopUpMessage({}),
                    close: () => setPopUpMessage({}),
                    statu: 'error'
                })
            }
            else {

                db.collection('DB').doc('links').collection(user?.email).doc(Link.id).update({
                    tags : [
                        ...conditions.tags,
                        tag
                    ]
                })
                db.collection('DB').doc('links').collection('links').doc(Link.id).update({
                    tags : [
                        ...conditions.tags,
                        tag
                    ]
                })
                .then(e=> {
                    document.querySelector('.tags').value = '' 
                    settag('')
                })
            }


        }

    }

    function deleteTag(tag) {

        let array = Link.tags

        db.collection('DB').doc('links').collection(user?.email).doc(Link.id).update({
            tags : array.filter(e=> e !== tag)
        })
        db.collection('DB').doc('links').collection('user').doc(Link.id).update({
            tags : array.filter(e=> e !== tag)
        })
    }



    function EditLink() {

        if (Object.values(editLink).length === 0) return 

        async function Check() {
            
            if (editLink.name) {
                if (editLink.name.length > 40)
                throw {id:'name', error: 'Le nom doit faire entre 0 et 40 charactères'}
            }
            if (editLink.nurlame) {
                if (!isValidUrl(editLink.url)) 
                throw {id:'url', error:'Tu dois rentrer une URL valide'}
            }
        }

        Check()
        .then(valid=> {

            db.collection('DB').doc('links').collection('links').doc(Link.id).update(editLink)
            db.collection('DB').doc('links').collection(user?.email).doc(Link.id).update(editLink)

            document.querySelector('#error-name').innerHTML = ''
            document.querySelector('#error-url').innerHTML = ''
        })
        .then(e=> {
            document.querySelectorAll('input').forEach(e=> e.value = '')

            seteditLink({})

            setPopUpMessage({
                title: 'Modifications enregistrées',
                message: 'Le lien à bien été modifié',
                buttonText: 'Continuer',
                buttonColor: 'blue',
                valid: () => setPopUpMessage({}),
                close: () => setPopUpMessage({}),
                statu: 'success'
            })
        })
        .catch(e=> {
           document.querySelector('#error-'+ e.id).innerHTML = e.error
        })
    }




    const [QrCode,setQrCode] = useState(false)

    function downloadQRCode(data) {
        const svg = document.getElementById('qr-code-svg');
        let downloadLink = document.createElement('a');
        downloadLink.href = 'data:image/svg;base64,' + btoa(svg.outerHTML)

        downloadLink.download = 'qr-code.svg'
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }




    console.log(isUserPremium);




    return (

         <>
        {
            PopUpMessage?.loader
            ? <Messages loader={PopUpMessage?.loader}/>
            :
            <Main>

                    <Popup content={PopUpMessage} />
                    <div className='display'>
                        <h2>Modifier le lien</h2>
                    </div>

                    <div>
                        {
                            Link &&
                            <div className='grid gap-2rem' key={Link.id}>

                                <div className='grid blocks gap-2rem'>

                                    <div className='grid gap'>

                                        <div className='display align-top'>
                                            <div className='grid gap white border-r-1 border-b p-1 w-100p'>
                                                <div className='display justify-s-b'>
                                                    <div className='display gap w-100p'>
                                                        <a href={Link.url} className='display '>
                                                            <img src={getFavicon(editLink.url ? editLink.url : Link.url)} className='w-2 h-2 border-r-100' />
                                                        </a>

                                                        <div className='grid w-100p'>

                                                            <div className='display justify-s-b w-100p'>
                                                                <span>{editLink.name ? editLink.name : minimizeString(Link.name, 30)}</span>
                                                                <div className='display justify-c'>
                                                                    <small className='text-align-e c-grey'>{Link.views} clics</small>
                                                                </div>
                                                            </div>

                                                            <div 
                                                                className='display gap' 
                                                                onClick={e=> {
                                                                    navigator.clipboard.writeText(Link.shortLink)
                                                                    let div = document.querySelector('#link-' + Link.id)
                                                                    div.style.display = 'flex'
                                                                    setTimeout(e=> div.style.display = 'none', 1500)
                                                                }}
                                                             >
                                                                <span className='link f-s-20 f-w-500'>{Link.shortLink}</span>
                                                                <div className='display gap'>
                                                                    <button 
                                                                        className='display border-r-04 gap-04 hover h-2 border border-b' 
                                                                    >
                                                                        <img src='/images/copy.svg' width={16} />
                                                                    </button>
                                                                    <div className='display disable green absolute border-r-04 p-04' id={'link-' + Link.id} >
                                                                        <small>Copié</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='display align-top'>
                                            <div className='grid gap white border-r-1 border-b p-1 w-100p'>
                                                <div className='display justify-s-b'>
                                                    <div className='display gap'>
                                                        <div className='display p-04 border-r-04 border shadow click' onClick={e=> setQrCode(Link.url)}>
                                                            <QRCode
                                                                onClick={e=> setQrCode(Link.url)}
                                                                bgColor='white'
                                                                fgColor='black'
                                                                className='w-2 h-2'
                                                                value={Link.url}
                                                            />
                                                        </div>
                                                        <div className='grid'>
                                                            <span>Qr code</span>
                                                        </div>
                                                    </div>
                                                    <div className='display gap'>
                                                        <button className='border-b h-2 blue hover-blue p-1 border-r-1 border' onClick={e=> setQrCode(QrCode ===true ? false : true)} >
                                                            <span className='display'>{QrCode ? 'Ok' : 'Voir'}</span>
                                                        </button>
                                                        <button className='border-b white hover w-40 h-40 p-1 border-r-04 border' onClick={e=> downloadQRCode(Link.url)} >
                                                            <span className='display'>
                                                                <img src='/images/dowload.svg' width={20} height={20} />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    QrCode &&
                                                    <div className='display w-100p justify-c'>
                                                        <div className='display white border-r-2 p-2 border border-b gap-1rem'>
                                                            <QRCode
                                                                id="qr-code-svg"
                                                                bgColor={'white'}
                                                                fgColor={'black'}
                                                                className='click'
                                                                level='H'
                                                                size={200}
                                                                value={Link.shortLink}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='grid gap-2rem'>
                                        <div className='grid gap-1rem'>
                                            <div className='grid gap-04 w-100p'>
                                                <span>Modifier le nom</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                                <small className='c-red' id='error-name'></small>
                                            </div>
                                            <div className='grid gap-04 w-100p'>
                                                <span>Modifier le lien principal</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.url} onChange={e=> seteditLink({...editLink, url : e.target.value})} />
                                                <small className='c-red' id='error-url'></small>
                                            </div>

                                            {
                                                !isUserPremium
                                                ?
                                                <>
                                                    <div className='grid gap-04 w-100p'>
                                                        <div className='display gap'>
                                                            <span>Modifier le lien court</span>
                                                            <GoToPricing />
                                                        </div>
                                                        <div className='opacity no-click'>
                                                            <input type='text' className='div-input h-3 border-r-1 w-100p ' placeholder={Link.shortLink} onChange={e=> seteditLink({...editLink, shortLink : e.target.value})} />
                                                            <small className='c-grey'>ex: loop.me/mon-lien-perso</small>
                                                        </div>
                                                    </div>
                                                    <div className='grid gap-04'>
                                                        <div className='display gap'>
                                                            <span>Fonctionnalités</span>
                                                            <GoToPricing />
                                                        </div>

                                                        <div className='grid gap-04 opacity no-click'>
                                                            <div className='display'>
                                                                <label htmlFor='active_views' className='display gap click'>
                                                                    <input type='checkbox' className='h-1' id='active_views' />
                                                                    <span className='f-w-300'>Activer les vues</span>
                                                                </label>
                                                            </div>

                                                            <div className='display no-click'>
                                                                <label htmlFor='active_adds' className='display gap click'>
                                                                    <input type='checkbox' className='h-1' id='active_adds' />
                                                                    <span className='f-w-300'>Activer la monétisation</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='grid gap-04 w-100p'>
                                                        <div className='display gap'>
                                                            <span>Modifier le lien court</span>
                                                        </div>
                                                        <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.shortLink} onChange={e=> seteditLink({...editLink, shortLink : e.target.value})} />
                                                    </div>
                                                    <div className='grid gap-04'>
                                                        <div className='display gap'>
                                                            <span>Fonctionnalités</span>
                                                        </div>

                                                        <div className='grid gap-04'>
                                                            <div className='display'>
                                                                <label htmlFor='active_views' className='display gap click'>
                                                                    <input type='checkbox' className='h-1' id='active_views' />
                                                                    <span className='f-w-300'>Activer les vues</span>
                                                                </label>
                                                            </div>

                                                            <div className='display'>
                                                                <label htmlFor='active_adds' className='display gap click'>
                                                                    <input type='checkbox' className='h-1' id='active_adds' />
                                                                    <span className='f-w-300'>Activer la monétisation</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                            }

                                            <div className='grid gap-04 w-100p'>
                                                <span>Ajouter des tags</span>
                                                <div className='display gap'>
                                                    <input 
                                                        type='text'
                                                        className='div-input h-3 border-r-1 w-100p white tags' 
                                                        placeholder='Entrer un tag'
                                                        onChange={e=> settag(e.target.value)}
                                                    />
                                                    <div className='display'>
                                                        <button className='white border-b borde-r-2 border h-3 p-lr-1' onClick={addTags}>
                                                            <span>ajouter</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='display gap wrap'>
                                                    {
                                                        Link.tags?.map(tag=> {
                                                            return (
                                                                <div className='display blue-secondary border-r-04 p-lr-1 p-04 click gap-04'>
                                                                    <div className='display'>
                                                                        <span>{tag}</span>
                                                                    </div>
                                                                    <div className='display' onClick={e=> deleteTag(tag)}>
                                                                        <span className='display'>
                                                                            <img src='/images/x.svg' width={12} height={12} />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <div className='grid gap'>
                                            <div className='display'>
                                                <button className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' onClick={EditLink} >
                                                    <span className='f-s-16'>Modifier</span>
                                                </button>
                                            </div>
                                            <div className='display'>
                                                <button className='red hover-red p-1 h-4 border-b border-r-1' onClick={preDeleteLink} >
                                                    <span className='f-s-16'>Supprimer le lien</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>   


                            </div>
                        }
                    </div>
            </Main>
            }

        </>

    )
}


function GoToPricing() {
    return (
        <Link to='/pricing'>
            <div className='display click'>
                <div className='display justify-c yellow border-r-04 border-b hover-yellow w-1 p-04'>
                    <span className='display'>
                        <img src='/images/lock-solid.svg' width={14} />
                    </span>
                </div>
            </div>
        </Link>
    )
}