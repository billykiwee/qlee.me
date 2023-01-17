import { db } from "../../../../../../../App/database/firebase"
import { useStateProps } from "../../../../../../../App/provider/ContextProvider"

export const Edit = (edit, value) => {

    const { link_in_bio } = useStateProps()

    console.log(link_in_bio);
/* 
    const ref = db.collection('link-in-bio').doc('@' + link_in_bio.id)

    ref.update({ [edit] : value } ) */
}
