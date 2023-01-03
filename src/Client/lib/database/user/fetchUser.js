import { db } from "../../../../App/database/firebase"

export async function fetchUser(setUser, userEmail) {

    try {

        if (userEmail) {

            const query = db.collection('users')
            .where('email', '==', userEmail)
    
            query.onSnapshot(snapshot => {
                const user = snapshot.docs.map(doc => doc.data())
                setUser(...user)
            })
        }

    }
    catch (err) {
        console.log(err);
    }
}