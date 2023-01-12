export const initialState = {
    user    : null,
    snackBar: [],
    popUp   : {},
    header  : null,
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

        case 'SET_POPUP' : return {
            ...state,
            popUp : action.popUp
        }

        case 'SET_HEADER' : return {
            ...state,
            header : action.header,
            
        }

        default : return state
    }
}

export default reducer
