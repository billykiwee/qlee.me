import React from 'react'

export default function ProjectView({project}) {


    if (project)
    return (
        <div className='w-100 h-100 gap-1rem align-top fixed zi-2 black'>
            <div className='border-r-2 click overflow-hidden relative' >
                <div 
                    className='h-100 zi-2 absolute border-r-2 w-100 h-100 transition' 
                    id={'project-' + project}
                >
                    <div className='display h-100 align-end disable w-100' id={'info-' + project}>
                        <div className='grid align-top w-100 h-100'>
                            <div className='grid h-100 w-100'>
                                <div className='grid p-2 justify-s-b h-100'>
                                    <div className='display'>
                                        <div className='display justify-e  w-100'>
                                            <a href={project.link} >
                                                <button className='display justify-c w-3 h-3 white hover-white border-r-100'>
                                                    <span className='display'>
                                                        <img src='/images/link.svg' />
                                                    </span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='display gap'>
                                        <span className='display justify-c'>
                                            <img src={project.logo} className='border-r-100 w-3 h-3' />
                                        </span>
                                        <div className='grid' style={{background: 'unset!important'}}>
                                            <span className='c-white f-w-500 f-s-18'>{project.name}</span>
                                            <span className='c-white f-s-14 f-w-100'>{project.text}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className='display h-100 transition'>
                    <img className='w-100 h-100 border-r-2 transition' src={project.img} id={project} />
                </span> 
            </div> 
        </div>
    )
}
