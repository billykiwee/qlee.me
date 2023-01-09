import { db } from "../../../../App/database/firebase"

export const addToLinkInBio = (isCheck, LinkID) => {
    db.collection('links').doc(LinkID).update({linkInBio: isCheck})
}