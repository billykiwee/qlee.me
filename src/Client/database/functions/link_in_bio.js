import { db } from "../../../App/database/firebase"

export function link_in_bio(setLinks, user) {

    db.collection('link-in-bio')
    .where('user', '==', user.email)
    .onSnapshot(snapshot=> {
        setLinks(snapshot.docs.map(doc => doc.data())[0])
    })
}