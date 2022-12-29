import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import { getDevice } from './lib/getDevice'
import { fetchLink } from './lib/database/fetchLink'
import { getAdress } from './lib/api/ipapi/getAdress'


export default function Redirection() {

    const { LinkID } = useParams()

    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('param');
    console.log(paramValue);


    const startLoading = performance.now()
    const statID = 's-' + new Date().getTime()
    


    const fetchData = async () => {
        try {
            const link   = await fetchLink(LinkID)
            const adress = await getAdress()

            const stat = {
                id         : statID,
                adress     : adress,
                reference  : document.referrer ?? null,
                device     : getDevice(),
                performance: performance.now() - startLoading,
                date       : serverTimestamp()
            }

            await db.collection('links')
            .doc(link.id)
            .collection('stats')
            .doc(statID)
            .set(stat)

            await db.collection('links')
            .doc(link.id)
            .update({ views: link.views + 1 })

            window.location.href = link.url

        } catch (err) {
            console.log(err)
            window.location.href = '/page404'
        }
    }


    useEffect(() => {
        //fetchData()
      }, [LinkID])
      
 
    useEffect(e=> {
        document.querySelector('header').style.display = 'none'
        document.querySelector('footer').style.display = 'none'
        document.querySelector('main').style = 'display:flex; justify-content:center;margin:auto;'
    })


    return (
        <Main className='margin-auto'> 
            <Messages loader={true} />
        </Main>
    )
}
