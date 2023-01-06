import React, { useState, useEffect } from 'react';
import { db } from '../../../../App/database/firebase';

export default function useFetchUser(userEmail) {

    const [user, setUser] = useState({})

    useEffect(() => {
        if (userEmail) {
            const query = db.collection('users')
            .where('email', '==', userEmail)
    
            query.onSnapshot(snapshot => {
                const user = snapshot.docs.map(doc => doc.data())
                setUser(...user)
            })
        }
    }, [userEmail])

    if (!Object.values(user).length) return

    return user 
}