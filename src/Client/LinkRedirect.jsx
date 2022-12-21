import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { useStateValue } from '../App/provider/StateProvider'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import UniqueID from '../App/utils/uniqueID'
import { checkURLReference } from './lib/checkURLReference'
import { getDevice } from './lib/getDevice'


export default function LinkRedirect() {

    const { LinkID } = useParams()


    const startLoading = performance.now()
    const statID = 's-' + new Date().getTime()


    useEffect(e=> {

        async function getAdress() {
            return (
                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => data.ip)
                    .then(async ip=> {
            
                        return (
                            fetch(`https://ipapi.co/${ip}/json/`)
                            .then(response => response.json())
                            .then(adress => {
                
                                return {
                                    country: adress.country_name,
                                    city   : adress.city
                                }
                            })
                        )
                    })
            )
        }

        getAdress()
        .then(adress=> {

            const getAllLinks = new Promise((res, rej)=> {
    
                db.collection('links').onSnapshot(snapshot => {
                    res(snapshot.docs.map(doc => doc.data()))
                })
            })

            getAllLinks
            .then(getLink=> {
        
                let link = getLink?.filter(e=> e.id === LinkID).map(e=> e)[0] 
    
                db.collection('links')
                .doc(LinkID)
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
                    .doc(LinkID)
                    .update({
                        views : link.views + 1
                    }) 
        
                    .then(e=> {                    
                        window.location.href = link.url
                    })
                    .catch(page404 => (window.location.href = '/page404'))    
                })

            })
        })

    }, [LinkID])








   /*  useEffect(e=> {
        
        const startLoading = performance.now();
    
        const getAllLinks = new Promise((res, rej)=> {
    
            db.collection('links').onSnapshot(snapshot => {
                res(snapshot.docs.map(doc => doc.data()))
            })
        })
    
        getAllLinks
        .then(allLinks=> {
            
            const filterLinks = (
                allLinks
                    .filter(e=> e.id === LinkID)
                    .map(e=> {
                        return {
                            user : e.user,
                            url  : e.url,
                            views: e.views
                        }
                    })[0]
            )
    
            return filterLinks
        })
    
        .then(linksFiltred=> {
    
            fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .then(ip=> {
    
                fetch(`https://ipapi.co/${ip}/json/`)
                .then(response => response.json())
                .then(adress => {
    
                    return {
                        country: adress.country_name,
                        city   : adress.city
                    }
                })
    
                .then(getadress=> {
    
                    const getSource = new Promise((res,rej)=> {
                        res(document.referrer)
                    })
    
                    getSource
                    .then(src=> {
    
                        const data = {
                            id         : 's-' + new Date().getTime(),
                            reference  : src ?? null,
                            adress     : getadress,
                            device     : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile': 'pc',
                            performance: performance.now() - startLoading,
                            date       : serverTimestamp()
                        }
                        return data
                    })
                    
                    .then(data=> {
    
                        db
                        .collection('links')
                        .doc(LinkID)
                        .update({ views : linksFiltred.views + 1 })      
    
                        db
                        .collection('links')
                        .doc(LinkID)
                        .collection('stats')
                        .doc(data.id)
                        .set(data)
    
                        .then(redirect=> window.location.href = linksFiltred.url)
                    })
                    .catch(err=> console.log(err))
        
                })
                .catch(err=> console.log(err))
    
            })
            .catch(err=> console.log(err))
    
        })
        .catch(e=> window.location.href = '/page404')

    }, [LinkID])
 */


 
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
