import { createContext, useContext } from "react"
import useGetAuth from "../../Client/data/auth/auth"
import { useFetchAllLinks, useFetchStatsLinks } from "../../Client/data/links"
import { useFetchLinks, useFetchUsersLink_in_bio, useFetchUsersLink_in_bio_Settings } from "../../Client/data/user/links"
import { useFetchLinkInBio } from "../../Client/data/user/link_in_bio"
import { useFetchUsers } from "../../Client/data/users"
import { useDatabase, useLinks } from "../../Client/database/useDatabase"
import { usePopUp } from "../components/popUp/reducer/usePopUp"
import { useSnackBar } from "../components/snackBar/reducer/useSnackBar"


export const PropsContext = createContext({})

export const PropsProvider = ({ children }) => {

    const user = useGetAuth()

    const props = {
        auth: user,
        user: {
            profil     : useFetchUsers(user),
            links      : useFetchLinks(),
            stats      : useDatabase('links_Stats'),
            link_in_bio: useDatabase('link_in_bio'),
        },
        transactions: useDatabase('transactions'),
        users       : useFetchUsers(),
        links       : useFetchAllLinks(),
        stats       : useFetchStatsLinks(),
        link_in_bio : useFetchLinkInBio(),
        snackBar    : useSnackBar(),
        popUp       : usePopUp()
    }

    return (
        <PropsContext.Provider value={props}>
            {children}
        </PropsContext.Provider>
    )
}

export const useStateProps = () => useContext(PropsContext)