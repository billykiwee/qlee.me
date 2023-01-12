import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import { getDevice } from './lib/getDevice'
import { fetchLink } from './lib/database/links/fetchLink'
import { getAdress } from './lib/api/ipapi/getAdress'
import Main from '../App/components/Main'


export default function Redirection() {

    const { LinkID } = useParams()

    const startLoading = performance.now()
    const statID = 's-' + new Date().getTime()
    

    const fetchData = async () => {
        
        try {
            const link   = await fetchLink(LinkID)
            const adress = await getAdress()

            const stat = {
                LinkID,
                statID,
                adress,
                reference  : document.referrer ?? null,
                device     : getDevice(),
                performance: performance.now() - startLoading,
                date       : serverTimestamp(),
            }

            await db
            .collection('stats')
            .doc(statID)
            .set(stat)

            window.location = link.url

        } catch (err) {
            console.log(err)
            window.location = '/page404'
        }
    }


    useEffect(() => {
       fetchData()
    }, [LinkID])
      
 
    useEffect(e=> {
        document.querySelector('header').style.display = 'none'
        document.querySelector('footer').style.display = 'none'
        document.querySelector('main').style = 'display:flex; justify-content:center;margin:auto;'
    })


    return (
        <Main className='p-0'> 
            <Messages loader={true} />
        </Main>
    )
}
