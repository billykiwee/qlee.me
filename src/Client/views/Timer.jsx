import { useEffect, useState } from "react";

export const Timer = () => {

    const [ms, setMs] = useState(0)
    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(0)

    const keypressCode = ' '

    const [state, setState] = useState(false)
    const [Value, setValue] = useState('')

    const [results, setResults] = useState([])


    useEffect(e=> {

        let intMs
        let intSec
        let intMin

        function begin() {
    
            intMs = setInterval(e => {
                setMs(ms => (ms + 1) % 100)
            }, 10)
    
            intSec = setInterval(e => {
                setSec(sec => (sec + 1) % 60)
            }, 1000)
    
            intMin = setInterval(e => {
                setMin(min => min + 1)
            }, 1000 * 60)  
        }

        function onKeyboard() {

            window.onkeydown = (event) => {
                if (event.key !== keypressCode) return 
                
                if (!state) {
                    setValue('ready')
                }
                
                if (state ) {
                    setState(false)
                    setValue('out')
                }
            }
    
            window.onkeyup = (event) => {
                if (event.key !== keypressCode) return 
    
                if (!state && Value === 'ready') {
                    setState(true)
                    setValue('start')
                }
            }
        }
        onKeyboard()

        function onMouse() {
            window.onmousedown = (event) => {
                
                if (!state) {
                    setValue('ready')
                }
                
                if (state ) {
                    setState(false)
                    setValue('out')
                }
            }
    
            window.onmouseup = (event) => {
    
                if (!state && Value === 'ready') {
                    setState(true)
                    setValue('start')
                }
            }
        }
        onMouse()


        if (Value === 'ready') {
            document.querySelector('body').style.background = 'var(--red)'

            setMs(0)
            setSec(0)
            setMin(0)
        }
        if (Value === 'start') {
            document.querySelector('body').style.background = 'var(--background)'

            begin()
        }
        if (Value === 'out') {
            document.querySelector('body').style.background = 'var(--green)'
        }

        return () => {
            clearInterval(intMs)
            clearInterval(intSec)
            clearInterval(intMin)
        }

    }, [state, Value])


    const Time = {
        min,
        sec: (sec < 10 ? `0${sec}` : sec),
        ms : (ms < 10 ? `0${ms}` : ms)
    }


    useEffect(e=> {

        if (Value === "out") {
            setResults([
                ...results,
                {
                    time: Time,
                    date: new Date().toLocaleDateString()
                }
            ])
        }
    }, [Value])


    window.addEventListener("keydown", event => {
        if (event.code === "Space") {
            event.preventDefault()
        }
    })


    return (
        <>
            <h1 className='display gap display justify-c' style={{fontSize: '170px'}}>
                {
                    Time.min > 0 &&
                    <>
                        <span>{Time.min}</span>
                        <span>:</span>
                    </>
                }
                <span>{Time.sec}</span>
                <span>:</span>
                <span>{Time.ms}</span>
            </h1>

            <div className="grid">     
                {
                    results
                    .sort((a,b)=> Object.values(a.time).toString().split(',').join('') - Object.values(b.time).toString().split(',').join(''))
                    .map((result, i) => {
                        return (
                            <div className="display">
                                <div className='display gap justify-c p-1 h-1'>
                                    {
                                        i === 0 && 
                                        <span>🏆</span>
                                    }
                                    <span>{result.time.min ? (result.time.min + ':') : ''}{result.time.sec}:{result.time.ms}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}