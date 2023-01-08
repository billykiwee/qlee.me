import { ArrowsPointingOutIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import { deleteLinkFromBio } from '../functions/delete'


export default function Set({ props }) {

    const { openSet, setOpenSet, link, isDragDisabled, setIsDragDisabled } = props

    return (
        <div className='display gap'>
            <div className='display justify-c hover border-r-100 w-2 h-2 openSet' onClick={e=> setOpenSet(openSet === '' ? link.id : link.id ) }>
                <EllipsisHorizontalIcon width={28} /> 

                <div className='grid p-04 white border border-r-04 disable absolute' 
                    style={{
                        display : openSet === link.id ? 'flex' : 'none',
                        right   : 0,
                        top     : '2rem',
                        position: 'absolute',
                        zIndex  : 9,
                    }}
                >
                    <Link to={'/edit/'+ link.id}>
                        <div className='display gap hover p-04 border-r-04 h-2'>
                            <PencilSquareIcon width={12} />
                            <small>Modifier</small>
                        </div>
                    </Link>
                    <div className='display gap hover p-04 border-r-04 h-2' onClick={e=> deleteLinkFromBio(link.id) }>
                        <TrashIcon width={12} className='c-red' />
                        <small>Supprimer</small>
                    </div>
                </div>
            </div>

            <div className='w-2 h-2 display justify-c btn-drag' 
                onMouseEnter={e=> {
                    setIsDragDisabled(false)

                    if (isDragDisabled) {
                        e.target.children[0].classList.add('c-blue')
                    }
                }} 
                onMouseLeave={e=> {
                    setIsDragDisabled(true)
                    if (!isDragDisabled) {
                        e.target.children[0].classList.remove('c-blue')
                    }
                }} 
            >
                <ArrowsPointingOutIcon width={20} className={' absolute no-click'} id={'drag-' + link.id} /> 
            </div>
        </div> 
    )
}
