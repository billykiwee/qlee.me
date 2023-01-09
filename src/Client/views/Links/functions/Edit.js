import { doc, serverTimestamp } from "firebase/firestore"
import { db } from "../../../../App/database/firebase"
import { isValidUrl } from "../../../../App/utils/isValidUrl"
import UniqueID from "../../../../App/utils/uniqueID"


async function Check(editLink) {

    if (editLink.name) {
        if (editLink.name.length > 40) {
        throw { 
            id: 'name', 
            error: 'Le nom doit faire entre 0 et 40 charactères' 
        }
        }
    }

    if (editLink.url) {
        if (!isValidUrl(editLink.url)) {
        throw { 
            id: 'url', 
            error: 'Tu dois rentrer une URL valide' 
        }
        }
    }

    return editLink
}

export function EditLink(props) {

    const { Link, editLink, seteditLink, snackBar, popUp } = props
    

    if (Object.keys(editLink) !== 'shortLink') {

        popUp.show({
            valid     : () => EditShortLink(props),
            title     : 'Le lien court va être modifier',
            message   : 'Tu es sur le point de modifier le lien court',
            buttonText: 'Continuer',
        })
    }

    Check(editLink)
    .then(async edit=> {

        await db.collection('links')
        .doc(Link.id)
        .update({[Object.keys(edit)] : Object.values(edit)[0]})
    })
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



const EditShortLink = async (props) => {

    const {  Link, User, LinkID, Stats, editLink, seteditLink, snackBar, popUp, history } = props


    const newLink = {
        name     : Link.name,
        id       : editLink.shortLink,
        user     : User?.email,
        url      : Link.url,
        shortLink: 'qlee.me/' + editLink.shortLink,
        date     : serverTimestamp(),
        views    : Link.views
    }

    try {

        if ((/\s/.test(editLink.shortLink))) throw 'space in shortlink'

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

            .then(e=> {
                snackBar.add({
                    id: UniqueID('m-', 5),
                    text: 'Modifications enregistrées 🎉',
                    subtext: 'Le lien court à bien été modifié',
                    status: 'success'
                })
            })
            .catch(e=> console.log(e))
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