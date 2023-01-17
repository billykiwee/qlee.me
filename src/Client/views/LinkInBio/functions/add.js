import { db } from "../../../../App/database/firebase"


export const addtoLinkInBio = (isCheck, LinkID, user, link_in_bio_Links, linkData) => {

    const ref = db.collection('link-in-bio')
    .doc(user.link_in_bio)

    db
    .collection('links')
    .doc(LinkID)
    .update({ linkInBio: isCheck })

    const links = link_in_bio_Links.map(e=> e.id)

    ref
    .update({ 
        links : isCheck 
        ? [...links, linkData] 
        : links.filter(id=> id !== linkData.id)
    })
}