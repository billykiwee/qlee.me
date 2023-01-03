import { db } from '../../../../App/database/firebase';

export default function fetchSettings(setLinksBioSettings, userEmail) {

    try {
        if (userEmail) {

            db.collection('link-in-bio').onSnapshot(snapshot => {
                const links = snapshot.docs.map(doc => doc.data())
                
                const getLinksInBio = links.filter(e=> e.user === userEmail)[0]
                
                setLinksBioSettings(getLinksInBio)
            })
        }
    }
    catch (error) {
        console.error(error);
    }

}
