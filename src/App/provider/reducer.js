export const initialState = {
    user      : null,
    snackBar  : [],
}

const reducer = (state, action) => {

    switch(action.type) {
        case 'SET_USER' : return {
            ...state,
            user : action.user,
            
        }

        case 'SET_SNACKBAR' : return {
            ...state,
            snackBar : action.snackBar
        }

        default : return state
    }
}

export default reducer
