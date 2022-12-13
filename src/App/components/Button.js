import React, { useState } from 'react'


export default function Button({type, text,id, w, h, borderRadius, color,className,padding, background, border, icon, svg, fontSize, onClick, style}) {


    const [Style, setStyle] = useState('')


    function click(state) {
        document.querySelector('#btn').style.transform = 'scale(0.99)'
        document.querySelector('#btn').style.background = background

        if (state === 'out') {
            document.querySelector('#btn').style.transform = 'scale(1)'
            document.querySelector('#btn').style.background = background
        }
    }


    return (

        <div onClick={onClick}>
            <button 
                type={type}
                id='btn' 
                onMouseDown={click} 
                onMouseUp={e=> click('out')}
                onMouseEnter={click}
                onMouseLeave={e=> click('out')}
                className={className + ' ' + color}
                style={{
                    width       : w + 'rem',
                    height      : h + 'rem',
                    borderRadius: borderRadius + 'rem',
                    color       : color,
                    background: background,
                    border      : border,
                    fontSize : fontSize + 'px',
                    transition: '0.1s ease-in-out',
                    padding : padding + 'rem',
                    style
                }}
            >
                <div className='display'>
                    {
                        svg ? <span className='display'>{svg}</span> : <img src={icon} alt='' />
                    }
                    <span>{text}</span>
                </div>
            </button>
        </div>
    )
}
