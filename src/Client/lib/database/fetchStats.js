import { db } from "../../../App/database/firebase"

export async function fetchStats(setStats, LinkID) {
    try {

        if (LinkID) {

            const query = db.collection('links')
            .doc(LinkID)
            .collection('stats')
    
            query.onSnapshot(snapshot => {
                const stats = snapshot.docs.map(doc => doc.data())
                setStats(stats)
            })
        }

    }
    catch (err) {
        console.log(err);
    }
}