import { CheckBadgeIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export function SnackBar({content, setMsg}) {


    function deleteData(id) {

        document.querySelector('#' + id).classList.add('out');
            
        setTimeout(() => {
            if (document.querySelector('#' + id).classList.value.includes('out')) {
                setMsg([])
            }
        }, 400)
    }



    if (Object.values(content).length > 0)
    return (

        <div className='sticky display grid gap-04 snackbar_div'>
        {
            [content]
            .map(data=> {

                setTimeout(e => {
                    document.querySelector('#' + data.id).classList.add('out')

                    setTimeout(e => {
                        setMsg([])
                    }, 400)
                }, 1000 * 8)


                return (
                    <div className='white border border-r-04 shadow p-04 snackbar ' id={data?.id} key={data?.id} >
                        <div className='display gap-1rem'>
                            <div className='display gap-1rem'>
                                <div className='w-2 display justify-c'>
                                    {
                                        data?.status === 'success'
                                        ? <CheckCircleIcon width={34} className='c-green' />
                                        : <ExclamationTriangleIcon width={34} className='c-red' />
                                    }
                                </div>
                                <div className='grid gap-04'>
                                    <span className='f-w-500 f-s-18'>{data?.text}</span>
                                    <span className='opacity'>{data?.subtext}</span>
                                    {
                                        data?.action &&
                                        <Link to={data?.action.link}>
                                            <span className='link hover-link '>{data?.action.text}</span>
                                        </Link>
                                    }
                                </div>
                            </div>
                            <div className='display justify-c'>
                                <button className='c-blue' onClick={e=> deleteData(data.id)}  >
                                    <span className='f-s-16 f-w-500'>OK</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }).reverse()
        }
        </div>

    )
}
