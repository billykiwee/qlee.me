import { db } from "../../../App/database/firebase"

export const fetchUserLinks = async (setUserLinks, userEmail) => {

    try {

        if (userEmail) {

            const query = db.collection('links')
            .where('user', '==', userEmail)
            .orderBy('date', 'desc')
    
            query.onSnapshot(snapshot => {
                const allLinks = snapshot.docs.map(doc => doc.data())
                
                if (allLinks.length === 0) setUserLinks('no link')
                else 
                setUserLinks(allLinks?.sort((x,y)=> y.date - x.date).reverse())
            })
        }

    }
    catch (err) {
        console.log(err);
    }
}