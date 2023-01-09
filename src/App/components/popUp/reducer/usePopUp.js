import { useStateValue } from "../../../provider/StateProvider"
import UniqueID from "../../../utils/uniqueID"


export function usePopUp() {
    
    const [{ popUp }, dispatch] = useStateValue()

    const show = (content) => {
        dispatch({
            type: 'SET_SNACKBAR',
            popUp: popUp
        })
    }

    return { popUp, add, remove }
}
