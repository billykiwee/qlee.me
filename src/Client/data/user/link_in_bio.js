import { useState, useEffect } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinkInBio() {

    const [linksData, setLinksData] = useState({})

    useEffect(() => {

        const data = db.collection('link-in-bio').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())

            let userLinks

            if (window.location.pathname.includes('edit/@')) {
                userLinks = fetchedLinks.filter(e=> e.id === window.location.pathname.split('edit/')[1])[0]
            }
            else userLinks = fetchedLinks.filter(e=> e.id === window.location.pathname.split('/')[1])[0]

    
            setLinksData(userLinks)
        })
    
        return () => data()

    }, [window.location.href])
  
    return linksData
}
