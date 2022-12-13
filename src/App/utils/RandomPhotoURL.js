import React, { useEffect, useRef, useState } from 'react'

export default function RandomPhotoURL({user}) {

    var colorArray = [
        "#0b71f1","#2ecc71","#1abc9c","#3498db","#9b59b6","#34495e",
        "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f",
        "#e67e22","#e74c3c","#00bcd4","#95a5a6","#f39c12","#d35400",
        "#c0392b","#bdc3c7","#7f8c8d", "#575fcf", "#575fcf", "#4bcffa",
        "#34e7e4","#0be881","#f53b57","#3c40c6","#0fbcf9","#00d8d6","#05c46b",
        "#1e272e","#ffc048","#ffdd59","#ff5e57","#d2dae2","#485460","#ffa801",
        "#808e9b","#ff3f34"
    ]

    const canvas = useRef()
    let ctx = null
    const [URL, setURL] = useState()   

    
    useEffect(() => {

        if (user) {
            
            const canvasEle = canvas.current
            canvasEle.width = 300
            canvasEle.height = 300
    
            ctx = canvasEle.getContext("2d")

            let random = colorArray[Math.floor(Math.random() * colorArray.length )]

            ctx.beginPath()
                ctx.font = "bolder 8rem Poppins"
                ctx.fillStyle = "white"
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(user.substr(0,1).toUpperCase(),150,160)
                ctx.globalCompositeOperation='destination-over'
            ctx.fill()

            const gradient = ctx.createLinearGradient(0,300, 300,0);
            gradient.addColorStop(1, '#f6f7f91c');
          
            ctx.beginPath();
                ctx.moveTo(300, 0);
                ctx.lineTo(0, 0);
                ctx.lineTo(300, 300);
                ctx.fillStyle = gradient
            ctx.fill()
            
            ctx.beginPath()
                ctx.rect(0, 0, 300, 300)
                ctx.fillStyle = random
            ctx.fill()  

    
            return setURL(canvasEle?.toDataURL())
        }

    }, [user])
    
    
    return (
        <canvas ref={canvas} className='disable' id={URL}></canvas>
    )
}
    