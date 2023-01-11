import { ArrowsPointingOutIcon, ArrowUpRightIcon, ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeOpenIcon, HandRaisedIcon, PencilIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link, useParams } from 'react-router-dom'
import { onDragEndLinkInBio, onDragStratLinkInBio } from './functions/drag'
import Background from './components/Background'
import { Head } from './components/Head'
import { Footer } from './components/Footer'
import { Read } from './views/Edit/components/Read'
import { Edit } from './views/Edit/components/Edit'
import { LinksAsIcon } from './views/Edit/components/LinkAsIcon'
import { useStateProps } from '../../../App/provider/ContextProvider'



export default function LinkInBio({ userView }) {

    const { userName } = useParams()

    const { user } = useStateProps()

    const User = user?.profil
    const Links = user?.link_in_bio?.links
    const [LinkInBioLinks, setLinkInBioLinks] = useState([])
    const LinkInBioSettings = user?.link_in_bio?.settings[0]

    let { background, blocks, menu, text, colorBtn, linkAsIcon } = LinkInBioSettings || {}


    useEffect(e=> {
        setLinkInBioLinks(Links)
        //document.querySelector('body').style.background = background?.color
    }, [User])

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
        <div style={{width: '100%', maxWidth: '1200px',margin: 'auto'}}>
        
            {
                !userView &&
                <Background 
                    color = {background?.color}
                    img   = {background?.img?.url}
                    blur  = {background?.img?.blur}
                />
            }

            <div style={{ padding: '2rem', height: !userView && '100vh' }} >
                
                <DragDropContext onDragEnd={result=> onDragEndLinkInBio(result, LinkInBioLinks, setLinkInBioLinks)} onDragStart={onDragStratLinkInBio} >
                    <div style={{
                        display     : 'grid',
                        alignContent: 'space-between',
                        alignItems  : 'end',
                        height      : '100%'
                    }}>

                        {
                            userView &&
                            <div className='zi-2 display justify-e' style={{ position: 'absolute', right: '2rem', top: '2rem' }}>
                                <Link to={'/@' + userName}>
                                    <button className='display hover border-r-100 border h-3 w-3 shadow' style={{background: 'white'}}>
                                        <ArrowUpRightIcon width={20} color='black' />
                                    </button>
                                </Link>
                            </div>
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
                                                                    ? <Read props={{ link, blocks }} />
                                                                    : <Edit props={{ link, blocks, openSet, setOpenSet, isDragDisabled, setIsDragDisabled }} />
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
                            ifUserIsOwner && <Footer />
                        }

                    </div>
                </DragDropContext>
            </div>
        </div>
    )
    
}

