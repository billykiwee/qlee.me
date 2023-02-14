import { useEffect, useState } from "react";
import { getDevice } from "./Redirection/functions/getDevice";

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
                setMs(ms => (ms + 1) % 10)
            }, 100)
    
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

        if (getDevice() === 'mobile') {
            onMouse()
        }


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
        sec,
        ms
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


    const colors = ['red', 'yellow', 'white', 'blue', 'green', 'orange']
    const faces = ['b','b','b','b','b','b']

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    useEffect(e=> {

       /*  const rand = () => colors[Math.floor(Math.random() * colors.length)]

        faces
        .map(c=> {
            document.querySelectorAll('.cube').forEach(el=> {
                el.style.background = rand()

                el.class = 'c-' +  el.style.background
            })
        }) */


        const foo = ['bonjour', 'super', 2,3,4,4]

        const go = foo.map((e,i)=> {
            return e + '_' + i
        }).toString()

        console.log(go);

    }, [])

    



    return (
        <>
            <span className='display gap display justify-c m-t-4'>
                <span style={{fontSize: '170px'}}>{Time.min > 0 && Time.min + ':'} {Time.sec}.</span>
                <span style={{fontSize: '100px', width: '5rem', height: '6rem'}}>{Time.ms}</span>
            </span>

           {/*  <div className="display wrap">
                {
                    faces
                    .map(c=> {
                        return shuffleArray(colors)
                        .map((e, i)=> {

                            document.querySelectorAll('.cubes').forEach(e=> {
                                e.style.background = e
                            })

                            return <div className="w-2 h-2 border" style={{ background : e }}></div>
                        })
                    })
                }
            </div> */}

           

            <div className="display m-t-2 disable">
                <div className="grid border">
                    <div className="grid border face" id="L">
                        <div className="absolute margin-auto display zi-2">L</div>

                        <div className="display">
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube orange"></div>
                            <div className="w-2 h-2 border cube green"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube orange"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                            <div className="w-2 h-2 border cube green"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube blue"></div>
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube green"></div>
                        </div>
                    </div>
                </div>
                <div className="grid border">
                    <div className="grid border face" id="U">
                        <div className="absolute margin-auto display zi-2">U</div>
                        <div className="display">
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                            <div className="w-2 h-2 border cube green"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube red"></div>
                            <div className="w-2 h-2 border cube orange"></div>
                            <div className="w-2 h-2 border cube black"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube green"></div>
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                        </div>
                    </div>
                    <div className="grid border face" id="F">
                        <div className="absolute margin-auto display zi-2">F</div>
                        <div className="display">
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube orange"></div>
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube yellow"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube orange"></div>
                            <div className="w-2 h-2 border cube yellow"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                        </div>
                    </div>
                    <div className="grid border face" id="D">
                        <div className="absolute margin-auto display zi-2">D</div>
                        <div className="display">
                            <div className="w-2 h-2 border cube green"></div>
                            <div className="w-2 h-2 border cube green"></div>
                            <div className="w-2 h-2 border cube black"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube red"></div>
                            <div className="w-2 h-2 border cube red"></div>
                            <div className="w-2 h-2 border cube blue"></div>
                        </div>
                        <div className="display">
                            <div className="w-2 h-2 border cube green"></div>
                            <div className="w-2 h-2 border cube green"></div>
                            <div className="w-2 h-2 border cube red"></div>
                        </div>
                    </div>
                </div>
                <div className="display">
                    <div className="grid border">
                        <div className="grid border face" id="R">
                            <div className="absolute margin-auto display zi-2">R</div>
                            <div className="display">
                                <div className="w-2 h-2 border cube orange"></div>
                                <div className="w-2 h-2 border cube black"></div>
                                <div className="w-2 h-2 border cube blue"></div>
                            </div>
                            <div className="display">
                                <div className="w-2 h-2 border cube black"></div>
                                <div className="w-2 h-2 border cube orange"></div>
                                <div className="w-2 h-2 border cube red"></div>
                            </div>
                            <div className="display">
                                <div className="w-2 h-2 border cube black"></div>
                                <div className="w-2 h-2 border cube red"></div>
                                <div className="w-2 h-2 border cube orange"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid border face" id="B">
                        <div className="absolute margin-auto display zi-2">B</div>
                        <div className="grid">
                            <div className="display">
                                <div className="w-2 h-2 border cube red"></div>
                                <div className="w-2 h-2 border cube black"></div>
                                <div className="w-2 h-2 border cube black"></div>
                            </div>
                            <div className="display">
                                <div className="w-2 h-2 border cube red"></div>
                                <div className="w-2 h-2 border cube red"></div>
                                <div className="w-2 h-2 border cube yellow"></div>
                            </div>
                            <div className="display">
                                <div className="w-2 h-2 border cube black"></div>
                                <div className="w-2 h-2 border cube orange"></div>
                                <div className="w-2 h-2 border cube black"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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