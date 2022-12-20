import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { useStateValue } from '../App/provider/StateProvider'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import UniqueID from '../App/utils/uniqueID'


export default function LinkRedirect() {



    let débutChargement = 0
    window.onload = e => débutChargement =  performance.now();



    const [{user}] = useStateValue()

    const { LinkID } = useParams()

    const [AllLinks, setAllLinks] = useState([])

    useEffect(e=> {
        db.collection('links').onSnapshot(snapshot => {
            setAllLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])



    const [Location, setLocation] = useState({})
    
    function getIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {

                getLocationData(data.ip)
            })
    }

    useEffect(e=> {
        getIP() 
    }, [])

    function getLocationData(ip) {

        fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
            .then(response => response.json())
            .then(data => {

                setLocation({
                    country: data.geoplugin_countryName,
                    city   : data.geoplugin_city
                })
            })
            .catch(err=> {
                console.error(err)
            })
    }




    const Stats = {
        ...AllLinks
            .filter(e=> e.id === LinkID)
            .map(e=> {
                return {
                    user : e.user,
                    url  : e.url,
                    views: e.views
                }
            })[0]
        ,
        stats: {
            reference : !document.referrer.length ? 'unknown' : document.referrer,
            adress : Location,
            device : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'pc',
        }
    }


    
    useEffect(e=> {

        const getURL = new Promise((res,rej)=> {

            if (Stats.url) 
                res(Stats.url)
            else 
                setTimeout(e=> rej() ,5000)
        })

        getURL
        .then(URL=> {

            const finChargement = performance.now();

            if (Stats.url) {

                let updateViews = {views : Stats.views + 1}
    
                db.collection('links').doc(LinkID).update(updateViews)         
    
                db.
                    collection('links')
                    .doc(LinkID).
                    collection('stats')
                    .add({
                        ...Stats.stats,
                        performance : finChargement - débutChargement,
                        date : serverTimestamp()
                    })
    
                .then(redirect=> window.location.href = URL)
                .catch(e=> console.log(e))
            }

        })
       .catch(page404=>  window.location.href = '/page404')
        
    }, [Stats.url])



 
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