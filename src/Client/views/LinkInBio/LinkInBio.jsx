import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link, useLocation, useParams } from 'react-router-dom'
import { onDragEndLinkInBio, onDragStratLinkInBio } from './functions/drag'
import Background from './components/Background'
import { Head } from './components/Head'
import { Footer } from './components/Footer'
import { Read } from './views/Edit/components/Read'
import { Edit } from './views/Edit/components/Edit'
import { LinksAsIcon } from './views/Edit/components/LinkAsIcon'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { getUser, useGetUser } from '../../data/user/getUser'
import { settings } from './views/Edit/settings/settings'
import { useFetchLinkInBio } from '../../data/user/link_in_bio'



export default function LinkInBio({ userView, username }) {

    const location = useLocation()

    const { links } = useStateProps()
    const link_in_bio = useFetchLinkInBio(location)

    const User = useGetUser(link_in_bio?.user)
    
    
    const link_in_bio_Links = links
    .filter(e=> e.user === link_in_bio?.user)
    .filter(e=> e.linkInBio)
    
    const Settings = settings(link_in_bio)
    
    const [LinkInBioLinks, setLinkInBioLinks] = useState([])
    useEffect(e=> {
        setLinkInBioLinks(link_in_bio_Links)
    }, [User])



    const [isDragDisabled, setIsDragDisabled] = useState(true)  

    const [openSet, setOpenSet] = useState('')
    useEffect(e=> {

        if (openSet) {
            window.onclick = e => {
                if (!e.target.closest('.openSet')) setOpenSet('')
            }
        }

    }, [openSet])

    
    useEffect(e=> {
        if (!userView) document.querySelector('header').style.display = 'none'
    }, [location])



    if (User?.email)
    return (
        <div style={{width: '100%', maxWidth: '1200px',margin: 'auto'}}>
        
            {
                !userView &&
                <Background 
                    color = {Settings?.background?.color}
                    img   = {Settings?.background?.img?.url}
                    blur  = {Settings?.background?.img?.blur}
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
                                <Link to={'/@' + username}>
                                    <button className='display hover border-r-100 border h-3 w-3 shadow' style={{background: 'white'}}>
                                        <ArrowUpRightIcon width={20} color='black' />
                                    </button>
                                </Link>
                            </div>
                        }

                        <div className='grid gap-1rem' style={{ fontFamily: `${Settings?.text?.fontFamily}` }} >  
                            
                            <Head
                                props={{
                                    userView, 
                                    User, 
                                    LinkInBioLinks,
                                    link_in_bio
                                }} 
                            />
                            
                            <Droppable droppableId={LinkInBioLinks[0]?.id} >
                                {(provided) => (

                                    <div className='grid gap container' id={LinkInBioLinks[0]?.id} {...provided.droppableProps} ref={provided.innerRef} >
                                        {

                                            LinkInBioLinks
                                            .map((link, i) => {
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
                                                                    ? <Read props={{ link, blocks: Settings.blocks }} />
                                                                    : <Edit 
                                                                        props={{ 
                                                                            link, 
                                                                            blocks: Settings.blocks, 
                                                                            openSet, 
                                                                            setOpenSet, 
                                                                            isDragDisabled, 
                                                                            setIsDragDisabled 
                                                                        }} 
                                                                    />
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
                            !userView && <Footer />
                        }

                    </div>
                </DragDropContext>
            </div>
        </div>
    )
    
}

