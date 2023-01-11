import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db, auth } from '../../../../../App/database/firebase'

export async function byGoogle(userID, history, snackBar) {

    const provider = new GoogleAuthProvider()

    await signInWithPopup(auth, provider)
    .then(async (result) => {

        // If user log for the frist time
        const isFirstLogin = getAdditionalUserInfo(result).isNewUser
        
        if (!isFirstLogin) history('/dashboard')

        await db
        .collection('users')
        .doc(auth.currentUser.email)
        .set({
            plan    : 'FREE',
            id      : userID,
            name    : auth.currentUser.displayName,
            email   : auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
            date    : serverTimestamp()
        }) 

        snackBar.add({ text:' Connexion réussi' })

        history('/dashboard')
    })
}
