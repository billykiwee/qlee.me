import { db } from "../../../../App/database/firebase"

export const addToLinkInBio = (isCheck, LinkID, user, linkData) => {

    db
    .collection('links')
    .doc(LinkID)
    .update({ linkInBio: isCheck })

    db
    .collection('link-in-bio')
    .doc('bill')
    .set({
        ...linkData
    })
}