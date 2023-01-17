import { db } from "../../../App/database/firebase"

export function links(setLinks, user) {

    db.collection('links')
    .where('user', '==', user.email)
    .onSnapshot(snapshot=> {
        setLinks(snapshot.docs.map(doc => doc.data()))
    })
}