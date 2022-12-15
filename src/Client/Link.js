import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../App/components/Main'
import { db } from '../App/database/firebase'
import Messages from '../App/utils/Messages'


export default function Link() {

    const { LinkID } = useParams()

    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        db.collection('DB').doc('links').collection('links').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    const [loading, setLoading] = useState(true)
    

    useEffect(e=> {
        setTimeout(e=> {
            if (UserLinks.length > 0) setLoading(false)
        }, 1000)
    }, [UserLinks])

    useEffect(e=> {
            if (loading === false) redirect(UserLinks)
    }, [loading])


    async function view(array) {
        for (const v in array) {
            if (array[v].id === LinkID) {
                await db.collection('DB').doc('links').collection(array[v].user).doc(LinkID).update({
                    views: array[v].views +1
                })
                await db.collection('DB').doc('links').collection('links').doc(LinkID).update({
                    views: array[v].views +1
                })
                return array[v].url
            }
        }
    }


    function redirect() {
        view(UserLinks)
        .then(redirect=> {
            window.location.href = redirect
        })
    }



    
    useEffect(e=> {

        window.onload = e => {
            document.querySelector('header').style.display = 'none'
            document.querySelector('footer').style.display = 'none'
            document.querySelector('.container').style = 'display:flex; justify-content:center;margin:auto;'
        }
    })

    return (
        <Main className='margin-auto'> 
            <Messages loader={loading} />
        </Main>
    )
}
