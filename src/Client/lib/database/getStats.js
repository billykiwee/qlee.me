import { db } from "../../../App/database/firebase"

export async function getStats(setStats, LinkID) {
    const snapshot = await db.collection('links').doc(LinkID).collection('stats').get()
    const stats    = snapshot.docs.map(doc => doc.data())

    setStats(stats)
}
