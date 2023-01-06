import React, { useEffect, useState } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinksInBio(user) {

    const [linksInBio, setLinksInBio] = useState()

    useEffect(() => {
        if (!user) return
        
        const data = db.collection('links').onSnapshot(snapshot => {
            const links = snapshot.docs.map(doc => doc.data())
            
            const fetchedLinks = links
            .filter(e=> e.user === user?.email && e.linkInBio)
            .sort((a,b)=> a.position - b.position)

            setLinksInBio(fetchedLinks)
        })

        return data
    }, [user])

    return linksInBio
}

