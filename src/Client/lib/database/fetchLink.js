import { db } from "../../../App/database/firebase"

export async function fetchLink(setLink, LinkID) {

    const query = db.collection('links').where('id', '==', LinkID)

    query.get()
    .then(snapshot => {
        const link = snapshot.docs.map(doc => doc.data())
        setLink(...link)
    })
    .catch(err => {
        console.error(err)
    })
}