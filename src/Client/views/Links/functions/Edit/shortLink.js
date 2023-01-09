import { serverTimestamp } from "firebase/firestore"
import { db } from "../../../../../App/database/firebase"
import UniqueID from "../../../../../App/utils/uniqueID"

export const editShortLink = async (props) => {

    const {  Link, User, LinkID, Stats, editLink, seteditLink, snackBar, popUp, history } = props

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