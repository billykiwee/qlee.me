import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../../App/database/firebase'


export function useFetchLinkInBio() {

    const [linksData, setLinksData] = useState([])
    const location = useLocation()

    useEffect(() => {

        const data = db.collection('link_in_bio').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())

            console.log(location.href);
            const userLinks = fetchedLinks.filter(e=> e.id === location.href)
    
            setLinksData(userLinks)
        })
    
        return () => data()

    }, [location])
  
    return linksData
}
