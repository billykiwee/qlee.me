import React, { useState } from 'react';

export const SwitchInput = ({checked, onChange, id, dimension}) => {
    
    return (
        <label className="switch" style={{transform: `scale(${dimension})`}} >
            <input type="checkbox" checked={checked} onChange={onChange} id={id} />
            <span className="slider round"></span>
        </label>
    )
}