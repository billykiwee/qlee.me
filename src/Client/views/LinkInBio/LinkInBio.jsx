import { ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
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



    const [letDrag, setLetDrag]= useState(false)
    

    const onDragStart = e => {
        e.target.classList.add('dragging')
    }
    
    const onDragEnd = e => {
        e.target.classList.remove('dragging')
        
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

                    console.table({
                        id: div.id,
                        position: i
                    });
        
                }
            }
        })
    }

    const onDragOver = e => {

        const container = document.querySelector('.container')

        e.preventDefault()
        
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        
        if (afterElement == null) {
            container.appendChild(draggable)
        }
        else container.insertBefore(draggable, afterElement)


        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        
            return draggableElements.reduce((closest, child) => {
        
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            }
            else return closest
        
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
    }

    







    return (

        <Main style={{
            paddingTop  : '2rem',
            display     : 'grid',
            alignContent: 'space-between',
            alignItems  : 'end',
            height      : '100vh',
        }}>

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
                <div className='grid gap container' onDragOver={onDragOver}>
                    {
                        UserLinks
                        .filter(e=> e.linkInBio === true && e.asIcon !== true)
                        .sort((a,b)=> a.position - b.position)
                        .map(link=> {

                            return (
                                <div 
                                    key={link.url}
                                    id={link.id}
                                    className='draggable relative' 
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                    draggable
                                    onMouseEnter={e=> e.target.style = 'cursor: grab'} 
                                    onDrag={e=> e.target.style = 'cursor: grabbing'}
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
                            )
                        })
                    }
                </div>
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
    )
}
