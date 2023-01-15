import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useStateValue } from '../../../App/provider/StateProvider'

export default function useGetAuth() {
    
    const [{user}, dispatch] = useStateValue('')
    const auth = getAuth()

    
    useEffect(() => {
        const data = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } 
            else { 
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })

        return () => data()
    }, [dispatch, auth])

    return user
}
