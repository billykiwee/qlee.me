import { useState, useEffect } from 'react';
import { db } from '../../App/database/firebase';


export function useFetchLinks(LinkID) {

    const [Links, setLinks] = useState([]);
  
    useEffect(() => {
        if (!user) return
    
        const query = db.collection("links").where("id", "==", LinkID)
    
        const data = query.onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.error(`no user found with email: ${user?.email}`)
                return
            }
            const fetchedLinks = snapshot.docs.map(doc => doc.data())
    
            setLinks(...fetchedLinks)
        })
    
        return () => data()
    }, [user])
  
    return Links
}
  


const query = (LinkID) => {
    if (LinkID) {
        return db.collection("links").where("id", "==", LinkID)
    }

    return db.collection("links")
}