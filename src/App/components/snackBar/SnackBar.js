import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateProps } from '../../provider/ContextProvider'

export function SnackBar() {

    const { snackBar, add, remove } = useStateProps().snackBar


    function deleteData(id) {

        const el = document.querySelector('#' + id)
        
        el.classList.add('out')

        console.log(id);
        el.ontransitionend = () => remove(id)
    }

    useEffect(e=> {

        setInterval(e=> {
            deleteData(snackBar[0]?.id)
        }, 4000) 
        

    }, [snackBar])



    return (

        <div className='sticky display grid gap-04 snackbar_div'>
        {
            snackBar
            .map(item=> {

                const { id, text, subtext, status, action } = item

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
                                <button className='border-r-100 w-3 h-3 hover' onClick={e=> deleteData(id)} id={'btn-delete-' + id} >
                                    <span className='f-s-16 c-black'>OK</span>
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
