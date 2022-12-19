import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { useStateValue } from '../App/provider/StateProvider'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import UniqueID from '../App/utils/uniqueID'


export default function LinkRedirect() {

    const [{user}] = useStateValue()

    const { LinkID } = useParams()

    const [AllLinks, setAllLinks] = useState([])

    useEffect(e=> {
        db.collection('links').onSnapshot(snapshot => {
            setAllLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])



    const [IP, setIP] = useState({})
    
    function getIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {

                getLocationData(data.ip)
            })
    }

    window.onload = e => getIP() 

    function getLocationData(ip) {

        fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
            .then(response => response.json())
            .then(data => {

                    setIP({
                        ip        : data.geoplugin_request,
                        country   : data.geoplugin_countryName,
                        city      : data.geoplugin_city
                    })
            })
            .catch(err=> {
                console.error(err)
            })
    }

    const navigatorData = {
        reference : document.referrer,
        userAgent : navigator.userAgent,
        vendor : navigator.vendor,
        adress : IP,
        device : {
            platform : navigator.platform,
            screenResolution : window.screen.width + 'x' + window.screen.height,
            isMobile : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,
        },
        date : serverTimestamp()
    }


    const linkData = {
        user : AllLinks.filter(e=> e.id === LinkID).map(e=> e.user).toString(),
        url  : AllLinks.filter(e=> e.id === LinkID).map(e=> e.url).toString(),
        views: Number(AllLinks.filter(e=> e.id === LinkID).map(e=> e.views)),
        stats: navigatorData
    }



    ////// TEST
   /*  useEffect(e=> {

        db.collection('links').doc(LinkID).collection('stats').doc(UniqueID('data' , 26)).set({
            reference : document.referrer,
            userAgent : navigator.userAgent,
            vendor : navigator.vendor,
            IP : {
                ip        : 8390409394,
                city      : 'Paris',
                continent : 'Europe',
                country   : 'France',
                region    : 'Paris',
                regionCode: '75',
                department: 'Haute'
            },
            device : {
                platform : navigator.platform,
                screenResolution : window.screen.width + 'x' + window.screen.height,
                isMobile : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,
            },
            date : serverTimestamp()
        })

    }, []) */

    
    useEffect(e=> {

        const getURL = new Promise((res,rej)=> {
            if (linkData.url) res(linkData.url)
            else setTimeout(e=> rej() ,5000)
        })

        getURL
        .then(URL=> {

            let updateViews = {views : linkData.views + 1}

            db.collection('links').doc(LinkID).update(updateViews)         

            db.collection('links').doc(LinkID).collection('stats').doc(UniqueID('data' , 26)).set(linkData.stats)
            .then(redirect=> window.location.href = URL)
            .catch(e=> console.log(e))
        })
       .catch(page404=>  window.location.href = '/page404')
        
    }, [linkData.url])



 
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