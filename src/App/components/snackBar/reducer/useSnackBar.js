import { useStateValue } from "../../../provider/StateProvider"
import UniqueID from "../../../utils/uniqueID"


export function useSnackBar() {
    
    const [{ snackBar }, dispatch] = useStateValue()

    const add = (content) => {
        dispatch({
            type: 'SET_SNACKBAR',
            snackBar: [
                ...snackBar,
                { id: UniqueID('sb', 4), ...content },
            ]
        })
    }

    const remove = (id) => {
        dispatch({
            type: 'SET_SNACKBAR',
            snackBar: snackBar.filter((e) => e.id !== id),
        })
    }

    return { snackBar, add, remove }
}
