import React from 'react'

export function ProgressBar({ percentage }) {
    
    return (
        <div className='display gap-1rem'>
            <div className='progress-bar-stat'>
                <div className='blue border-r-2' style={{width: percentage + '%', boxShadow: '0 0px 12px 10px var(--blue-secondary)'}}></div>
            </div>
            <div className='display w-2 justify-c'>
                <span>{percentage}%</span>
            </div>
        </div>
    )
}

