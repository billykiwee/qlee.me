import { serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db, auth } from '../../../../../App/database/firebase'
import { generateLetterImage } from '../../../../../App/utils/generateLetterImage'
import { loginConditions } from '../conditions'

export function byEmail(e, userID, setMSG, history) {

    e.preventDefault() 

    const elements = e.target.elements

    const email = elements.email.value
    const password = elements.password.value
    
    const { Name, Email, Password } = loginConditions

    async function Signup() {

        if (!email.match(Email.rules.regex)) 
            throw {
                code : 'error-email',
                error : 'Veuillez entrer un email valide'
            }
        else Password.error.innerHTML = ''


        if (password.length < Password.rules.length.min)
            throw {
                code : 'error-password',
                error : `Le mot de passe doit contenir au moins ${Password.rules.length.min} caractères`
            }

        else if (!password.match(Password.rules.regex.special))
            throw {
                code : 'error-password',
                error : 'Le mot de passe doit contenir un caractère spécial'
            }

        else if (!password.match(Password.rules.regex.number))
            throw {
                code : 'error-password',
                error : 'Le mot de passe doit contenir un nombre'
            }

        else Password.error.innerHTML = ''


        return {
            email : email, 
            password :password 
        }

    }

    Signup()
    .then(validData=> {

        const { email, password } = validData

        auth.createUserWithEmailAndPassword(email, password)
        .then(toDatabase=> {

            db.collection('users').doc(email).set({
                plan    : 'FREE',
                id      : userID,
                name    : email.split('@')[0],
                email   : email,
                photoURL: generateLetterImage(email.split('')[0].toUpperCase()),
                date    : serverTimestamp()
            }) 
        })
        .then(redirect=> history('/dashboard') )
        .catch(error => {
            //console.error(error)
            setMSG({
                statu: 'error', 
                msg: "L'adresse mail est associé à un autre compte"
            })
        })
    })
    .catch(error => {

        Object.values(loginConditions).map(condition=> {
            return condition.error?.id === error.code ? condition.error.innerHTML = error.error : null
        })
    }) 
}