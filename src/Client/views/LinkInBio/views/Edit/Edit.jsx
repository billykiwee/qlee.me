import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Main from '../../../../../App/components/Main'
import { SwitchInput } from '../../../../../App/components/Switch'
import { db } from '../../../../../App/database/firebase'
import { useStateProps } from '../../../../../App/provider/ContextProvider'
import getFavicon from '../../../../../App/utils/getFavicon'
import LinkInBio from '../../LinkInBio'
import { LinksAsIcon } from './components/LinkAsIcon'
import Header from './settings/components/Header'


export function EditLinkInBio() {

    const { user, link_in_bio } = useStateProps()

    const { userName } = useParams()

    const User = user?.profil
    const UserLinks = user?.links?.links
    const LinkInBioSettings = link_in_bio

    let { background, blocks, header, menu, text, colorBtn, linkAsIcon } = LinkInBioSettings || {}

        
    function putLinkAsIcon(data) {
        db.collection('links').doc(data.id).update({
            asIcon : data.checked
        })
    }

    const location = useLocation()
    useEffect(e=> {
        document.querySelector('header').style.display = 'block'
    }, [location])



    return (
        <Main>
            <div className='grid blocks gap-2rem' >
                <div className='grid'>
                    <h2>Mon link in bio</h2>

                    <div className='grid gap-1rem p-1'>

                        <div className='grid gap justify-s-b'>
                            <label className='f-s-20'>Wiget</label>
                            <div className='display gap wrap white border-r-04 p-1 border'  >
                                {
                                    UserLinks
                                    .filter(e=> e.linkInBio === true)
                                    .map(ul=> {
                                        return <LinksAsIcon ul={ul} putLinkAsIcon={putLinkAsIcon} key={ul.id} />
                                    })
                                }
                            </div>
                        </div>

                        <Header props={{ userName, header }} />


                        <div className='grid p-1 border-r-04 white gap border'>
                            <div className='display justify-s-b gap'>
                                <span>Description</span>
                            </div>
                            <div className='grid justify-s-b gap'>
                                <span>Text</span>
                                <div>
                                    <textarea className='grey' value={header?.description?.text} onChange={e=> {
                                        db.collection('link-in-bio').doc('@' + userName).update({ ['header.description.text'] : e.target.value } )
                                    }} />
                                </div>
                            </div>
                            <div className='display justify-s-b gap'>
                                <span>color</span>
                                <input type='color' className='opacity-0 absolute' onChange={e=> {
                                    db.collection('link-in-bio').doc('@' + userName).update({ ['header.description.color'] : e.target.value } )

                                    e.target.parentElement.children[1].style.background = e.target.value 
                                }} id='description-color'/>
                                <label htmlFor='description-color' className='f-s-25 f-w-600 click hover border-r-2 w-3 h-3 display justify-c' style={{color : header?.description?.color}}>A</label>
                            </div>
                            <div className='display justify-s-b gap'>
                                <span>size</span>
                                <input type='range' onChange={e=> {
                                    db.collection('link-in-bio').doc('@' + userName).update({ ['header.description.fontSize'] : e.target.value } )
                                }} id='description-fontSize' />
                                <label htmlFor='description-fontSize' className='f-s-16 click hover border-r-2 w-3 h-3 display justify-c'>{header?.description?.fontSize + 'px'}</label>
                            </div>
                        </div>

                        <div>
                            <div className='grid justify-s-b gap-1rem'>

                                <label className='f-s-20'>Blocks</label>
                                <div className='grid p-1 border-r-04 white border'>

                                    <div className='grid gap'>
                                        <div className='display justify-s-b gap'>
                                            <span>Border</span>
                                            <div className='display gap'>
                                                <div className='display gap'>   
                                                    <input type='radio' id='radius10' name='radius' />
                                                    <label className='click w-3 h-2 border' style={{border: '1px solid var(--black)'}} htmlFor='radius10' onClick={e=> db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.radius'] : '6' } )} />
                                                </div>
                                                <div className='display gap'>   
                                                    <input type='radio' id='radius100' name='radius' />
                                                    <label className='click w-3 h-2 border border-r-100' style={{border: '1px solid var(--black)'}} htmlFor='radius100' onClick={e=> db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.radius'] : '1000' } )} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='display justify-s-b gap'>
                                            <span>Color</span>
                                            <label className='w-3 h-2 border-r-100 border click' htmlFor='textColor' style={{background : blocks?.color}}  />
                                            <input type='color' className='opacity-0 absolute' onChange={e=> {
                                                db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.color'] : e.target.value } )

                                                e.target.parentElement.children[1].style.background = e.target.value 
                                            }} id='textColor' />
                                        </div>

                                        <div className='display justify-s-b gap'>
                                            <span>Text Color</span>
                                            <label className='w-3 h-2 border-r-100 border click' htmlFor='color' style={{background : blocks?.textColor}} />
                                            <input type='color' className='opacity-0 absolute' onChange={e=> {
                                                db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.textColor'] : e.target.value } )

                                                e.target.parentElement.children[1].style.background = e.target.value 
                                            }} id='color' />
                                        </div>

                                        <div className='display justify-s-b gap'>
                                            <span>Logo</span>
                                            <input type='checkbox' checked={blocks?.icon} onChange={e=> {
                                                db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.icon'] : e.target.checked } )
                                            }}  />
                                        </div>
                                    </div>

                                </div>

                                <label className='f-s-20'>Frame</label>
                                <div className='grid p-1 border-r-04 white gap border'>
                                    <div className='display justify-s-b gap'>
                                        <span>Background</span>
                                    </div>
                                    <div className='display justify-s-b gap'>
                                        <span>Color</span>
                                        <label className='w-3 h-3 border-r-100 border click' htmlFor='background-color' style={{background : background?.color}} />
                                        <input type='color' className='opacity-0 absolute' onChange={e=> {
                                            db.collection('link-in-bio').doc('@' + userName).update({ ['background.color'] : e.target.value } )

                                            e.target.parentElement.children[1].style.background = e.target.value 
                                        }} id='background-color'/>
                                    </div>
                                </div>

                                <div>
                                    <button className='display h-4 p-1 blue border-r-1'>
                                        <span className='f-s-16 c-black'>Enregistrer</span>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className='relative overflow-hidden border-r-1 w-100p'>
                        <div style={{
                            backgroundImage   : !background?.color && `url(${background?.img?.url}`,
                            filter            : `blur(${background?.img?.blur}px)`,
                            left              : 0,
                            right             : 0,
                            position          : 'absolute',
                            backgroundSize    : 'cover',
                            backgroundPosition: 'center',
                            backgroundColor   : background?.color
                        }} />
                        
                        <div className='border border-r-1 shadow w-100p p-b-2 p-t-2' style={{background: background?.color}}>
                            <LinkInBio userView={User} links={UserLinks} username={userName} /> 
                        </div>
                    </div>
                </div>
            </div> 
        </Main>
    
    )
}

