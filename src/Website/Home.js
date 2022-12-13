import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../App/components/Container'
import { useStateValue } from '../App/components/StateProvider'
import formatCurrency from '../App/utils/formatCurrency'
import '../Website/portfolio.css'
import { useScrollDirection } from 'react-use-scroll-direction'



export const ProfilImg = 'https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'

export default function Netflix() {


    const socialMedia = {
        GitHub : {
            logo1 : '/images/github.svg',
            logo2: '/images/github-white.svg',
            name : 'GitHub',
            color: '#1dd1a1',
            link: 'https://github.com/billykiwee'
        },
        Instagram : {
            logo1 : '/images/instagram.svg',
            logo2: '/images/instagram-white.svg',
            name : 'Instagram',
            color: 'rgb(255, 99, 72)',
            link: 'https://www.instagram.com/kiwee.site/'
        },
        LinkedIn : {
            logo1 : '/images/linkedin.svg',
            logo2: '/images/linkedin-white.svg',
            name : 'LinkedIn',
            color: '#0A66C2',
            link: 'https://www.linkedin.com/in/billy-turpin-a5b283217/'
        },
        Twitter : {
            logo1 : '/images/twitter.svg',
            logo2: '/images/twitter-white.svg',
            name : 'Twitter',
            color: '#47ACDF',
            link: 'https://twitter.com/billy_kiwee'
        }
    }

    const projects = {
        nikkoferro : {
            img : 'https://nikoferrotattoo.com/wp-content/uploads/2022/05/Capture-décran-le-2022-05-06-à-17.56.00.png',
            name: 'NikkoFerro Tatoo',
            id  : 'nikkoferro',
            link: 'https://nikoferrotattoo.com/',
            logo: 'https://nikoferrotattoo.com/wp-content/uploads/2022/05/Group-9-3.png'
        },
        bubblegame: {
            img : 'https://kiwee.site/wp-content/uploads/2022/11/Capture-décran-le-2022-11-29-à-16.58.32.png',
            name: 'BubbleGame',
            id  : 'bubblegame',
            link: 'https://animated-gumdrop-7ecba7.netlify.app/',
            logo: '/images/bubblegame.png',
            text: "Création d'un jeu de couleur."
        },
        fitness: {
            img : 'https://kiwee.site/wp-content/uploads/2022/05/Capture-décran-le-2022-05-23-à-18.43-1.png',
            name: 'fitness',
            id  : 'fitness'
        },
        adrienncall: {
            img : 'https://kiwee.site/wp-content/uploads/2022/05/Post-insta-9-1.png',
            name: 'Adrien N call',
            id  : 'adrienncall'
        }
    }

    const skills = {
        JS : {
            name: 'JS',
            logo: '/images/js.svg',
            level: 5,
            type: 'F'
        },
        React : {
            name: 'React',
            logo: '/images/react.svg',
            level: 5,
            type: 'F'
        },
        TypeScript : {
            name: 'TypeScript',
            logo: '/images/typescript.svg',
            level: 1,
            type: 'F'
        },
        HTML : {
            name: 'HTML',
            logo: '/images/html.svg',
            level: 5,
            type: 'F'
        },
        CSS : {
            name: 'CSS',
            logo: '/images/css.svg',
            level: 5,
            type: 'F'
        },
        Node : {
            name: 'Node',
            logo: '/images/node.svg',
            level: 2,
            type: 'B'
        },
        PHP : {
            name: 'PHP',
            logo: '/images/php.svg',
            level: 3,
            type: 'F'
        },
        Firebase : {
            name: 'Firebase',
            logo: '/images/firebase.svg',
            level: 4,
            type: 'F'
        },
    }


    function Level({level}) {

        let solid = <span className='h-04 w-30 black border-r-04'></span>
        let clear = <span className='h-04 w-30 grey-200 border-r-04'></span>

        if (level === 1) return <>{solid}{clear}{clear}{clear}{clear}</>
        if (level === 2) return <>{solid}{solid}{clear}{clear}{clear}</>
        if (level === 3) return <>{solid}{solid}{solid}{clear}{clear}</>
        if (level === 4) return <>{solid}{solid}{solid}{solid}{clear}</>
        if (level === 5) return <>{solid}{solid}{solid}{solid}{solid}</>
    
    }


    function hoverImage(id) {
        document.querySelector('#project-' + id).style.background= '#00000066'
        document.querySelector('#info-' + id).style.display= 'flex'

        document.querySelector('#project-' + id).onmousemove = w => {

            let imgHeight =  document.querySelector('#' + id).clientHeight
            let imgWidth =  document.querySelector('#' + id).clientWidth
            let x = w.clientX / imgWidth
            let y = w.clientY / imgHeight

            document.querySelector('#' + id).style = `transform : translate(${(x)}%, ${(y)}%)`
            document.querySelector('#' + id).parentElement.style.transform= 'scale(1.06)'
        }
    }

    function unFocusImage(id) {
        document.querySelector('#project-' + id).style.background= 'unset'
        document.querySelector('#info-' + id).style.display= 'none'

        document.querySelector('#' + id).style = `transform : translate(0)`
        document.querySelector('#' + id).parentElement.style.transform= 'scale(1)'
    }
    

    /* useEffect(e=> {
        window.onscroll = (e) => {
            var h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        
            var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 10;

            document.querySelector('video').currentTime = percent

        }
        document.querySelector('video').playbackRate = 0.9

        document.querySelector('video').controls = false

    }) */





    return (

        <Container>

            <div classpassword='grid gap-1rem '>

                <div className='grid gap-1rem'>
                    
                    <section className=' gap-1rem align-top' id='Home' >
                        <div className='block grid border-r-2 gap-2rem white' 
                            style={{
                                flex: '1 0 55%', 
                                backgroundSize: 'cover',
                                backgroundImage : `url(${ProfilImg})`,
                                backdropFilter: 'opacity(0.3)',
                            }}
                        >
                            <div 
                                className='grid border-r-2 gap-2rem h-100p'  
                                style={{
                                    backdropFilter: 'blur(44px)',
                                    background: '#ffffff94',
                                }}
                            >
                                <div className='grid p-2 justify-s-b h-100p gap-2rem'>
                                    <div className='grid gap'>   
                                        <div className='grid'>   
                                            <span className='f-s-2rem f-w-600'>Bonjour World,</span>
                                            <span className='f-s-2rem f-w-600'>Je suis Billy, votre futur développeur !</span>
                                        </div>
                                        <div className='display m-t-1'>
                                            <span className='f-w-300 f-s-18'>Développeur depuis 4 ans, je suis passioné par le code et le design et aujourd'hui je vous présente qui je suis et ce que je fais.</span>
                                        </div>
                                    </div>

                                    <div className='gap' id='social-bar'>
                                        <div>
                                            <a href='mailto:billyturpin642@gmail.com'>
                                                <button className='black hover-black border-r-100 p-lr-2 h-3' style={{borderBottom: '6px solid rgba(0, 0, 0, 0.09)'}}>
                                                    <span className='f-s-16'>Me contacter</span>
                                                </button>
                                            </a>
                                        </div>
                                        <div className='display justify-s-a gap'>
                                            {
                                                Object.values(socialMedia).map(social=> {
                                                    return (
                                                        <a href={social.link}>
                                                            <button 
                                                                className='white border-r-100 h-3 w-3 transition' 
                                                                style={{borderBottom: '6px solid rgba(0, 0, 0, 0.09)'}}
                                                                id={social.name} 
                                                                onMouseEnter={e=> {
                                                                    document.querySelector('#' + social.name).style.background = social.color
                                                                    document.querySelector('.' + social.name).src = social.logo2
                                                                }}
                                                                onMouseLeave={e=> {
                                                                    document.querySelector('#' + social.name).style.background = ''
                                                                    document.querySelector('.' + social.name).src = social.logo1
                                                                }}
                                                            >
                                                                <span className='display justify-c'>
                                                                    <img src={social.logo1} className={'w-56 h-56 ' + social.name} />
                                                                </span>
                                                            </button>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='display align-top border-r-2 w-100p CG-ekfkez' style={{flex: '1 0 22%'}}>
                            <img className='w-100p border-r-2 CG-img' src={ProfilImg}  id='profil_img'/>
                        </div>
                    </section>


                   {/*  <video className='w-100p h-100p border-r-2' controls src="/videos/nikoferro.mp4" type="sample/mp4" style={{height: '500px', objectFit: 'cover'}}/> */}
                    
                    <section className='gap-1rem' id='Works' >
                        <div className='gap-1rem align-top' id='works'>
                            {
                                Object.values(projects)
                                .map(project=> {
                                    return (
                                        <div className='border-r-2 click overflow-hidden relative' style={{flex: '1 0 38%', height: '500px'}} >
                                            <div 
                                                className='zi-2 absolute border-r-2 w-100p h-100p transition' 
                                                id={'project-' + project.id}
                                                onMouseMove={e=> hoverImage(project.id)}
                                                onMouseLeave={e=> unFocusImage(project.id)}
                                            >
                                                <div className='display h-100p align-end disable w-100p' id={'info-' + project.id}>
                                                    <div className='grid align-top w-100p h-100p'>
                                                        <div className='grid h-100p w-100p'>
                                                            <div className='grid p-36 justify-s-b h-100p'>
                                                                <div className='display'>
                                                                    <div className='display justify-e  w-100p'>
                                                                        <a href={project.link}>
                                                                            <button className='display justify-c w-58 h-58 white hover-white border-r-100'>
                                                                                <span className='display'>
                                                                                    <img src='/images/link.svg' />
                                                                                </span>
                                                                            </button>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className='display gap-1rem'>
                                                                    <span className='display justify-c'>
                                                                        <img src={project.logo} className='border-r-100 w-58 h-58' />
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
                                            <span className='display h-100p transition'>
                                                <img className='w-100p h-100p border-r-2 transition' src={project.img} id={project.id} />
                                            </span> 
                                        </div> 
                                    )
                                })
                            }
                        </div>
                    
                        
                    </section>

                    <section className='gap-1rem' id='Profil'>
                        <div className='display wrap gap-1rem align-top block border-r-2 p-2 white'>
                            <div className='grid gap-1rem' style={{flex: '1 0 38%'}}>
                                <div>
                                    <span className='f-s-25'>Mon profil</span>
                                </div>

                                <div className='display justify-s-b'>
                                    <div>
                                        <span className='f-s-16'>Mes stacks</span>
                                    </div>
                                </div>

                                <div className='display wrap gap-1rem'>
                                    {
                                        Object.values(skills)
                                        .map(skill=> {
                                            return (
                                                <div className='grid gap justify-c'>  
                                                    <div className='display gap justify-c'>
                                                        <div className='display click'>
                                                            <img src={skill.logo} className='display h-3 ' />
                                                        </div>
                                                    </div>
                                                   {/*  <div className='display justify-c grey border-r-04 p-1 h-1 '>
                                                        <small className='c-grey'>{skill.name}</small>
                                                    </div> */}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='gap-1rem' id='Contact' >
                        <div className='grid border-r-2 gap-2rem p-2 white' style={{flex: '1 0 20%'}} >
                            <div className='grid gap'>
                                <span className='f-s-25'>Contact</span>
                                <span>Et si on se faisait un petit café ?</span>
                            </div>
                            <div className='grid gap-1rem w-100'>
                                <div className='grid gap-1rem'>
                                    <div className='grid gap-04'>
                                        <label>Nom</label>
                                        <input className='div-input' placeholder='John Doe'/>
                                    </div>
                                    <div className='grid gap-04'>
                                        <label>Email</label>
                                        <input className='div-input' placeholder='monemail@gmail.com'/>
                                    </div>
                                    <div className='grid gap-04'>
                                        <label>Message</label>
                                        <textarea className='div-input' placeholder="J'aimerai collaborer avec vous" />
                                    </div>
                                </div>
                                <div>
                                    <button className='black p-20 border-r-100'>
                                        <span className='f-s-16'>Envoyer</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </Container>
    )
}
