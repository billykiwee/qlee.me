import React, { useState } from 'react';

export const SwitchInput = ({ checked, onChange, id, dimension }) => {
    
    const [checkedState, setCheckedState] = useState(checked)


    return (
        <label className="switch" style={{transform: `scale(${dimension})`}} >

            <input type="checkbox" checked={checkedState} id={id}
                onChange={e=> {
                    if (onChange) return onChange()

                    setCheckedState(e=> e ? false : true)
                }}
            />
            <span className="slider round"></span>
        </label>
    )
}