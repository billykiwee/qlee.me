import { db } from "../../../../App/database/firebase"


export const addToLinkInBio = (isCheck, LinkID, user, linkData) => {

    const ref = db.collection('link-in-bio')
    .doc(user.link_in_bio)
    .collection('links')

    db
    .collection('links')
    .doc(LinkID)
    .update({ linkInBio: isCheck })

    if (isCheck) {
        ref.doc(LinkID).set(linkData.filter(l=> { l.id, l.url, l.shortLink, l.icon, l.name }))
    }
    else {
        ref.doc(LinkID).delete()
    }
}