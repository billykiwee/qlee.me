import { serverTimestamp } from "firebase/firestore"
import { db } from "../../../../App/database/firebase"
import { isValidUrl } from "../../../../App/utils/isValidUrl"
import UniqueID from "../../../../App/utils/uniqueID"

export function EditLink(props) {    

    const { editLink, seteditLink, popUp, snackBar } = props

    console.log(Object.keys(editLink));

    if (Object.keys(editLink).toString() === 'shortLink') {
        popUp.show({

            title     : 'Le lien court va être modifier',
            message   : 'Tu es sur le point de modifier le lien court',
            buttonText: 'Continuer',
            valid     : () => editShortLink(props)
            /* .then(e=> {
                snackBar.add({
                    id     : UniqueID('m-', 5),
                    text   : 'Modifications enregistrées 🎉',
                    subtext: 'Le lien court à bien été modifié',
                    status : 'success'
                })
            })
            .catch(error=> console.error(error)) */
        })
    }

    else editNameOrURL(props)
    .then(e=> {
    
        document.querySelector('#error-name').innerHTML = ''
        document.querySelector('#error-url').innerHTML = ''
        
        document.querySelectorAll('input').forEach(e=> e.value = '')
    
        seteditLink({})
    
        snackBar.add({
            id     : UniqueID('m-', 5),
            text   : 'Modifications enregistrées 🎉',
            subtext: 'Le lien à bien été modifié',
            status : 'success'
        })
    })
    .catch(e=> {
        document.querySelector('#error-'+ e.id).innerHTML = e.error
    })
}


async function editNameOrURL(props) {

    const { Link, editLink } = props


    if (Link.name) {
        if (Link.name.length > 40) {
            throw { 
                id: 'name', 
                error: 'Le nom doit faire entre 0 et 40 charactères' 
            }
        }
    }

    if (Link.url) {
        if (!isValidUrl(Link.url)) {
            throw { 
                id: 'url', 
                error: 'Tu dois rentrer une URL valide' 
            }
        }
    }

    await db.collection('links')
    .doc(Link.id)
    .update({
        [Object.keys(editLink)] : Object.values(editLink)[0]
    })
}


async function editShortLink(props) {

    const {  Link, User, LinkID, Stats, editLink, seteditLink, popUp, history } = props

    const newLink = {
        name     : Link.name,
        id       : editLink.shortLink,
        user     : User?.email,
        url      : Link.url,
        shortLink: 'qlee.me/' + editLink.shortLink,
        date     : serverTimestamp()
    }

    try {

        if ((/\s/.test(editLink.shortLink))) throw new Error('space in shortlink')

        await db.collection('links').doc(newLink.id).set(newLink)
        await db.collection('links').doc(Link.id).delete() 

        Stats
        .filter(e=> e.LinkID === LinkID)
        .map(async e=> {

            await db.collection('stats')
            .doc(e.statID)
            .update({
                LinkID : newLink.id
            })
        })

        document.querySelectorAll('input').forEach(e=> e.value = '')
        seteditLink('')

        popUp.show({})
        history('/edit/' + newLink.id)

    } catch (e) {
        console.log(e);

        document.querySelector('#alert-shortlink').style.color= 'var(--red)'
        document.querySelector('#alert-shortlink').innerHTML = e
    }
}