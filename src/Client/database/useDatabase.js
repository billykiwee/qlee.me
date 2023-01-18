import { useState, useEffect } from "react"
import { useStateValue } from "../../App/provider/StateProvider"
import { links } from "./functions/links"
import { link_in_bio } from "./functions/link_in_bio"
import { stats } from "./functions/stat"
import { transactions } from "./functions/transactions"

export function useDatabase(data) {

    const [Links, setLinks] = useState([])

    const [{ user }] = useStateValue()

    useEffect(e=> {

        if (!user) return 

        if (data === 'links') {
            links(user)
            .then(links=> {
                setLinks(links)
            })
            .catch(e=> {
                console.log('l');
            })
        }

        if (data === 'links_Stats') {
            stats(setLinks)
        }

        if (data === 'link_in_bio') {
            link_in_bio(setLinks, user) 
        }

        if (data === 'transactions') {
            transactions(setLinks, user) 
        }

    }, [data, user])

    return Links
}