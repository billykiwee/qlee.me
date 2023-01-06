import { useEffect, useState } from "react"
import { db } from "../../../App/database/firebase"


export function useFetchStats(LinkID) {

    const [stats, setStats] = useState()

    useEffect(e=> {
        if (!LinkID) return 
    
        const query = db.collection('stats').where('LinkID', '==', LinkID)

        const data = query.onSnapshot(snapshot => {
            const stats = snapshot.docs.map(doc => doc.data())
            setStats(stats)
        })

        return data 

    }, [LinkID])

    return stats
}
