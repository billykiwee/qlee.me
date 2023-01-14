import React from 'react'
import { ProgressBar } from '../../components/ProgressBar'
import { percentage } from '../functions/percentage'

export function Device({ stat }) {
    
    if (!stat.length) return <small className='c-grey'>Aucune données</small>
                                

    return stat
    .sort((x, y)=> y.count - x.count)
    .map((array, i) => {      

        let sum =  stat.map(e=> e.count).reduce((x,y)=> x+y)

        console.log(sum);
        return (
            <div className='display justify-s-b' key={i}>
                <div className='display gap'>
                    <span>{array.app}</span> 
                    <small className='c-grey f-s-12'>{array.count}</small>
                </div>
                <ProgressBar percentage={percentage(sum, array.count)} /> 
            </div>
        )
    })
}
