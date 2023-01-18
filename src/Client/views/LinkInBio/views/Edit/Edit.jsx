import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Main from '../../../../../App/components/Main'
import { useStateProps } from '../../../../../App/provider/ContextProvider'
import LinkInBio from '../../LinkInBio'
import Blocks from './settings/components/Blocks'
import Header from './settings/components/Header'
import Widget from './settings/components/Widget'


export function EditLinkInBio() {

    const { user } = useStateProps()

    const { userName } = useParams()

    const User = user?.profil
    const UserLinks = user?.links?.links
    const LinkInBioSettings = user?.link_in_bio

    let { background, blocks, header, menu, text, colorBtn, linkAsIcon } = LinkInBioSettings || {}

        

    const location = useLocation()
    useEffect(e=> {
        document.querySelector('header').style.display = 'block'
    }, [location])



    return (
        <Main>
            <div className='grid blocks gap-2rem' >
                <div className='grid'>
                    <h2>Mon link in bio</h2>

                    <div className='grid gap p-1 white border-r-1'>

                        <Widget props={{ UserLinks }} />

                        <Header props={{ userName, header, LinkInBioSettings }} />

                        <Blocks props={{ blocks, LinkInBioSettings }} />

                    {/*             <label className = 'f-s-20'>Frame</label>
                                <div   className = 'grid p-1 border-r-04 white gap border'>
                                <div   className = 'display justify-s-b gap'>
                            <span>Background</span>
                        </div>
                        <div className = 'display justify-s-b gap'>
                            <span>Color</span>
                            <label className = 'w-3 h-3 border-r-100 border click' htmlFor = 'background-color' style      = {{background : background?.color}} />
                            <input type      = 'color' className                           = 'opacity-0 absolute' onChange = {e=> {
                                Edit('background.icon', e.target.checked, LinkInBioSettings.id)

                                e.target.parentElement.children[1].style.background = e.target.value
                                }}                              id                  = 'background-color'/>
                        </div>
                    </div> */}

                    <div>
                        <button className='display h-4 p-1 blue border-r-1'>
                            <span className='f-s-16 c-black'>Enregistrer</span>
                        </button>
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
                        
                        <div className='border border-r-1 shadow w-100p' style={{ background: background?.color }}>
                            <LinkInBio userView={User} links={UserLinks} username={userName} /> 
                        </div>
                    </div>
                </div>
            </div> 
        </Main>
    
    )
}

