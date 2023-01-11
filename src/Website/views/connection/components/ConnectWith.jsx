import React from 'react'

export default function ConnectWith({Google}) {

    return (
        <>
            <div className='grid m-b-1'>
                <div className='display justify-c'>
                    <h2 className='text-align-c'>Se connecter avec</h2>
                </div>
                <div className='display justify-c gap'>
                    <div className='display'>
                        <button className='border border-r-1 white border-b hover h-3' onClick={Google} >
                            <span className='f-s-16 opacity p-04 c-black'>Google</span>
                            <img src='/images/google.svg' width={36} />
                        </button>
                    </div>
                    {/*  <div className='display'>
                        <button className='border border-r-1 white border-b hover h-3' type='button' onClick={byGoogle}>
                            <span className='f-s-16 opacity p-04 c-black'>Facebook</span>
                            <img src='/images/facebook.svg' width={36} />
                        </button>
                    </div> */}
                </div>
            </div>

            <div className='display border-top justify-c m-t-2 m-b-2 opacity'>
                <div className='display justify-c absolute w-3'>
                    <span className=''>ou</span>
                </div>
            </div>
        </>
    )
}
