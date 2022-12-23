import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import Main from '../../App/components/Main'
import { useStateValue } from '../../App/provider/StateProvider'
import { db } from '../../App/database/firebase'
import Messages from '../../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import { getDevice } from '../lib/getDevice'
import { fetchLink } from '../lib/database/fetchLink'
import { getAdress } from '../lib/api/ipapi/getAdress'


export default function Redirection() {

    const { LinkID } = useParams()
    
    const startLoading = performance.now()
    const statID = 's-' + new Date().getTime()


    const [link, setLink] = useState({})

    useEffect(e=> {
        fetchLink(setLink, LinkID)
        .catch(e=> {
            window.location.href = '/page404'
        })
    }, [LinkID])


    useEffect(e=> {

        getAdress()
        .then(getAdress=> getAdress)
        .then(adress=> {

            db.collection('links')
            .doc(link.id)
            .collection('stats')
            .doc(statID)
            .set({
                id         : statID,
                adress     : adress,
                reference  : document.referrer ?? null,
                device     : getDevice(),
                performance: performance.now() - startLoading,
                date       : serverTimestamp()
            })
            .then(e=> {
    
                db.collection('links')
                .doc(link.id)
                .update({
                    views: link.views + 1
                }) 
                .then(e=> {                    
                    window.location.href = link.url
                })
            })
            .catch(err=> console.log(err))    
        })
        .catch(err=> console.log(err))    

    }, [link])

 
    useEffect(e=> {

        document.querySelector('header').style.display = 'none'
        document.querySelector('footer').style.display = 'none'
        document.querySelector('.container').style = 'display:flex; justify-content:center;margin:auto;'
    })

    return (
        <Main className='margin-auto'> 
            <Messages loader={true} />
        </Main>
    )
}
