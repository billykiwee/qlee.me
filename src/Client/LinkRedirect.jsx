import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { useStateValue } from '../App/provider/StateProvider'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'


export default function LinkRedirect() {

    const [{user}] = useStateValue()

    const { LinkID } = useParams()

    const [AllLinks, setAllLinks] = useState([])

    useEffect(e=> {
        db.collection('links').onSnapshot(snapshot => {
            setAllLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    const linkData = {
        user : AllLinks.filter(e=> e.id === LinkID).map(e=> e.user).toString(),
        url  : AllLinks.filter(e=> e.id === LinkID).map(e=> e.url).toString(),
        views: Number(AllLinks.filter(e=> e.id === LinkID).map(e=> e.views))
    }

    
    useEffect(e=> {

        const getURL = new Promise((res,rej)=> {
            if (linkData.url) res(linkData.url)
            else setTimeout(e=> rej() ,5000)
        })

        getURL
        .then(URL=> {

            let updateViews = {views: linkData.views + 1}

            db.collection('DB').doc('links').collection(linkData.user).doc(LinkID).update(updateViews)
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