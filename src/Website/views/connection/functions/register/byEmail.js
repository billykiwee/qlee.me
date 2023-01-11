import React from 'react'

export function byEmail(props) {

    e.preventDefault() 

    async function Signup() {

        if (!Email.value.match(Email.rules.regex)) 
            throw {
                code : 'error-email',
                error : 'Veuillez entrer un email valide'
            }
        else Email.error.innerHTML = ''


        if (Password.value.length < Password.rules.length.min)
            throw {
                code : 'error-password',
                error : `Le mot de passe doit contenir au moins ${Password.rules.length.min} caractères`
            }

        else if (!Password.value.match(Password.rules.regex.special))
            throw {
                code : 'error-password',
                error : 'Le mot de passe doit contenir un caractère spécial'
            }

        else if (!Password.value.match(Password.rules.regex.number))
            throw {
                code : 'error-password',
                error : 'Le mot de passe doit contenir un nombre'
            }

        else Password.error.innerHTML = ''


        return {
            email : Email.value, 
            password :Password.value 
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