import React, { useState } from 'react';

export const SwitchInput = ({checked, onChange, id}) => {
    
    return (
        <label className="switch" >
            <input type="checkbox" checked={checked} onChange={onChange} id={id} />
            <span className="slider round"></span>
        </label>
    )
}