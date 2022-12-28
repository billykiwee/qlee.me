import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Main from '../../../../App/components/Main'
import { SwitchInput } from '../../../../App/components/Switch'
import { db } from '../../../../App/database/firebase'
import { useStateValue } from '../../../../App/provider/StateProvider'
import getFavicon from '../../../../App/utils/getFavicon'
import { fetchUserLinks } from '../../../lib/database/fetchUserLinks'
import LinkInBio from '../LinkInBio'

import { useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'



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
    

    return (
    
        <Main className='blocks'>
            <div className='grid'>
                <h2>Mon link in bio</h2>

                <div className='grid gap-1rem p-1'>

                    <div className='display justify-s-b'>
                        <span>Lien icon</span>
                    </div>
                    <div className='grid gap'>
                        {
                            UserLinks
                            .filter(e=> e.linkInBio === true)
                            .map(ul=> {
                                return (
                                    <UserLink ul={ul} putLinkAsIcon={putLinkAsIcon}  key={ul.id}/>
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


function UserLink({ ul ,putLinkAsIcon }) {

  
    return (

        <div className='display justify-s-b click' >

            <label className='display gap-04 click' htmlFor={'l-' + ul.id}>
                <SwitchInput 
                    dimension={0.6} 
                    checked={ul.asIcon} 
                    id={'l-' + ul.id}
                    onChange={(e) => {
                        putLinkAsIcon({
                            id: ul.id,
                            checked: e.target.checked,
                        })
                    }}
                />
                <img src={ul.icon ?? getFavicon(ul.url)} width={16} className='border-r-100' />
                <span>{ul.name}</span>
            </label>
        </div>
    )
  }
  