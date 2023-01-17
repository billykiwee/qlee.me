import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { db } from '../../../../../../../App/database/firebase'
import { LinksAsIcon } from '../../components/LinkAsIcon'

export default function Widget({ props }) {

    const { UserLinks } = props

    function putLinkAsIcon(data) {
        db.collection('links').doc(data.id).update({
            asIcon : data.checked
        })
    }

    const [open, setOpen] = useState(false)


    return (
        <div className='grid gap justify-s-b' style={{ borderBottom: '1px solid #494e55', padding: '1rem 0' }} >
             <div className='display justify-s-b'>
                <label className='f-s-20'>Widget</label>
                <div>
                    <button className='border-r-2 p-1 w-2 h-2 hover border white' onClick={e=> setOpen(open ? false : true)} >
                        <span className='display justify-c'>
                            <ChevronDownIcon width={20} className='c-black' />
                        </span>
                    </button>
                </div>
            </div>
            {
                open &&
                <div className='display wrap grey gap border-r-04 p-1'  >
                    {
                        UserLinks
                        .filter(e=> e.linkInBio === true)
                        .map(ul=> {
                            return <LinksAsIcon ul={ul} putLinkAsIcon={putLinkAsIcon} key={ul.id} />
                        })
                    }
                </div>
            }
        </div>
    )
}
