import { useState, useEffect } from 'react';
import { db } from '../../../App/database/firebase';


export function useFetchUser(user) {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
        if (!user) return
    
        const query = db.collection("users").where("email", "==", user?.email)
    
        const data = query.onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.error(`no user found with email: ${user?.email}`)
                return
            }
            const fetchedUser = snapshot.docs.map(doc => doc.data())
    
            setUserData(...fetchedUser)
        })
    
        return () => data()
    }, [user])
  
    return userData
}
  