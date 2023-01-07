import { useState, useEffect } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinks(user, type) {

    const [linksData, setLinksData] = useState([])
  
    useEffect(() => {

        if (!user) return

        const data = query(user, type).onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())
    
            setLinksData(fetchedLinks.sort((x, y) => y.date - x.date))
        })
    
        return () => data()

    }, [user])
  
    return linksData
}


const query = (user, type) => {

    if (user) {
        return db
        .collection("links")
        .where("user", "==", user.email)
    }

    if (user && type === "link-in-bio") {
        return db
        .collection("links")
        .where("user", "==", user.email)
        .where("linkInBio", "==", true)
    }

    return db.collection("links").orderBy("date", "desc")
}