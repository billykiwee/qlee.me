import { db } from "../../../../App/database/firebase"

export const deleteLinkFromBio = id => {

    db.collection('links').doc(id)
    .update({linkInBio : false})
}