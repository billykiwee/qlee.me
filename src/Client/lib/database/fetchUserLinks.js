import { db } from "../../../App/database/firebase"

export const fetchUserLinks = async (setUserLinks, userEmail) => {

    try {
        db.collection('links').orderBy('date').onSnapshot(snapshot=> {
            const allLinks  = snapshot.docs.map(doc => doc.data())
            const userLinks = allLinks.filter(e=> e.user === userEmail)
            
            setUserLinks(userLinks)
        })
    }
    catch (err) {
        console.log(err);
    }
}