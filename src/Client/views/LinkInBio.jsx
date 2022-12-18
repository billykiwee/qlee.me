import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../App/components/Main'
import { useStateValue } from '../../App/provider/StateProvider'
import { db } from '../../App/database/firebase'
import { Link } from 'react-router-dom';
import getFavicon from '../../App/utils/getFavicon'
import { minimizeString } from '../../App/utils/minimizeString'



export default function LinkInBio() {

    const [{user}] = useStateValue()
    const { UserID } = useParams()


    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        const getUser = new Promise((resolve, reject) => {
            resolve(user?.email)
        })

        getUser
        .then(userEmail => {
            db.collection('DB').doc('links').collection(userEmail).orderBy('date').onSnapshot(snapshot => {
                setUserLinks(snapshot.docs.map(doc => doc.data()))
            })
        })

    }, [user])


    if (user?.email === UserID)
    return (
        <Main>
            <div className='grid gap'>
                {
                    UserLinks
                    .map(userlink=> {
                        return (
                            <div className='display gap p-1 border-b border-r-1 border justify-s-b white h-3' key={userlink?.id}>
                                <div className='display gap-1rem'>
                                    <Link to={'/edit/' + userlink?.shortLink.split('/')[1]}>
                                        <img src={getFavicon(userlink?.url)} className='w-2 h-2 border-r-100' />
                                    </Link>
                                    <div className='grid '> 
                                        <div className='display gap'>
                                            <span className='f-s-16'>{minimizeString(userlink?.name, 10)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={'/edit/' + userlink?.shortLink.split('/')[1]}>
                                        <button className='display hover border-r-100  w-3 h-3'>
                                            <span className='display justify-c'>
                                                <img src='images/link.svg' />
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }).reverse()
                }
            </div>
            
        </Main>
    )
}
