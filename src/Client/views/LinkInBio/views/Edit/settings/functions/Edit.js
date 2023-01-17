import { db } from "../../../../../../../App/database/firebase"
import { useStateProps } from "../../../../../../../App/provider/ContextProvider"

export const Edit = (edit, value, id) => {

    const ref = db.collection('link-in-bio').doc(id)

    ref.update({ [edit] : value } )
}
