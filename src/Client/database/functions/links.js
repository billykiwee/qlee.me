import { db } from "../../../App/database/firebase"

export function links(setLinks, user) {

    db.collection('links')
    .where('user', '==', user.email)
    .onSnapshot(snapshot=> {

        if (snapshot.empty) return setLinks('no_data')

        const data = snapshot.docs.map(doc => doc.data())
        
        setLinks(data)
    })
}