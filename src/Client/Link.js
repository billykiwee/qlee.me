import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../App/database/firebase'


export default function Link() {

    const { LinkID } = useParams()


    const [UserLinks, setUserLinks] = useState([])
    useEffect(e=> {
        db.collection('DB').doc('links').collection('links').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    useEffect(e=> {

        for (const v in UserLinks) {
            if (UserLinks[v].id === LinkID) {

                db.collection('DB').doc('links').collection('user').doc(Link.link).update({
                    views: UserLinks[v].views +1
                })
                db.collection('DB').doc('links').collection('links').doc(LinkID).update({
                    views: UserLinks[v].views +1
                })
                .then(e=> {

                    window.location.href = 'https://www.' + UserLinks[v].link 
                })

            } 
        }
        
    })

}
