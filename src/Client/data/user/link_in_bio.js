import { useState, useEffect } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinkInBio(location) {

    const [linksData, setLinksData] = useState({})

    useEffect(() => {

        const data = db.collection('link-in-bio').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())


            const pathname = location.pathname
            const pathnameControl = (control) => pathname.split(control === 'edit' ? 'fezfezedit/' : '/')[1]

            console.log(pathnameControl(pathname));

            const userLinks = fetchedLinks.filter(e=> e.id === pathnameControl(pathname))[0]

            setLinksData(userLinks)
        })
    
        return () => data()

    }, [location])
  
    return linksData
}
