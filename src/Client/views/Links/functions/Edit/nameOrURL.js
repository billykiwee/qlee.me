import { db } from "../../../../../App/database/firebase"
import { isValidUrl } from "../../../../../App/utils/isValidUrl"
import UniqueID from "../../../../../App/utils/uniqueID"

export async function editNameOrURL(props) {

    const { Link, seteditLink, snackBar, popUp } = props

    async function Check() {
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
    
        return Link
    }

    Check(Link)
    .then(async edit=> {
    
        await db.collection('links')
        .doc(Link.id)
        .update({
            [Object.keys(edit)] : Object.values(edit)[0]
        })
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

