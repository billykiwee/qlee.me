import { serverTimestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { isUserPremium } from "../../Admin/settings/isPremium"
import { db } from "../../App/database/firebase"
import { isValidUrl } from "../../App/utils/isValidUrl"
import UniqueID from "../../App/utils/uniqueID"
import { getHostName } from "../lib/getHostName"


export async function createLink(name, url, User, UserLinks, setError, Msg, setMessage, setMsg, history) {


    if (name.length) 
        if (name.length > 40) 
            throw setError('Le nom doit comporté 40 charactères au maximum')
    
    if (!isValidUrl(url)) 
        throw setError('Tu dois rentrer une URL valide')

    if (isUserPremium(User).max_links <= UserLinks.length) 
        throw setMessage({
            title: 'Oups...',
            message: `Tu as atteints la limite de ${isUserPremium(User).max_links} liens gratuits.`,
            buttonText: 'Voir les plans',
            buttonColor: 'yellow',
            valid: () => history('/pricing'),
            close: () => setMessage({}),
            statu: 'error'
        })
    

    const linkID = 'qlee.me/' + UniqueID('', 5)
            
    const link = {
        name     : name.length < 1 ? getHostName(url) : name,
        id       : linkID.split('/')[1],
        user     : User.email,
        url      : isValidUrl(url).href,
        shortLink: linkID,
        date     : serverTimestamp(),
        views    : 0
    }    


    db.collection('links').doc(link.id).set(link)
    .then(showPopup=> {
        setMsg([
            ...Msg, 
            {
                text: 'Bravo 🎉',
                subtext: `Le lien ${name} a bien été crée`,
                status: 'success'
            }
        ])
    })
}  