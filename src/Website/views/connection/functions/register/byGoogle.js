import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db, auth } from '../../../../../App/database/firebase'

export function byGoogle(userID, history) {

    const provider = new GoogleAuthProvider()

    async function signup() {

        await signInWithPopup(auth, provider)
        .then(async (result) => {

            // If user log for the frist time
            const isFirstLogin = getAdditionalUserInfo(result).isNewUser
             
            if (isFirstLogin) {

                db.collection('users').doc(auth.currentUser.email).set({
                    plan    : 'FREE',
                    id      : userID,
                    name    : auth.currentUser.displayName,
                    email   : auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                    date    : serverTimestamp()
                }) 
            }
            else return '/dashboard'
        })
    }

    signup()
    .then(redirect => history(redirect)) 
}
