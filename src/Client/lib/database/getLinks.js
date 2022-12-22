import { db } from "../../../App/database/firebase"

export async function getLinks(setLinks) {
    const snapshot  = await db.collection('links').orderBy('date').get()
    const userLinks = snapshot.docs.map(doc => doc.data())
    
    setLinks(userLinks)
}