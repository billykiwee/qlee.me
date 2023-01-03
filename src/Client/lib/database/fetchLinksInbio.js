import React from 'react'
import { db } from '../../../App/database/firebase';

export default async function fetchLinksInbio(setUserLinks, userEmail) {

    try {
        if (userEmail) {
            await db.collection('links').onSnapshot(snapshot => {
                const links = snapshot.docs.map(doc => doc.data());
                const getLinksInBio = links
                .filter(e=> e.user === userEmail && e.linkInBio)
                .sort((a,b)=> a.position - b.position)
                
                setUserLinks(getLinksInBio)
            })
        }
    }
    catch (error) {
        console.error(error);
    }

}
