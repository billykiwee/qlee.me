import React, { Children } from 'react'
import '../css/popup.css'



export default function Popup({content, children}) {

    if (Object.values(content).length)
    return (
        <div className='frame-popup'>
            <div className='grid white border-r-2 p-2 border-b gap-1rem'>
                <div className='grid gap'>
                    <div className='display justify-s-b'>
                        <span className='f-s-20 f-w-500'>{content.title}</span>
                        <div className='display'>
                            <button className='border-b border border-r-04 w-2 h-2'>
                                <span className='display'>
                                    <img src='/images/x.svg' className='w-1 h-1' />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='display m-t-1 grey border-r-04 p-1'>
                        <span>{content.message}</span>
                    </div>
                </div>
                <div className='grid gap'>
                    <div className='display justify-c'>
                        <small className='f-w-300 c-grey'>{content.question}</small>
                    </div>
                    <button className='blue h-3 border-r-1 border-b' onClick={content.valid}>
                        <span className='f-s-16'>{content.buttonText}</span>
                    </button>
                </div>
                
                {children}
            </div>
        </div>
    )
}

