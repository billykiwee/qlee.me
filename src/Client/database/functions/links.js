import { db } from "../../../App/database/firebase"

export function links(setLinks, user) {

    db.collection('links')
    .where('user', '==', user.email)
    .onSnapshot(snapshot=> {

        const data = snapshot.docs.map(doc => doc.data())

        if (data.length) {
            setLinks(data)
        }

        if (snapshot.empty) setLinks('no_data')

    })
}