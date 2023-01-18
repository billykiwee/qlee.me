import { db } from "../../../App/database/firebase"

export function links(user) {

    return new Promise((resolve, reject)=> {
        
        db.collection('links')
        .where('user', '==', user.email)
        .onSnapshot(snapshot=> {

            const data = snapshot.docs.map(doc => doc.data())

            if (data.length) resolve(snapshot.empty)
            else reject('_nodata')

        })
    })
        
}