import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Main from '../../../../App/components/Main'
import { SwitchInput } from '../../../../App/components/Switch'
import { db } from '../../../../App/database/firebase'
import { useStateValue } from '../../../../App/provider/StateProvider'
import getFavicon from '../../../../App/utils/getFavicon'
import { fetchUserLinks } from '../../../lib/database/fetchUserLinks'
import LinkInBio from '../LinkInBio'



export function EditLinkInBio() {

    const [{user}] = useStateValue()

    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        fetchUserLinks(setUserLinks, user?.email)
    }, [user])

    function putLinkAsIcon(data) {
        db.collection('links').doc(data.id).update({
            asIcon : data.checked
        })
    }

    const [Position, setPosition] = useState(0)


    
    

    return (
        <Main className='blocks'>
            <div className='grid'>
                <h2>Mon link in bio</h2>

                <div className='grid gap-1rem p-1'>

                    <div className='display justify-s-b'>
                        <span>Lien icon</span>
                        <span>Position</span>
                    </div>
                    <div className='grid gap'>
                        {
                            UserLinks
                            .filter(e=> e.linkInBio === true)
                            .map(ul=> {
                                return (
                                    <div className='display justify-s-b' key={ul.id}>
                                        <div className='display gap'>
                                            <SwitchInput dimension={0.6} checked={ul.asIcon} onChange={e=> {
                                                putLinkAsIcon({ 
                                                    id: ul.id,
                                                    checked : e.target.checked
                                                })
                                            }} />
                                            <img src={ul.icon ?? getFavicon(ul.url)} width={16} className='border-r-100' />
                                            <span>{ul.name}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <LinkInBio userView />
            </div>
        </Main> 
    )
}
