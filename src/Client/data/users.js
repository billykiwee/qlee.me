import { useState, useEffect } from 'react';
import { db } from '../../App/database/firebase';


export function useFetchUsers(user) {

    const [Users, setUsers] = useState([])

    useEffect(() => {

        const data = db.collection('users').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setUsers("no users")
            }
    
            const fetchedUsers = snapshot.docs.map(doc => doc.data())
    
            if (!user) {
                setUsers(fetchedUsers)
            }

            setUsers(fetchedUsers.filter(e=> e.email === user?.email)[0])
        })
    
        return () => data()

    }, [user])
  
    return Users
}
  