import React, { useEffect, useState } from 'react'
import { db } from '../../../../App/database/firebase'

export default function useFetchLinksInBio(UserEmail) {

    const [linksInBio, setLinksInBio] = useState()

    useEffect(() => {
        if (!UserEmail) return
        
        const data = db.collection('links').onSnapshot(snapshot => {
            const links = snapshot.docs.map(doc => doc.data())
            
            const fetchedLinks = links
            .filter(e=> e.user === UserEmail && e.linkInBio)
            .sort((a,b)=> a.position - b.position)

            setLinksInBio(fetchedLinks)
        })

        return data
    }, [UserEmail])

    return linksInBio
}

