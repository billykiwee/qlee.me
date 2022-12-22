import { db } from "../../../App/database/firebase"

export async function getLink(setlink, LinkID) {
    const snapshot  = await db.collection('links').get()
    const userLinks = snapshot.docs.map(doc => doc.data())

    const link = userLinks.filter(e=> e.id === LinkID)[0]
    
    setlink(link)
}