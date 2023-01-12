import { db } from "../../../../App/database/firebase"


export const addToLinkInBio = (isCheck, LinkID, user, link_in_bio_Links, linkData) => {

    const ref = db.collection('link-in-bio')
    .doc(user.link_in_bio)

    db
    .collection('links')
    .doc(LinkID)
    .update({ linkInBio: isCheck })

    
    if (isCheck) {

        ref
        .update({ links : [...link_in_bio_Links.map(e=> e.id), linkData.id]})
    }

}