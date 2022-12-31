import { CheckBadgeIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export function SnackBar({content, setMsg}) {


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



    if (Object.values(content).length > 0)
    return (

        <div className='sticky display grid gap-04 snackbar_div'>
        {
            [content]
            .map(data=> {


                return (
                    <div className='white border border-r-04 shadow p-1 snackbar ' id={data?.id} key={data?.id} >
                        <div className='display gap-2rem'>
                            <div className='display gap-1rem'>
                                <div className='w-2 display justify-c'>
                                    {
                                        data?.status === 'success'
                                        ? <CheckCircleIcon width={28} className='c-green' />
                                        : <ExclamationTriangleIcon width={28} className='c-red' />
                                    }
                                </div>
                                <div className='grid'>
                                    <span className='f-w-500 f-s-16'>{data?.text}</span>
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
                                <button className='border-r-100 w-3 h-3 hover' onClick={e=> deleteData(data.id)}  >
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
