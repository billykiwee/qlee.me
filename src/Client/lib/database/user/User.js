import React, { useState, useEffect } from 'react';
import { db } from '../../../../App/database/firebase';

export default function FetchUser(userEmail) {

    const [user, setUser] = useState({})

    useEffect(() => {

        try {

            if (userEmail) {
                const query = db.collection('users')
                .where('email', '==', userEmail)
        
                query.onSnapshot(snapshot => {
                    const user = snapshot.docs.map(doc => doc.data())
                    setUser(...user)
                })
            }
        }
        catch (err) {
            console.log(err);
        }

    }, [userEmail])

    return user
}