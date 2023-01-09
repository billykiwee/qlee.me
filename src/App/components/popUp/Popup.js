import React from 'react'
import '../../css/popup.css'


export default function Popup({ props }) {

    const { popUp, show } = props


    const { title, close, statu, message, valid, question, buttonText, buttonColor } = popUp


    if (Object.values(popUp).length)
    return (
        <div className='frame-popup'>
            <div className='fixed'>
                <div className='grid white border-r-2 p-2 border-b gap'>
                    <div className='grid gap-2rem'>
                        <div className='display justify-s-b '>
                            <div className='display gap'>
                                <span className='f-s-20 f-w-500'>{title}</span>
                            </div>
                            <div className='display'>
                                <button className='w-3 h-3 border-r-100 hover' onClick={close}>
                                    <span className='display'>
                                        <img src='/images/x.svg' width={20} height={20} />
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className='grid gap grey border-r-04 p-2'>
                            {
                                statu === 'success' &&
                                <div className='display justify-c'>
                                    <img src='/images/success.svg' width={44} height={44} />
                                </div>
                                ||
                                statu === 'error' &&
                                <div className='display justify-c'>
                                    <span className='f-s-2rem'>❌</span>
                                </div>
                                ||
                                <div className='display justify-c'>
                                    <span className='f-s-2rem'>🤔</span>
                                </div>
                            }
                            <span className='text-align-c'>{message}</span>
                        </div>
                    </div>
                    <div className='grid gap'>
                        <div className='display justify-c'>
                            <small className='f-w-300 c-grey'>{question}</small>
                        </div>
                        <button className={buttonColor + ' blue h-3 border-r-1 border-b'} onClick={valid}>
                            <span className='f-s-16'>{buttonText}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

