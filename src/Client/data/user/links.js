import { useState, useEffect } from 'react'
import { db } from '../../../App/database/firebase'


export function useFetchLinks({ props }) {

    const { user, type } = props ?? undefined

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

    if (type === "link-in-bio") {
        return db
        .collection("links")
        .where("linkInBio", "==", true)
    }

    if (type === "stats") {
        return db
        .collection("stats")
    }
    
    if (user) {
        return db
        .collection("links")
        .where("user", "==", user.email)
    }

    return db.collection("links").orderBy("date", "desc")
}