import { useState, useEffect } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinks(user, type) {

    const [linksData, setLinksData] = useState([])
  
    useEffect(() => {

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

    if (user && type === "link-in-bio") {
        return db
        .collection("links")
        .where("linkInBio", "==", true)
    }

    if (user && type === "stats") {
        return db
        .collection("links")
        .where("linkInBio", "==", type.split('?ID=')[1])
    }
    
    if (user) {
        return db
        .collection("links")
        .where("user", "==", user.email)
    }

    return db.collection("links").orderBy("date", "desc")
}