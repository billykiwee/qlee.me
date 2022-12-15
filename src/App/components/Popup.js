import React, { Children, useEffect, useState } from 'react'
import '../css/popup.css'



export default function Popup({content, children}) {

    let data = Object.values(content).length

    if(data)
    return (
        <div className='frame-popup'>
            <div className='fixed'>
                <div className='grid white border-r-2 p-2 border-b gap'>
                    <div className='grid gap-2rem'>
                        <div className='display justify-s-b align-top'>
                            <div className='display gap'>
                                <span className='f-s-20 f-w-500'>{content.title}</span>
                            </div>
                            <div className='display'>
                                <button className='w-2 h-2' onClick={content.close}>
                                    <span className='display'>
                                        <img src='/images/x.svg' width={20} height={20} />
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className='grid gap grey border-r-04 p-2'>
                            {
                                content.statu === 'success' &&
                                <div className='display justify-c'>
                                    <img src='/images/success.svg' width={44} height={44} />
                                </div>
                                ||
                                content.statu === 'error' &&
                                <div className='display justify-c'>
                                    <span className='f-s-2rem'>❌</span>
                                </div>
                                ||
                                <div className='display justify-c'>
                                    <span className='f-s-2rem'>🤔</span>
                                </div>
                            }
                            <span className='text-align-c'>{content.message}</span>
                        </div>
                    </div>
                    <div className='grid gap'>
                        <div className='display justify-c'>
                            <small className='f-w-300 c-grey'>{content.question}</small>
                        </div>
                        <button className={content.buttonColor + ' h-3 border-r-1 border-b'} onClick={content.valid}>
                            <span className='f-s-16'>{content.buttonText}</span>
                        </button>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    )
}

