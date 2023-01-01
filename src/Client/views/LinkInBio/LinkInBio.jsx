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



    

    console.log(UserLinks);


    function onDragEnd(result) {  
        
        const { source, destination } = result

        console.log(source, destination)

        db.collection('links')
          .doc(destination.droppableId)
          .update({
            position: destination.index,
          })
        
        const startIndex = source.index
        const endIndex = destination.index
        
        setUserLinks(prevLinks => {
          const updatedLinks = [...prevLinks]
        
          const [movedLink] = UserLinks.map(e=> e.linkInBio).splice(startIndex, 1)
        
          updatedLinks.splice(endIndex, 0, movedLink)
        
          console.log(updatedLinks.map(e => e.id))
        
          return updatedLinks
        })
    }




const sub = e=> {
    e.preventDefault()

    alert(`Your name is ${e.target.elements.website.value}`);
    return false
}


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

                <form onSubmit={sub}>
                    <label for="website">Enter a website address:</label>
                    <input type="url" id="website" name="website"/>
                    <input type="submit" value="Submit"/>
                </form>

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
                    
                    <Droppable droppableId={UserLinks.map(e=> e.linkInBio)[0]} >
                        {(provided) => (
                            <div className='grid gap container' {...provided.droppableProps} ref={provided.innerRef}  >
                                {
                                    UserLinks
                                    .sort((a,b)=> a.position - b.position)
                                    .map((link, i)=> {

                                        return (
                                            <Draggable draggableId={link.id} index={i} key={i}>
                                                {(provided)=> (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='draggable relative' 
                                                        id={link.id}
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
