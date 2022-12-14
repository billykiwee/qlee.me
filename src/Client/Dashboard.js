import React, { useEffect } from 'react'
import { useState } from 'react'
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import Container from '../App/components/Container'
import Header from '../App/components/Header';
import { useStateValue } from '../App/components/StateProvider';
import { db } from '../App/database/firebase';
import getFavicon from '../App/utils/getFavicon';
import { isValidUrl } from '../App/utils/isValidUrl';
import { minimizeString } from '../App/utils/minimizeString';
import UniqueID from '../App/utils/uniqueID';
import { ProfilImg } from '../Website/Home';


const MAX_LINK_BEFORE_UPDATE = 10


export default function Dashboard() {


    const [{user}] = useStateValue()

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


    const [Input,setInput] = useState('')
    const [NameLink,setNameLink] = useState('')

    const [Error, setError] = useState('')

    
    function createLink(input) {

        if (Input.length < 1 || !isValidUrl(Input)) throw setError('Tu dois rentrer un URL valide')
        
        const linkID = 'localhost:3000/' + UniqueID('', 5)
                    
        if (MAX_LINK_BEFORE_UPDATE > UserLinks.length) {
    
            let link = {
                name: NameLink.length < 1 ? isValidUrl(Input).hostname : NameLink,
                id : linkID.split('/')[1],
                user: user?.email,
                link: isValidUrl(Input).href,
                shortLink: linkID,
                date: Date(),
                views: 0
            }    

            
            setUserLinks([...UserLinks, link])

            db.collection('DB').doc('links').collection(link.user).doc(link.id).set(link)

            db.collection('DB').doc('links').collection('links').doc(link.id).set(link)
        }
    }    



    return (

        <Container>

            <Header/>

            <div className='grid gap-2rem blocks' >

                <div className='grid gap-2rem'>
                    <div className='grid'>
                        <div className='display gap-1rem' style={{overflowX: 'scroll'}}>
                            <div className='display'>
                                <img width={244} height={244} className='border-r-2' src='https://images.unsplash.com/photo-1664574654589-8f6c9b94c02d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80' />
                            </div>
                            <div className='display'>
                                <img width={244} height={244} className='border-r-2' src='https://images.unsplash.com/photo-1572456606764-80a4f00cbe52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60' />
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-2rem '>
                        <div className='grid gap'>
                            <div>
                                <span className='f-s-25 f-w-500'>Créer un lien</span>
                            </div>
                            <div className='grid gap-1rem'>
                                <div className='grid gap'>
                                    <div className='display w-100p'>
                                        <input type='text' onChange={e=> {setNameLink(e.target.value); setError('')}} className='div-input h-3 border-r-1 w-100p white' placeholder='Créer le nom du lien' />
                                    </div>
                                    <div className='display w-100p'>
                                        <input type='text' onChange={e=> {setInput(e.target.value); setError('')}} className='div-input h-3 border-r-1 w-100p white' placeholder='Enter your website URL' />
                                    </div>
                                </div>
                                <div className='display'>
                                    <button onClick={e=> createLink(Input)} className='border-r-1 blue h-3 p-lr-2 border-b hover-blue' >
                                        <span className='f-s-16'>Créer</span>
                                    </button>
                                </div>
                            </div>

                            {
                                Error && 
                                <div className='display justify-c'>
                                    <small className='c-red'>{Error}</small>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className='grid gap-1rem'>
                    <div className='grid gap'>
                        <div className='display justify-s-b'>
                            <span className='f-s-25 f-w-500'>Mes liens</span>
                            <div className='display gap-04 border-r-04 yellow p-04 click'>
                                <small className='c-black'>{UserLinks.length} / {MAX_LINK_BEFORE_UPDATE}</small>
                                <div className='display justify-c'>
                                    <span className='display'>
                                        <img src='/images/lock-solid.svg' width={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            UserLinks
                            .map(userlink=> {
                                return (
                                    <div className='display gap p-1 border-b border-r-1 border justify-s-b white h-3' key={userlink?.id}>
                                        <div className='display gap-1rem'>
                                            <Link to={'/edit/' + userlink?.shortLink.split('/')[1]}>
                                                <img src={getFavicon(userlink?.link)} className='w-2 h-2 border-r-100' />
                                            </Link>
                                            <div className='grid '> 
                                                <div className='display gap'>
                                                    <span className='f-s-16'>{minimizeString(userlink?.name, 10)}</span>
                                                </div>

                                                <div className='grid gap'>
                                                    <div className='display gap'>
                                                        <a href={userlink?.link} rel="noopener noreferrer" className='link'>{userlink?.shortLink}</a>
                                                        <div className='display gap'>
                                                            <button 
                                                                className='display border-r-04 w-2 hover h-2 border border-b' 
                                                                onClick={e=> {
                                                                    navigator.clipboard.writeText(userlink?.shortLink)
                                                                    let div = document.querySelector('#link-' + userlink?.id)
                                                                    div.style.display = 'flex'
                                                                    setTimeout(e=> div.style.display = 'none', 1500)
                                                                }} 
                                                            >
                                                                <img src='/images/copy.svg' width={16} />
                                                            </button>
                                                            <div className='display disable green absolute border-r-04 p-04' id={'link-' + userlink?.id} >
                                                                <small>Copié</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={'/edit/' + userlink?.shortLink.split('/')[1]}>
                                                <button className='grey hover'>
                                                    <span className='f-w-300'>Modifier</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }).reverse()
                        }

                    </div>
                    <div className='display justify-c'>
                        {
                            UserLinks.length < MAX_LINK_BEFORE_UPDATE 
                            ?
                            <div className='display gap'>
                                <img src='/images/info.svg' className='w-1 h-1 opacity'  />
                                <small className='c-grey f-w-300'>Il te reste encore {MAX_LINK_BEFORE_UPDATE - UserLinks.length} liens gratuit</small>
                            </div>
                            :
                            <div className='grid gap-04'>
                                <div className='display gap'>
                                    <img src='/images/info.svg' className='w-1 h-1'  />
                                    <small className='c-red f-w-300'>Tu dois upgrade ton compte</small>
                                </div>
                                <div className='display justify-c'>
                                    <a className='f-w-300 link'>Voir les plans</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>


            

        </Container>
    )
}
