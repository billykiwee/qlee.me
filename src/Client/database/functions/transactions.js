import { db } from "../../../App/database/firebase"

export function transactions(setLinks, user) {

    db.collection('transactions')
    .where('user', '==', user.email)
    .onSnapshot(snapshot=> {
        setLinks(snapshot.docs.map(doc => doc.data()))
    })
}