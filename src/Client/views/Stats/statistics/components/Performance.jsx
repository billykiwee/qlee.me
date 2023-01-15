import React from 'react'

export function Performance({ stat }) {

   /*  stat.map(e=> {
        console.log(e);
    }) */

    return stat.type
    .map((item, i)=> {

        if (!stat) return <small className='c-grey'>Aucune données</small>

        return (
            <div className='display justify-s-b' key={i}>
                <div className='display gap'>
                    <span>{item.title}</span>
                </div>
                <span>{item.data}</span>
            </div>
        )
    })
}
