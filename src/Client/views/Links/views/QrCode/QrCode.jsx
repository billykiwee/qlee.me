import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { SwitchInput } from '../../../../../App/components/Switch'
import { colors } from '../../../../../App/utils/generateLetterImage'
import getFavicon from '../../../../../App/utils/getFavicon'
import { download } from './functions/htmlToImage/download'
import QrCodeSvg, { EditQrCode } from './components/Edit'



export default function QrCodeSection({Link, QrCode}) {

    const [frame, setFrame] = useState(false)
    const [frameActive, setframeActive] = useState(true)
    const [frameColor, setframeColor] = useState('')

    const [line, setLine] = useState(false)
    const [lineColor, setLineColor] = useState('')
    const [color, setColor] = useState('')
    const [logo, setLogo] = useState(true)
    const [text, setText] = useState('Qlee me')



    if (QrCode)
    return (
        <div className='grid gap-2rem'>

            <div className='border border-r-1 p-2 grid gap-2rem justify-s-a white '>
                <div className='display justify-c'>
                    <EditQrCode 
                        style={{
                            frameActive,
                            frameColor,
                            lineColor,
                            color,
                            logo,
                            text
                        }} 
                        link={Link} 
                    />
                </div>

                <div className='grid gap '>
                    <div className='grid gap-1rem border-r-04 grey p-1'>
                        <div className='display justify-s-b'>
                            <span>Cadre</span>
                            <div className='click display border-r-2 justify-c' >
                                <SwitchInput dimension={0.7} checked={frameActive} onChange={e=> setframeActive(frameActive ? false : true)} />
                            </div>
                        </div>
                        {
                            frameActive && 
                            <>
                                <div className='grid gap'>
                                    <span className='opacity'>texte</span>
                                    <input type="text" className='div-input white' placeholder='Qlee me' onChange={e=> setText(e.target.value)} />
                                </div>

                                <div className='grid gap-1rem grey border-r-04 p-1'>
                                    <div className='display justify-s-b'>
                                        <span className='opacity'>couleur</span>
                                        <div className='click display border-r-2 w-2 h-2 hover justify-c' onClick={e=> setframeColor(frameColor ? false : true)}>
                                            { frameColor ? <ChevronUpIcon width={20} /> : <ChevronDownIcon width={20} />  }
                                        </div>
                                    </div>
                                    {
                                        frameColor &&
                                        <div className='display wrap gap'>
                                            {
                                                colors.map(c=> {
                                                    return (
                                                        <div className='border-r-2 w-2 h-2 click' style={{background : c}} onClick={e=> setframeColor(c)} />
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            </>
                        }
                
                    </div>

                    <div className='grid'>
                        <div className='grid gap-1rem grey border-r-04  p-1'>
                            <div className='display justify-s-b'>
                                <span>Lignes</span>
                                <div className='click display border-r-2 w-2 h-2 hover justify-c' onClick={e=> setLine(line ? false : true)}>
                                    { line ? <ChevronUpIcon width={20} /> : <ChevronDownIcon width={20} />  }
                                </div>
                            </div>
                            {
                                line &&
                                <>
                                    <div className='display justify-s-b'>
                                        <span className='opacity'>couleur</span>
                                    </div>
                                    <div className='display wrap gap'>
                                        {
                                            colors.map(c=> {
                                                return (
                                                    <div className='border-r-2 w-2 h-2 click' style={{background : c}} onClick={e=> setLineColor(c)} key={c}/>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='display justify-s-b border-r-04 grey  p-1'>
                            <span>Logo</span>
                            <SwitchInput dimension={0.7} checked={logo} onChange={e=> setLogo(logo ? false : true)} />
                        </div>
                    </div>
                    <div className='display justify-c'>
                        <div className='display gap'>
                            <button className='blue-secondary h-3 p-1 border-r-2 display gap' onClick={e=> download(Link.name, frameActive ? 'qr-code-frame-img' : 'qr-code-img')} >
                                <ArrowDownOnSquareIcon width={18} height={18} className='c-blue' />
                                <span className='c-blue f-s-16'>Télécharger</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            
        </div>
    )
}


