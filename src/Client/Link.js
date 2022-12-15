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


    function getUserOfLink() {
        for (const v in UserLinks) {
            if (UserLinks[v].id === LinkID) return UserLinks[v].user
        }
    }


    useEffect(e=> {

        for (const v in UserLinks) {
            if (UserLinks[v].id === LinkID) {

                db.collection('DB').doc('links').collection(getUserOfLink()).doc(Link.link).update({
                    views: UserLinks[v].views +1
                })
                db.collection('DB').doc('links').collection('links').doc(LinkID).update({
                    views: UserLinks[v].views +1
                })
                .then(e=> {

                    window.location.href = UserLinks[v].url 
                })

            } 
        }
        
    })

}
