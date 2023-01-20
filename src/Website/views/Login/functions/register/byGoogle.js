import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db, auth } from '../../../../../App/database/firebase'



export async function byGoogle(userID, history, snackBar, redirect) {

    const provider = new GoogleAuthProvider()

    await signInWithPopup(auth, provider)
    .then(async (result) => {

        // If user log for the frist time
        const isFirstLogin = getAdditionalUserInfo(result).isNewUser
        
        if (isFirstLogin) {

            const { email, displayName, photoURL } = auth.currentUser

            await db
            .collection('users')
            .doc(email)
            .set({
                plan    : 'FREE',
                id      : userID,
                name    : displayName,
                email,
                photoURL,
                date    : serverTimestamp()
            }) 
    
            snackBar.add({
                text:' Connexion réussie'
            })
        }
        
        if (!redirect) history('/dashboard')
    })
}

