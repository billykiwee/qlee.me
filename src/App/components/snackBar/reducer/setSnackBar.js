
export function setSnackBar(content, dispatch) {
    return dispatch({
        type    : 'SET_SNACKBAR',
        snackBar: content
    })
}