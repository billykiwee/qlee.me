import { serverTimestamp } from "firebase/firestore"
import { isUserPremium } from "../../../../Admin/settings/isPremium"
import { db } from "../../../../App/database/firebase"
import { isValidUrl } from "../../../../App/utils/isValidUrl"
import UniqueID from "../../../../App/utils/uniqueID"
import { getHostName } from "../../../lib/getHostName"


export function createLink(e) {

    e.preventDefault()

    const { name, url } = e.target.elements


    console.log(name.value, url.value);

/*     const { 
        NameLink,
        LinkURL,
        setLinkURL,
        setNameLink,
        setError,
        User,
        UserLinks,
        setMsg 
    } = props

    const linkID = 'qlee.me/' + UniqueID('', 5)
                    
    const link = {
        name     : NameLink.length < 1 ? getHostName(LinkURL) : NameLink,
        id       : linkID.split('/')[1],
        user     : User.email,
        url      : isValidUrl(LinkURL).href,
        shortLink: linkID,
        date     : serverTimestamp(),
        views    : 0
    }    


    async function check() {

        if (NameLink.length) {
            if (NameLink.length > 40) {
                throw 'Le nom doit comporté 40 charactères au maximum'
            }
        }
        
        if (!isValidUrl(LinkURL)) {
            throw 'Tu dois rentrer une URL valide'
        }

        if (isUserPremium(User).max_links <= UserLinks.length) {
            throw setMsg({
                id     : UniqueID('msg', 5),
                text   : 'Erreur',
                subtext: `Tu as atteints la limite de ${isUserPremium(User).max_links} liens gratuits.`,
                action : {
                    text: 'Débloque plus de lien ici !',
                    link: '/pricing',
                },
                status: 'error'
            })
        }
    }

    check()
    .then(async e=> {
        await db.collection('links').doc(link.id).set(link)
    })
    .then(showPopup=> {
        setMsg({
            id     : UniqueID('msg', 5),
            text   : 'Bravo 🎉',
            subtext: `Le lien ${NameLink} a bien été crée`,
            status : 'success'
        })
    })
    .then(linkCreated=> {
        document.querySelectorAll('input').forEach(e=> e.value = '')
        setLinkURL('')
        setNameLink('')

    })
    .catch(Popup=> {
        setError(Popup)
    }) */

}