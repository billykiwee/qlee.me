import { useState, useEffect } from "react"
import { useStateValue } from "../../App/provider/StateProvider"
import { links } from "./functions/links"
import { link_in_bio } from "./functions/link_in_bio"
import { stats } from "./functions/stat"

export function useDatabase(data, linkID) {

    const [Links, setLinks] = useState([])

    const [{ user }] = useStateValue()

    useEffect(e=> {

        if (!user) return 

        if (data === 'links') {
            links(setLinks, user)
        }

        if (data === 'links_Stats' && linkID) {
            stats(setLinks, linkID)
        }

        if (data === 'link_in_bio') {
            link_in_bio(setLinks, user) 
        }

    }, [data, user, linkID])

    return Links
}