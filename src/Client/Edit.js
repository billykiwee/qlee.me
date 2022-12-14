import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../App/components/Container'
import { db } from '../App/database/firebase'
import getFavicon from '../App/utils/getFavicon'
import formatDate from '../App/utils/formatDate'
import QRCode from 'react-qr-code'
import Header from '../App/components/Header'
import { minimizeString } from '../App/utils/minimizeString'
import { isValidUrl } from '../App/utils/isValidUrl'
import Popup, { PopUpcontent } from '../App/components/Popup'
import { useStateValue } from '../App/components/StateProvider'
import QRcode from './views/QRcode'



export default function Edit() {

    const { LinkID } = useParams()

    const [{user}] = useStateValue()

    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        db.collection('DB').doc('links').collection('links').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })

    }, [])


    function getLink() {
        let data = []
        for (const v in UserLinks) {
            if (UserLinks[v].user === user?.email) {
                if (UserLinks[v].id === LinkID) data.push(UserLinks[v])
            }
        }
        return data
    }

    const Link = getLink()


    const [Message, setMessage] = useState({})

    function preDeleteLink() {
        setMessage({
            title: 'Attention',
            message: 'Vous êtes sur le point de supprimer ce lien',
            question: 'Voulez-vous continuer ?',
            buttonText: 'Supprimer',
            buttonColor: 'red',
            valid: () => deleteLink(),
            close: () => setMessage({}),
            statu: 'error'
        })
    }

   function deleteLink() {


        db.collection('DB').doc('links').collection('links').doc(Link[0].id).delete()

        db.collection('DB').doc('links').collection(user?.email).doc(Link[0].id).delete()
        .then(e=> {
            window.location.href = '/dashboard'
        })
    }


    const [editLink, seteditLink] = useState({})

    const [tag, settag] = useState('')

    function addTags() {

        let error = ''

        if (tag.length > 0) {
            if (Link.tags.length < 10) {
    
                db.collection('DB').doc('links').collection('links').doc(Link.id).update({
                    tags : [
                        ...Link.tags,
                        tag
                    ]
                })
                db.collection('DB').doc('links').collection('user').doc(Link.id).update({
                    tags : [
                        ...Link.tags,
                        tag
                    ]
                })
                .then(e=> document.querySelector('.tags').value = '' )
            }
            else {
                setMessage({
                    title: 'Erreur',
                    message: "Vous pouvez ajouter que 10 tags",
                    buttonText: 'Continuer',
                    buttonColor: 'blue',
                    valid: () => setMessage({}),
                    close: () => setMessage({}),
                    statu: 'error'
                })
            }
        }

    }

    function deleteTag(tag) {

        let array = Link.tags

        db.collection('DB').doc('links').collection('links').doc(Link.id).update({
            tags : array.filter(e=> e !== tag)
        })
        db.collection('DB').doc('links').collection('user').doc(Link.id).update({
            tags : array.filter(e=> e !== tag)
        })
    }


    function EditLink() {

        db.collection('DB').doc('links').collection('links').doc(Link.id).update(editLink)
        db.collection('DB').doc('links').collection('user').doc(Link.id).update(editLink)
    }





   /*  document.querySelector('.tiktok-1czmy9n-DivVideoList').remove()
    document.querySelector('.tiktok-1sb4dwc-DivPlayerContainer').remove()

    
    setInterval(e=> {
        document.querySelector('html').scrollTop = 10000000
        document.querySelectorAll(".tiktok-1h2vtn9-PReplyActionText").forEach(e=> e.click())
        
        console.warn(document.querySelectorAll('.tiktok-q9aj5z-PCommentText'));
    }, 0)
    
    let allCommentsLenght = Number(document.querySelector('.tiktok-1xwyks2-PCommentTitle').innerHTML.split(' com'))

 */



    const [QrCode,setQrCode] = useState('')

     return (

        <>
            <Popup content={Message} />
            <QRcode link={QrCode} close={e=> setQrCode('')} />
            <Container>
                
                    <Header />

                    <div>
                        <h2>Modifier le lien</h2>
                    </div>

                    <div>
                        {
                            Link?.map(data=> {

                                return (
                                    <div className='grid gap-2rem' key={data.id}>

                                        <div className='grid blocks gap-2rem'>

                                            <div className='display align-top'>
                                                <div className='grid gap white border-r-1 border-b p-1 w-100p'>
                                                    <div className='display justify-s-b'>
                                                        <div className='display gap'>
                                                            <img src={getFavicon(data.link)} className='w-3 h-3 border-r-100' />
                                                            <div className='grid'>
                                                                <span className='f-s-18'>{minimizeString(data.name, 30)}</span>
                                                                <div className='display gap'>
                                                                    <a href={data.link} rel="noopener noreferrer" className='link f-s-18'>{data.shortLink}</a>
                                                                    <div>
                                                                        <button className='display border-r-04 w-2 h-2 border border-b' onClick={e=> navigator.clipboard.writeText(data.shortLink)} >
                                                                            <img src='/images/copy.svg' className='w-1 h-1' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='display gap'>
                                                            <img src='/images/eye.svg' className='opacity w-1 h-1' />
                                                            <span className='c-grey f-w-300'>{data.views} vues</span>
                                                        </div>
                                                    </div>
                                                    <div className='grid shadow margin-auto p-1 border-r-1 border gap'>
                                                        <div className='display justify-c'>
                                                            <span className='f-s-20'>Qr code</span>
                                                        </div>
                                                        <QRCode
                                                            onClick={e=> setQrCode(data.link)}
                                                            bgColor={'white'}
                                                            fgColor={'black'}
                                                            className='click'
                                                            size={122}
                                                            value={data.link}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid gap-2rem'>
                                                <div className='grid gap-1rem'>
                                                    <div className='grid gap-04 w-100p'>
                                                        <span>Modifier le nom</span>
                                                        <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={data.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                                    </div>
                                                    <div className='grid gap-04 w-100p'>
                                                        <span>Modifier le lien principal</span>
                                                        <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={data.link} onChange={e=> seteditLink({...editLink, link : e.target.value})} />
                                                    </div>

                                                    {
                                                        2 + 2 === 4 
                                                        ?
                                                        <>
                                                            <div className='grid gap-04 w-100p'>
                                                                <div className='display gap'>
                                                                    <span>Modifier le lien court</span>
                                                                    <div className='display click'>
                                                                        <div className='display justify-c yellow border-r-04 w-1 p-04'>
                                                                            <span className='display'>
                                                                                <img src='/images/lock-solid.svg' width={14} />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <input type='text' className='div-input h-3 border-r-1 w-100p opacity no-click' placeholder={data.shortLink} onChange={e=> seteditLink({...editLink, shortLink : e.target.value})} />
                                                            </div>
                                                            <div className='grid gap-04 no-click'>
                                                                <div className='display gap'>
                                                                    <span>Ajout de fonctionnalités</span>
                                                                    <div className='display click'>
                                                                        <div className='display justify-c yellow border-r-04 w-1 p-04'>
                                                                            <span className='display'>
                                                                                <img src='/images/lock-solid.svg' width={14} />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='grid gap-04 opacity'>
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
                                                        :
                                                        <div className='grid gap-04 w-100p'>
                                                            <div className='display gap'>
                                                                <span>Modifier le lien court</span>
                                                                <div className='display'>
                                                                    <div className='display justify-c yellow border-r-04 w-1 p-04'>
                                                                        <span className='display'>
                                                                            <img src='/images/lock-solid.svg' width={14} />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={data.shortLink} onChange={e=> seteditLink({...editLink, shortLink : e.target.value})} />
                                                        </div>
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
                                                                <button className='grey border-b borde-r-1 border h-3' onClick={addTags}>
                                                                    <span>ajouter</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='display gap wrap'>
                                                            {
                                                                data.tags?.map(tag=> {
                                                                    return (
                                                                        <div className='display blue-secondary border-r-04 p-lr-04 click gap-1rem'>
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
                                                        <button className='border-r-1 blue h-3 p-lr-2 border-b hover-blue' onClick={EditLink} >
                                                            <span className='f-s-16'>Modifier</span>
                                                        </button>
                                                    </div>
                                                    <button className='red hover-red h-3 border-b border-r-1' onClick={preDeleteLink} >
                                                        <span className='f-s-16'>Supprimer le lien</span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>   


                                    </div>
                                ) 
                            })
                        } 
                    </div>

            </Container>
        </>
    )
}
