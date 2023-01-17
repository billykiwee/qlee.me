import { db } from "../../../../App/database/firebase"


export const addtoLinkInBio = (isCheck, LinkID, user, link_in_bio_Links, linkData) => {

    const ref = db.collection('link-in-bio')
    .doc(user.link_in_bio)

    db
    .collection('links')
    .doc(LinkID)
    .update({ linkInBio: isCheck })


    ref
    .update({ 
        links : isCheck 
        ? [...link_in_bio_Links, linkData] 
        : link_in_bio_Links.filter(id=> id !== linkData.id)
    })
}