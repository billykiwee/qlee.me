import { db } from "../../../App/database/firebase"

export async function getUser(setUser, userEmail) {

    const snapshot  = await db.collection('users').get()
    const user = snapshot.docs.map(doc => doc.data())

    const userData = user.filter(e=> e.email === userEmail).map(e=> e)

    setUser(...userData)
}