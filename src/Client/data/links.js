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
            else setLinksData(fetchedLinks.filter(e=> e.id === LinkID)[0])
        })
    
        return () => data()

    }, [LinkID])
  
    return linksData
}


export function useFetchStatsLinks() {

    const [StatsLinks, setStatsLinks] = useState([])

    useEffect(() => {

        const data = db.collection('stats').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setStatsLinks("no stats")
            }

            const fetchedLinks = snapshot.docs.map(doc => doc.data())

            setStatsLinks(fetchedLinks)
        })
    
        return () => data()

    }, [])
  
    return StatsLinks
}

export function useGetLink(LinkID) {

    const [linksData, setLinksData] = useState([])

    useEffect(() => {

        const data = db.collection('links').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())
    
            setLinksData(fetchedLinks.filter(e=> e.id === LinkID)[0])
        })
    
        return () => data()

    }, [LinkID])
  
    return linksData
}
