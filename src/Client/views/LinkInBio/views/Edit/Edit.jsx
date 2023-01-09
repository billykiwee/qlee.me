import React from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../../../../App/components/Main'
import { SwitchInput } from '../../../../../App/components/Switch'
import { db } from '../../../../../App/database/firebase'
import getFavicon from '../../../../../App/utils/getFavicon'
import LinkInBio from '../../LinkInBio'
import { LinksAsIcon } from './components/LinkAsIcon'


export function EditLinkInBio({ props }) {

    const { user } = props

    const { userName } = useParams()

    const User = user?.profil
    const UserLinks = user?.links?.links
    const LinkInBioSettings = user?.link_in_bio?.settings[0]

    let { background, blocks, menu, text, colorBtn, linkAsIcon } = LinkInBioSettings || {}

        
    function putLinkAsIcon(data) {
        db.collection('links').doc(data.id).update({
            asIcon : data.checked
        })
    }

    return (
        <Main>
            <div className='grid blocks gap-2rem' >
                <div className='grid'>
                    <h2>Mon link in bio</h2>

                    <div className='grid gap-1rem p-1'>

                        <div className='grid gap justify-s-b'>
                            <label className='f-s-20'>Lien icon</label>
                            <div className='display gap wrap grey border-r-04 p-1 border'  >
                                {
                                    UserLinks
                                    .filter(e=> e.linkInBio === true)
                                    .map(ul=> {
                                        return <LinksAsIcon ul={ul} putLinkAsIcon={putLinkAsIcon} key={ul.id} />
                                    })
                                }
                            </div>
                        </div>

                        <div className='grid p-1 border-r-04 grey gap border'>
                            <label className='f-s-20'>Header</label>
                            <div className='display justify-s-b gap'>
                                <span>Title</span>
                                <label className='w-3 h-3 border-r-100 border click' htmlFor='background-color' style={{background : background?.color}} />
                                <input type='color' className='opacity-0 absolute' onChange={e=> {
                                    db.collection('link-in-bio').doc('@' + userName).update({ ['background.color'] : e.target.value } )

                                    e.target.parentElement.children[1].style.background = e.target.value 
                                }} id='background-color'/>
                            </div>
                        </div>

                        <div>
                            <div className='grid justify-s-b gap-1rem'>

                                <div className='grid p-1 border-r-04 grey border'>
                                    <label className='f-s-20'>Blocks</label>

                                    <div className='grid gap'>
                                        <div className='display justify-s-b gap'>
                                            <span>Border</span>
                                            <div className='display gap'>
                                                <div className='display gap'>   
                                                    <input type='radio' id='radius10' name='radius' />
                                                    <label className='click w-3 h-2 border' htmlFor='radius10' onClick={e=> db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.radius'] : '4' } )} />
                                                </div>
                                                <div className='display gap'>   
                                                    <input type='radio' id='radius100' name='radius' />
                                                    <label className='click w-3 h-2 border border-r-100' htmlFor='radius100' onClick={e=> db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.radius'] : '1000' } )} />
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
                                            <input type='checkbox' checked={blocks?.img} onChange={e=> {
                                                db.collection('link-in-bio').doc('@' + userName).update({ ['blocks.img'] : e.target.checked } )
                                            }}  />
                                        </div>
                                    </div>

                                </div>

                                <div className='grid p-1 border-r-04 grey gap border'>
                                    <label className='f-s-20'>Frame</label>
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
                                    <button className='display h-4 p-1 blue'>
                                        <span className='f-s-16 c-black'>Enregistré</span>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className='relative overflow-hidden border-r-1'>
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
                        
                        <div className='border border-r-1 shadow' style={{background: background?.color}}>
                            <LinkInBio userView={User} links={UserLinks} props={props} /> 
                        </div>
                    </div>
                </div>
            </div> 
        </Main>
    
    )
}

