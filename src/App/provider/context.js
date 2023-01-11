import { createContext, useContext } from "react"
import useGetAuth from "../../Client/data/auth/auth"
import { useFetchStatsLinks } from "../../Client/data/links"
import { useFetchLinks } from "../../Client/data/user/links"
import { useFetchUsers } from "../../Client/data/users"
import { usePopUp } from "../components/popUp/reducer/usePopUp"
import { useSnackBar } from "../components/snackBar/reducer/useSnackBar"


export const PropsContext = createContext({})

export const PropsProvider = ({children}) => {

    const user = useGetAuth()

    const props = {
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
        auth       : user,
        users      : useFetchUsers(),
        links      : useFetchLinks(),
        stats      : useFetchStatsLinks(),
        link_in_bio: useFetchLinks(),
        snackBar   : useSnackBar(),
        popUp      : usePopUp()
    }

    return (
        <PropsContext.Provider value={props}>
            {children}
        </PropsContext.Provider>
    )
}

export const Props = () => useContext(PropsContext)