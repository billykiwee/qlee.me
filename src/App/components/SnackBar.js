import { CheckBadgeIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export function SnackBar({ content }) {

/* 
    function deleteData(id) {
        
        document.querySelector('#' + id).classList.add('out')
        let remove = document.querySelector('#' + id).classList.value.split(' ')

        if (remove.includes('out')) {
            setTimeout(e=> {
                setMsg([])
            }, 400)
        }
    }

    useEffect(e=> {
        setTimeout(e=> {
            setMsg([])
        }, 4000)
    }, [])
 */


    if (Object.values(content).length > 0)
    return (

        <div className='sticky display grid gap-04 snackbar_div'>
        {
            [content]
            .map(data=> {

                const { id, text, subtext, status, action } = data


                return (
                    <div className='white border border-r-04 shadow p-1 snackbar ' id={id} key={id} >
                        <div className='display gap-2rem'>
                            <div className='display gap-1rem'>
                                <div className='w-2 display justify-c'>
                                    {
                                        status === 'success'
                                        ? <CheckCircleIcon width={28} className='c-green' />
                                        : <ExclamationTriangleIcon width={28} className='c-red' />
                                    }
                                </div>
                                <div className='grid'>
                                    <span className='f-w-500 f-s-16'>{text}</span>
                                    <span className='opacity'>{subtext}</span>
                                    {
                                        action &&
                                        <Link to={action.link}>
                                            <span className='link hover-link '>{action.text}</span>
                                        </Link>
                                    }
                                </div>
                            </div>
                            <div className='display justify-c'>
                                <button className='border-r-100 w-3 h-3 hover' /* onClick={e=> deleteData(id)}  */ >
                                    <span className='f-s-16'>OK</span>
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
