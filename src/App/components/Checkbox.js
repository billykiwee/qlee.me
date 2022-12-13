import React from 'react'

export default function Checkbox({txt, onChange, state}) {

    return (
        <div className='display gap-04' >
            {
                state ?
                <div className='display justify-c border border-r-04 blue' style={{width: '0.8rem', height: '0.8rem'}}>
                    <span className='display'>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                </div>
                :
                <div className='display justify-c w-1 h-1 border border-r-04 m-r-04'></div>
            }
            <div className='display'>
                <input type='checkbox' id={txt} onChange={onChange} hidden />
                <label htmlFor={txt}>
                    <span className='f-w-300'>{txt}</span>
                </label>
            </div>
        </div>
    )
}