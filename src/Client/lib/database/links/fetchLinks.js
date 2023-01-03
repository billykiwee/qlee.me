import { db } from "../../../../App/database/firebase"

export async function fetchLinks(setAllLinks) {

    const snapshot  = await db.collection('links').get()
    const userLinks = snapshot.docs.map(doc => doc.data())

    if (userLinks.length > 0) setAllLinks(userLinks)

}