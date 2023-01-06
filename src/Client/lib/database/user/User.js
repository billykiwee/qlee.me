import { useState, useEffect } from 'react';
import { db } from '../../../../App/database/firebase';

export default function useFetchUser(user) {

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (!user) return

        const query = db.collection('users').where('email', '==', user.email)

        const unsubscribe = query.onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.error(`Aucun utilisateur trouvé avec l'email ${user.email}`)
                return null
            }
            const fetchedUser = snapshot.docs.map(doc => doc.data())
            
            setUserData(...fetchedUser)
        })

        return unsubscribe
    }, [user])

    return userData
}

