import { ArrowsPointingOutIcon, ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeOpenIcon, HandRaisedIcon, PencilIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link, useParams } from 'react-router-dom'
import getFavicon from '../../../App/utils/getFavicon'
import { onDragEndLinkInBio, onDragStratLinkInBio } from './functions/drag'
import Background from './components/Background'
import Set from './components/Set'
import { Head } from './components/Head'
import { Footer } from './components/Footer'

export default function LinkInBio({ userView, props }) {

    const { userName } = useParams()

    const { user } = props

    const User = user?.profil
    const Links = user?.link_in_bio?.links
    const [LinkInBioLinks, setLinkInBioLinks] = useState([])
    const LinkInBioSettings = user?.link_in_bio?.settings[0]

    let { background, blocks, menu, text, colorBtn, linkAsIcon } = LinkInBioSettings || {}


    useEffect(e=> {
        setLinkInBioLinks(Links)

        document.querySelector('body').style.background = background?.color

        if (!window.location.href.includes('edit')) {
            document.querySelector('main').style.paddingTop = '4rem'
        }

    }, [User, LinkInBioSettings])

    const [isDragDisabled, setIsDragDisabled] = useState(true)  
    
    
    const ifUserIsOwner = LinkInBioLinks
    .some(e=> e.user === User.email) && userView?.email !== User.email


    const [openSet, setOpenSet] = useState('')
    useEffect(e=> {

        if (openSet) {
            window.onclick = e => {
                if (!e.target.closest('.openSet')) setOpenSet('')
            }
        }

    }, [openSet])



    //if (ifUserIsOwner) window.location.href = '/edit/' + User?.LinkInBioID
    return (
        <>
            <DragDropContext onDragEnd={result=> onDragEndLinkInBio(result, LinkInBioLinks, setLinkInBioLinks)} onDragStart={onDragStratLinkInBio} >
                <div 
                    style={{
                        display     : 'grid',
                        alignContent: 'space-between',
                        alignItems  : 'end',
                        height      : '100%'
                    }}
                >

                    {
                        !userView &&
                        <Background 
                            color = {background?.color}
                            img   = {background?.img?.url}
                            blur  = {background?.img?.blur}
                        />
                    }

                    <div className='grid gap-1rem' style={{ fontFamily: `${text?.fontFamily}` }} >  
                        
                        <Head
                            props={{
                                userView, 
                                User, 
                                LinkInBioLinks 
                            }} 
                        />
                        
                        <Droppable droppableId={LinkInBioLinks[0]?.id} >
                            {(provided) => (

                                <div className='grid gap container' id={LinkInBioLinks[0]?.id} {...provided.droppableProps} ref={provided.innerRef} >
                                    {
                                        LinkInBioLinks
                                        .filter(e=> !e.asIcon)
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
                                                                        {
                                                                            blocks?.img &&
                                                                            <div className='display justify-c absolute'>
                                                                                <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                                                            </div>
                                                                        }
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
                                                                <div className='display border white border-r-1 border-b p-1 click h-2' 
                                                                    style={{
                                                                        background  : blocks?.color,
                                                                        borderRadius: blocks?.radius + 'px'
                                                                    }}
                                                                >
                                                                    {
                                                                        blocks?.img &&
                                                                        <div className='display justify-c absolute'>
                                                                            <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                                                        </div>
                                                                    }
                                                                    <div className='display justify-c w-100p'>
                                                                        <span className='f-s-16'>{link.name}</span>
                                                                    </div>

                                                                    {
                                                                        userView && 
                                                                        <Set props={{
                                                                            openSet,
                                                                            setOpenSet,
                                                                            link,
                                                                            isDragDisabled,
                                                                            setIsDragDisabled
                                                                        }} />
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
                        ifUserIsOwner &&
                        <Footer />
                    }

                </div>
            </DragDropContext>
        </>
    )
    
}



