import { useState, useEffect } from "react"
import { db } from "../../App/database/firebase"
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
            links(setLinks, user)
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

export function useFetchLinks() {

    const [{ user }] = useStateValue()

    const [Data, setData] = useState([])

    useEffect(() => {

        const data = db.collection('links')
        .onSnapshot(snapshot => {

            if (snapshot.empty) return setData("no_data")

            const fetchedLinks = snapshot.docs.map(doc => doc.data())

            setData(fetchedLinks.filter(e=> e.email === user?.email))
        })
    
        return () => data()

    }, [])
  
    return Data
}