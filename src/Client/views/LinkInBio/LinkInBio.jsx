import { ArrowsPointingOutIcon, ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeOpenIcon, HandRaisedIcon, PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import { css } from '../../../css'
import Main from '../../../App/components/Main'
import { db } from '../../../App/database/firebase'
import { useStateValue } from '../../../App/provider/StateProvider'
import getFavicon from '../../../App/utils/getFavicon'
import { fetchUser } from '../../lib/database/fetchUser'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'
import { uploadPhoto } from '../Profil/functions/uploadPhoto'
import fetchLinksInbio from '../../lib/database/fetchLinksInbio'
import { DeleteLink } from '../Links/functions/Delete'
import { deleteLinkFromBio } from './functions/delete'
import { onDragEndLinkInBio, onDragStratLinkInBio } from './functions/drag'



export default function LinkInBio({userView = true}) {

    const [{user}] = useStateValue()

    const [User, setUser] = useState([])
    const [UserLinks, setUserLinks] = useState([])


    useEffect(e=> {
        fetchUser(setUser, user?.email)
        fetchLinksInbio(setUserLinks, user?.email)
    }, [user?.email])
    


    const [isDragDisabled, setIsDragDisabled] = useState(true)

    


    
    
    
    return (

        <DragDropContext onDragEnd={result=> onDragEndLinkInBio(result, UserLinks, setUserLinks)} onDragStart={onDragStratLinkInBio} >
            <Main 
                style={{
                    paddingTop  : '2rem',
                    display     : 'grid',
                    alignContent: 'space-between',
                    alignItems  : 'end',
                    height      : '100vh',
                }}
            >

                <div className=' gap-1rem'>  
                    
                    <div className='grid gap-1rem p-1'>
                        {
                            userView 
                            ? 
                            (
                                <div className='display justify-c'>
                                    <div className='edit-image-link'>
                                        <img src={User?.photoURL} width={80} height={80} className='border-r-100' />
                                        <div className='display justify-c border-r-100 white shadow border hover-white absolute click p-04' onClick={e=> document.querySelector('#upload-img').click()}  > 
                                            <PencilSquareIcon width={16} />
                                            <input 
                                                type='file' 
                                                hidden 
                                                id='upload-img' 
                                                onChange={fileInput => { uploadPhoto(fileInput, User.email) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                            : 
                            (
                                <div className='display justify-c'>
                                    <img src={User.photoURL} width={80} height={80} className='border-r-100' />
                                </div>
                            )
                        }
                        <div className='grid gap-1rem'>
                            <div className='grid gap'>
                                <div className='display justify-c'>
                                    <span className='f-s-25 f-w-400'>@{User.name}</span>
                                </div>
                                <div className='display justify-c'>
                                    <span className='f-s-16 c-grey f-w-300 text-align-c'>{User.description}</span>
                                </div>
                            </div>
                            <div className='display gap-1rem justify-c'>
                                {
                                UserLinks
                                .filter(e=> e.linkInBio === true && e.asIcon === true)
                                .map((link, i)=> {
        
                                        return (
                                            <a href={'https://'+ link.shortLink} className='link' key={i} >
                                                <img src={link.icon ?? getFavicon(link.url)} width={34} className='border-r-100' />
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                    <Droppable droppableId={UserLinks.length && 'UserLinks'} >
                        {(provided) => (

                            <div className='grid gap container' id={UserLinks.length && 'UserLinks'} {...provided.droppableProps} ref={provided.innerRef}  >
                                {
                                   UserLinks
                                    .map((link, i)=> {

                                        return (
                                            <Draggable draggableId={link.id} index={i} key={link.id} isDragDisabled={isDragDisabled}>
                                                {(provided)=> (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={link.id}
                                                    >
                                                        {
                                                            !userView 
                                                            ?
                                                            <a href={'https://' + link.shortLink} className='relative'>
                                                                <div className='display border white border-r-1 border-b p-1 hover click h-2' >
                                                                    <div className='display justify-c absolute'>
                                                                        <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                                                    </div>
                                                                    <div className='display justify-c w-100p'>
                                                                        <span className='f-s-16'>{link.name}</span>
                                                                    </div>
                                                                    {
                                                                        userView && 
                                                                        <div className='display'>
                                                                                <EllipsisHorizontalIcon width={28} /> 
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </a>
                                                            :
                                                            <div className='display border white border-r-1 border-b p-1 click h-2' >
                                                                <div className='display justify-c absolute'>
                                                                    <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                                                </div>
                                                                <div className='display justify-c w-100p'>
                                                                    <span className='f-s-16'>{link.name}</span>
                                                                </div>
                                                                {
                                                                    userView && 
                                                                    <div className='display gap'>
                                                                        <div  className='display justify-c hover border-r-100 w-2 h-2' onClick={e=> {
                                                                            const detail = document.querySelector('#details-'+ link.id)

                                                                            detail.style.display = detail.style.display == 'none' ? 'flex' : 'none'

                                                                        }}>
                                                                            <EllipsisHorizontalIcon width={28} /> 

                                                                            <div className='grid p-04 white border border-r-04 disable absolute' id={'details-'+ link.id} style={{
                                                                                right: 0,
                                                                                top: '2rem',
                                                                                position: 'absolute',
                                                                                zIndex: 9,
                                                                            }}>
                                                                                <Link to={'/edit/'+ link.id}>
                                                                                    <div className='display gap hover p-04 border-r-04'>
                                                                                        <PencilSquareIcon width={12} />
                                                                                        <small>Modifier</small>
                                                                                    </div>
                                                                                </Link>
                                                                                <div className='display gap hover p-04 border-r-04' onClick={e=> deleteLinkFromBio(link.id) }>
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
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })
                                    .sort((a,b)=> a.position - b.position)
                                }
                            </div>
                        )}
                    </Droppable>
                </div>
                        
                {
                    !userView &&
                    <div className='display justify-c' style={{position: 'sticky', bottom: '1rem'}} >
                        <a href='/' className='display gap' id='link-qlee' 
                            onMouseEnter={e=> {
                                document.querySelector('#link-qlee').children[1].style.display = 'flex'
                            }}
                            onMouseLeave={e=> {
                                document.querySelector('#link-qlee').children[1].style.display = 'none'
                            }}
                        >
                            <img src='/favicon.ico' width={32} />
                            <span className='c-grey f-w-300 disable'>Made by Qlee.me</span>
                        </a>
                    </div>
                }
            </Main>
        </DragDropContext>
    )
}


