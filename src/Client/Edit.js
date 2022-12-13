import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../App/components/Container'
import { db } from '../App/database/firebase'
import getFavicon from '../App/utils/getFavicon'

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


    return (
       <Container>

            <div>
                <h2>Modifier le lien</h2>
            </div>

            <div>
                {
                    getLink().map(data=> {
                        return (
                            <div className='grid gap-1rem'>
                                <div className='display gap'>
                                    <span>Nom du lien :</span>
                                    <span>{data.name}</span>
                                    <img src={getFavicon(data.link)} className='w-3 h-3 border-r-100' />
                                </div>
                                <div className='display gap'>
                                    <span>Lien :</span>
                                    <span>{data.link}</span>
                                </div>
                                <div className='display gap'>
                                    <span>Lien court :</span>
                                    <a href={data.shortLink} className='link'>{data.shortLink}</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

       </Container>
    )
}
