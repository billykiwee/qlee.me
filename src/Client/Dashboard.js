import React, { useEffect } from 'react'
import { useState } from 'react'
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import Container from '../App/components/Container'
import Header from '../App/components/Header';
import { db } from '../App/database/firebase';
import getFavicon from '../App/utils/getFavicon';
import { minimizeString } from '../App/utils/minimizeString';
import { ProfilImg } from '../Website/Home';


const MAX_LINK_BEFORE_UPDATE = 100


export default function Game() {


    const [UserLinks, setUserLinks] = useState([])
    useEffect(e=> {
        db.collection('DB').doc('links').collection('user').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    const [Input,setInput] = useState(window.location.href)

    const [QrCodeGenerated, setQRCodeGenerated] = useState('')


    
    const [Error, setError] = useState('')
    
    function generateQRCode(input) {
        
        const char = 'azertyuiopqsdfghjklmwxcvbn_' + 'azertyuiopqsdfghjklmwxcvbn'.toLocaleUpperCase() + '1234567890'
        let linkID = 'loop.me/'
                    
        for (let i = 0; i < 5; i++) {
            linkID += char[Math.floor(Math.random() * char.length)]
        }   


        for (const v in UserLinks) {

            if (UserLinks[v].id !== linkID.split('/')[1]) {

                if (MAX_LINK_BEFORE_UPDATE > UserLinks.length) {
        
                    if (Input.includes('.')) {
        
                        setQRCodeGenerated(input) 
                
                        let link = {
                            name: '',
                            id : linkID.split('/')[1],
                            user: 'user',
                            link: input.toLowerCase(),
                            shortLink: linkID,
                            date: Date()
                        }    
        
                        
                        setUserLinks([...UserLinks, link])
        
                        db.collection('DB').doc('links').collection(link.user).doc(link.link).set(link)
        
                        db.collection('DB').doc('links').collection('links').doc(link.id).set(link)
                    }
                    else {
                        setError('Tu dois rentrer un URL valide')
                    }
                }
            }
        }


    }    



    return (

        <Container>

            <Header/>

            <div className='grid gap-2rem blocks' >

                <div className='grid gap-2rem'>
                    <div className='grid gap'>
                        <div>
                            <span className='f-s-25 f-w-500'>Créer un lien</span>
                        </div>
                        <div className='display gap'>
                            <div className='display w-100p'>
                                <input type='text' onChange={e=> {setInput(e.target.value); setError('')}} className='div-input h-3 border-r-1 w-100p white' placeholder='Enter your website URL' />
                            </div>
                            <div className='display'>
                                <button onClick={e=> generateQRCode(Input)} className='border-r-1 blue h-3 p-lr-2 border-b' >
                                    <span className='f-s-16'>Créer</span>
                                </button>
                            </div>
                        </div>
                        {
                            Error && 
                            <div className='display'>
                                <small className='c-red'>{Error}</small>
                            </div>
                        }
                    </div>

                </div>

                <div className='grid gap-2rem'>
                    <div className='grid gap'>
                        <div>
                            <span className='f-s-25 f-w-500'>Mes liens</span>
                        </div>
                        {
                            UserLinks
                            .filter(e=> e.date)
                            .map(userlink=> {
                                return (
                                    <div className='display gap p-1 border-b border-r-1 border justify-s-b white' id={userlink.id}>
                                        <div className='display gap-1rem w-50'>
                                            <a href={'https://' + QrCodeGenerated}>
                                                {/* <QRCode
                                                    bgColor={'white'}
                                                    fgColor={'black'}
                                                    className='click'
                                                    size={44}
                                                    value={QrCodeGenerated}
                                                /> */}
                                                <img src={getFavicon(userlink.link)} className='w-2 h-2 border-r-100' />
                                            </a>
                                            <div className='grid '> 
                                                <div className='display gap'>
                                                    <span className='f-s-16'>Lien</span>
                                                    <small className='c-grey f-w-300' style={{fontStyle: 'italic'}}>{minimizeString(userlink.link, 10)}</small>
                                                </div>

                                                <div className='grid gap'>
                                                    <div className='display gap'>
                                                        <a href={Input} className='link'>{userlink.shortLink}</a>
                                                        <div>
                                                            <button className='display border-r-04 w-2 h-2 border border-b' onClick={e=> navigator.clipboard.writeText(userlink.shortLink)} >
                                                                <img src='/images/copy.svg' className='w-1 h-1' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={'/edit/' + userlink.shortLink.split('/')[1]}>
                                                <button className='grey'>
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
