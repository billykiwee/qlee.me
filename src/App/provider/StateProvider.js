import React, { createContext, useContext, useReducer } from 'react'
import useGetAuth from "../../Client/data/auth/auth"
import { useFetchStatsLinks } from "../../Client/data/links"
import { useFetchLinks } from "../../Client/data/user/links"
import { useFetchUsers } from "../../Client/data/users"
import { usePopUp } from "../components/popUp/reducer/usePopUp"
import { useSnackBar } from "../components/snackBar/reducer/useSnackBar"


export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => {

	return (
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateValue = () => useContext(StateContext)
