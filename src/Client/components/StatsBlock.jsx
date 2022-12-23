import React from 'react'

export const StatsBlock = ({statType}) => {

    return (
        <div className='grid gap'>
            {
                statType.length > 0 ? 
                (
                    statType
                    .sort((x, y)=> y.count - x.count)
                    .map((stat, i)=> {
    
                        const sumCount = statType.map(e=> e.count).reduce((x,y)=> x + y)
                        const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'
    
                        return (
                            <div className='display justify-s-b' key={i}>
                                <div className='display gap'>
                                    <span>{stat.name === 'undefined' || stat.name === '' ? 'autres' : stat.name}</span><small className='c-grey f-s-12'>{stat.count}</small>
                                </div>
                                <ProgressBar percentage={percentage} />
                            </div>
                        )
                    })
                )
                : <small className='c-grey text-align-e'>aucune données</small>
            }
        </div>
    )
}

export function ProgressBar({percentage}) {
    return (
        <div className='display gap-1rem'>
            <div className='progress-bar-stat'>
                <div className='blue border-r-2' style={{width: percentage}}></div>
            </div>
            <div className='display w-2 justify-c'>
                <span>{percentage}</span>
            </div>
        </div>
    )
}