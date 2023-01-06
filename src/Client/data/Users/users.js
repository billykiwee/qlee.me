import { useState, useEffect } from 'react';
import { db } from '../../../App/database/firebase';


export function useFetchUser(user) {

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (!user) return

        const query = db.collection('users').where('email', '==', user?.email)

        const data = query.onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.error(`Aucun utilisateur trouvé avec l'email ${user?.email}`)
                return null
            }
            const fetchedUser = snapshot.docs.map(doc => doc.data())
            
            setUserData(...fetchedUser)
        })

        return data
    }, [user])

    return userData
}


export function useFetchUserLinks(user) {

    const [linksData, setLinksData] = useState()

    useEffect(() => {
        if (!user) return

        const query = db.collection('links').where('user', '==', user?.email).orderBy('date', 'desc')

        const data = query.onSnapshot(snapshot => {
            const allLinks = snapshot.docs.map(doc => doc.data())
            
            if (allLinks.length === 0) setLinksData('no link')
            else 
            setLinksData(allLinks?.sort((x,y)=> y.date - x.date).reverse())
        })

        return data
    }, [user])

    return linksData

}



export function useFetchUsers() {

    const [users, setUsersData] = useState()

    useEffect(() => {
        const data = db.collection('users').onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.error(`Aucun utilisateur trouvé`)
                return null
            }
            const fetchedUsers = snapshot.docs.map(doc => doc.data())
            
            setUsersData(fetchedUsers)
        })

        return data
    }, [])

    return users
}