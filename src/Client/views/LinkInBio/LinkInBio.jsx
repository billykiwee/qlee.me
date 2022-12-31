import { ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { db } from '../../../App/database/firebase'
import { useStateValue } from '../../../App/provider/StateProvider'
import getFavicon from '../../../App/utils/getFavicon'
import { fetchUser } from '../../lib/database/fetchUser'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'
import { uploadPhoto } from '../Profil/functions/uploadPhoto'



export default function LinkInBio({userView = true}) {

    const [{user}] = useStateValue()


    const [User,setUser] = useState([])
    const [UserLinks,setUserLinks] = useState([])

    useEffect(e=> {
        fetchUser(setUser, user?.email)
        fetchUserLinks(setUserLinks, user?.email)

    }, [user?.email])

    
    

    const [LinksDrag, setLinksDrag] = useState([]);

    useEffect(e=> {
        setLinksDrag(UserLinks.filter(e=> e.linkInBio === true && e.asIcon !== true).sort((a,b)=> a.position - b.position))
    }, [UserLinks])

    function onDragEnd(result) {    
            // Vérifier s'il y a une destination (l'élément a été déplacé à l'intérieur de la liste)
        if (!result.destination) {
            return;
        }

        // Récupérer l'index de départ et de destination de l'élément
        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        // Mettre à jour l'état de l'application en réorganisant les éléments de la liste
        setLinksDrag((prevLinks) => {
            // Copier la liste actuelle
            const updatedLinks = [...prevLinks];

            // Extraire l'élément à déplacer
            const [movedLink] = updatedLinks.splice(startIndex, 1);

            // Insérer l'élément à sa nouvelle position
            updatedLinks.splice(endIndex, 0, movedLink);


            setLinksDrag(updatedLinks)
            // Renvoyer la liste mise à jour
            return updatedLinks;
        });
    }

 /*    useEffect(e=> {
        const div    = document.querySelectorAll('.draggable')
        const parent = document.querySelector('.container')

        div.forEach(div=> {

            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i] === div) {

                    db.collection('links')
                    .doc(div.id)
                    .update({
                        position : i
                    })
                }
            }
        })
    }, [LinksDrag]) */

    




    return (

        <DragDropContext onDragEnd={onDragEnd}>
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
                    
                    <Droppable droppableId={LinksDrag.map(e=> e.id)[0]}>
                        {(provided) => (
                            <div className='grid gap container' {...provided.droppableProps} ref={provided.innerRef}  >
                                {
                                    LinksDrag
                                    .map((link, i)=> {

                                        return (
                                            <Draggable draggableId={link.id} index={i} key={i}>
                                                {(provided)=> (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='draggable relative' 
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
                                                            <div className='display border white border-r-1 border-b p-1 hover click h-2' >
                                                                <div className='display justify-c absolute'>
                                                                    <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                                                </div>
                                                                <div className='display justify-c w-100p'>
                                                                    <span className='f-s-16'>{link.name}</span>
                                                                </div>
                                                                {
                                                                    userView && 
                                                                    <Link to={'/edit/' + link.id} className='display'>
                                                                        <EllipsisHorizontalIcon width={28} /> 
                                                                    </Link>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })
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
