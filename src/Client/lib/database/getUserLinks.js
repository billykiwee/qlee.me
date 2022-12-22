import { db } from "../../../App/database/firebase"

export async function getUserLinks(setUserLinks, userEmail) {

    const snapshot  = await db.collection('links').orderBy('date').get()
    const userLinks = snapshot.docs.map(doc => doc.data())

    const userLinksArray = userLinks.filter(e=> e.user === userEmail).map(e=> e)

    setUserLinks(userLinksArray)
}