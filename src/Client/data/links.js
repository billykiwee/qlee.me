import { useState, useEffect } from 'react'
import { db } from '../../App/database/firebase'


export function useFetchAllLinks(LinkID) {

    const [linksData, setLinksData] = useState([])

    useEffect(() => {

        const data = db.collection('links').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())
    
            if (!LinkID) {
                setLinksData(fetchedLinks.sort((x, y) => y.date - x.date))
            }

            setLinksData(fetchedLinks.filter(e=> e.id === LinkID)[0])
        })
    
        return () => data()

    }, [LinkID])
  
    return linksData
}