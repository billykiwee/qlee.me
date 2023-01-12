import { createContext, useContext } from "react"
import useGetAuth from "../../Client/data/auth/auth"
import { useFetchAllLinks, useFetchStatsLinks } from "../../Client/data/links"
import { useFetchLinks } from "../../Client/data/user/links"
import { useFetchUsers } from "../../Client/data/users"
import { usePopUp } from "../components/popUp/reducer/usePopUp"
import { useSnackBar } from "../components/snackBar/reducer/useSnackBar"


export const PropsContext = createContext({})

export const PropsProvider = ({ children }) => {

    const user = useGetAuth()

    const props = {
        auth: user,
        user: {
            profil: useFetchUsers(user),
            links : {
                links: useFetchLinks(user),
                stats: useFetchLinks(user, 'stats'),
            },
            link_in_bio: {
                links   : useFetchLinks(user, 'link-in-bio'),
                settings: useFetchLinks(user, 'link-in-bio_settings')
            },
        },
        users      : useFetchUsers(),
        links      : useFetchAllLinks(),
        stats      : useFetchStatsLinks(),
        link_in_bio: useFetchLinks(),
        snackBar   : useSnackBar(),
        popUp      : usePopUp(),
        header     : (state) => state
    }

    return (
        <PropsContext.Provider value={props}>
            {children}
        </PropsContext.Provider>
    )
}

export const useStateProps = () => useContext(PropsContext)