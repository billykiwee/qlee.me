import React from 'react'

export function SnackBar({content, setMsg}) {

    let time = 5

    if (content)
    return (

        <div className='fixed display grid gap-04 snackbar_div' style={{bottom: '1rem'}}>
            {
                content.map((data, i)=> {

                    const contentData = {...data}
                    const div = document.querySelector('#snackData-'+ i)

                    setTimeout(e=> div.classList.add('out'), 1000 * time)
                    setTimeout(e=> div.remove(), 1000 * time * 1.4)

                    return (
                        <div className='white border border-r-04 shadow p-1 snackbar' id={'snackData-' + i} >
                            <div className='display gap-2rem'>
                                <div className='display gap-1rem'>
                                    <div className='w-2 display justify-c'>
                                        <img src='/images/check.svg' width={22} />
                                    </div>
                                    <div className='grid gap-04'>
                                        <span className='f-w-500 f-s-18'>{contentData.text}</span>
                                        <span className='opacity'>{contentData.subtext}</span>
                                    </div>
                                </div>
                                <div className='w-3 display justify-c'>
                                    <button className='c-blue' onClick={e=> div.classList.add('out')} >
                                        <span className='f-s-16 f-w-500'>OK</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
