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

export default function Edit() {

    const { LinkID } = useParams()


    const [UserLinks, setUserLinks] = useState([])
    useEffect(e=> {
        db.collection('DB').doc('links').collection('links').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    function getLink() {
        let link = []
        for (const v in UserLinks) {
            if (UserLinks[v].id === LinkID) link.push(UserLinks[v])
        }
        return link
    }

    const Link = getLink()


    function DeleteLink() {

        db.collection('DB').doc('links').collection('links').doc(Link[0].link).delete()

        db.collection('DB').doc('links').collection('links').doc(Link[0].id).delete()
        .then(e=> {
            window.location.href = '/dashboard'
        })
    }



    const [editLink, seteditLink] = useState({})

    function EditLink() {

        db.collection('DB').doc('links').collection('links').doc(Link[0].id).update(editLink)
        db.collection('DB').doc('links').collection('user').doc(Link[0].id).update(editLink)
    }


   /*  document.querySelector('.tiktok-1czmy9n-DivVideoList').remove()
    document.querySelector('.tiktok-1sb4dwc-DivPlayerContainer').remove()

    
    setInterval(e=> {
        document.querySelector('html').scrollTop = 10000000
        document.querySelectorAll(".tiktok-1h2vtn9-PReplyActionText").forEach(e=> e.click())
        
        console.warn(document.querySelectorAll('.tiktok-q9aj5z-PCommentText'));
    }, 0)
    
    let allCommentsLenght = Number(document.querySelector('.tiktok-1xwyks2-PCommentTitle').innerHTML.split(' com')[0])

 */





    return (
       <Container>

            <Header />

            <div>
                <h2>Modifier le lien</h2>
            </div>

            <div>
                {
                    getLink().map(data=> {
                        return (
                            <div className='grid gap-2rem' key={data.id}>

                                <div className='grid blocks gap-2rem'>

                                    <div className='grid gap white border-r-1 border-b p-1'>
                                        <div className='display justify-s-b'>
                                            <div className='display gap'>
                                                <img src={getFavicon(data.link)} className='w-3 h-3 border-r-100' />
                                                <div className='grid'>
                                                    <span className='f-s-18'>{minimizeString(data.name, 10)}</span>
                                                    <span className='f-s-18 link'>{data.shortLink}</span>
                                                </div>
                                            </div>
                                            <div className='display gap'>
                                                <img src='/images/eye.svg' className='opacity w-1 h-1' />
                                                <span className='c-grey f-w-300'>{data.views} cliques</span>
                                            </div>
                                        </div>
                                        <div className='grid shadow margin-auto p-1 border-r-1 border gap-1rem'>
                                            <div className='display justify-c'>
                                                <span className='f-s-20'>Qr code</span>
                                            </div>
                                            <QRCode
                                                bgColor={'white'}
                                                fgColor={'black'}
                                                className='click'
                                                size={122}
                                                value={data.link}
                                            />
                                        </div>
                                    </div>

                                    <div className='grid gap-1rem'>
                                        <div className='grid gap-1rem'>
                                            <div className='grid gap-04 w-100p'>
                                                <span>Modifier le nom</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder='Créer le nom du lien' onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                            </div>
                                            <div className='grid gap-04 w-100p'>
                                                <span>Modifier le lien principal</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={data.link} onChange={e=> seteditLink({...editLink, link : e.target.value})} />
                                            </div>

                                            {
                                                2 + 2 === 4 
                                                ?
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

                                            <div className='display'>
                                                <label htmlFor='active_views' className='display gap click'>
                                                    <input type='checkbox' className='h-1' id='active_views' />
                                                    <span className='f-w-300'>Activer les publicités</span>
                                                </label>
                                            </div>

                                            <div className='display'>
                                                <label htmlFor='active_adds' className='display gap click'>
                                                    <input type='checkbox' className='h-1' id='active_adds' />
                                                    <span className='f-w-300'>Activer les cliques</span>
                                                </label>
                                            </div>
                                            <div className='grid gap-04 w-100p'>
                                                <span>Ajouter des tags</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder='Créer le nom du lien' />
                                            </div>
                                            <div className='display'>
                                                <button className='border-r-1 blue h-3 p-lr-2 border-b hover-blue' onClick={EditLink} >
                                                    <span className='f-s-16'>Modifier</span>
                                                </button>
                                            </div>
                                        </div>


                                        <div>
                                            <button className='red hover-red h-3 border-b border-r-1' onClick={DeleteLink} >
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
    )
}
