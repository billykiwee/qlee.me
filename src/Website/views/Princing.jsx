import React, { useEffect, useState } from 'react'
import Container from '../../App/components/Container'

import formatCurrency from '../../App/utils/formatCurrency'


export default function Pricing() {


    const [PricingType, setPricingType] = useState('annual')


    const Plans = {
        Pro : {
            plan: 'Free',
            subtitle: 'Pour tous' ,
            price: 0,
            benefits: [
                'Projets illimités',
                'Nom de domaine personalisé',
                'Système de paiement',
                'Gestion de commande',
                'Borne de commande',
                'Tous les templates débloqués',
            ]
        },
        Entreprise : {
            plan: 'Entreprise',
            subtitle: 'Pour tous les restaurants' ,
            price: PricingType === 'annual' ? 39.90 : 3.90,
            benefits: [
                'Projets illimités',
                'Nom de domaine personalisé',
                'Système de paiement',
                'Gestion de commande',
                'Borne de commande',
                'Tous les templates débloqués',
            ],
            recommended: 'recommended'
        },
        Custom : {
            plan: 'Custom',
            subtitle: 'Pour tous les restaurants' ,
            price: PricingType === 'annual' ? 999.90 : 99.90,
            benefits: [
                'Projets illimités',
                'Nom de domaine personalisé',
                'Système de paiement',
                'Gestion de commande',
                'Borne de commande',
                'Tous les templates débloqués',
            ]
        }
    }


    return (
        <Container style='m-t-4 m-b-2'>

            <div className='display wrap justify-s-b'>
                <div>
                    <h2>Nos tarifs</h2>
                </div>
                <div className='display justify-c m-b-1 '>
                    <div className='display white border border-r-1 h-3 p-lr-1'>
                        <button className={(PricingType === 'annual' && 'blue shadow') + ' h-2 border-r-04 p-1'} onClick={e=> setPricingType('annual')} >
                            {
                                PricingType === 'annual' && 
                                <span className='display'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12C19 10.1435 18.2625 8.36301 16.9497 7.05025C15.637 5.7375 13.8565 5 12 5C10.1435 5 8.36301 5.7375 7.05025 7.05025C5.7375 8.36301 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19ZM15.2436 10.8686C15.403 10.7036 15.4912 10.4826 15.4892 10.2531C15.4872 10.0237 15.3952 9.80427 15.233 9.64203C15.0707 9.4798 14.8513 9.38778 14.6219 9.38579C14.3924 9.38379 14.1714 9.47199 14.0064 9.63137L11.125 12.5128L9.99362 11.3814C9.8286 11.222 9.60757 11.1338 9.37815 11.1358C9.14873 11.1378 8.92927 11.2298 8.76703 11.392C8.6048 11.5543 8.51278 11.7737 8.51078 12.0031C8.50879 12.2326 8.59699 12.4536 8.75638 12.6186L10.5064 14.3686C10.6705 14.5327 10.893 14.6248 11.125 14.6248C11.357 14.6248 11.5795 14.5327 11.7436 14.3686L15.2436 10.8686Z" fill="#1DD1A1"/><path d="M15.2436 10.8686C15.403 10.7036 15.4912 10.4826 15.4892 10.2531C15.4872 10.0237 15.3952 9.80427 15.233 9.64203C15.0707 9.4798 14.8513 9.38778 14.6219 9.38579C14.3924 9.38379 14.1714 9.47199 14.0064 9.63137L11.125 12.5128L9.99362 11.3814C9.8286 11.222 9.60757 11.1338 9.37815 11.1358C9.14873 11.1378 8.92927 11.2298 8.76703 11.392C8.6048 11.5543 8.51278 11.7737 8.51078 12.0031C8.50879 12.2326 8.59699 12.4536 8.75638 12.6186L10.5064 14.3686C10.6705 14.5327 10.893 14.6248 11.125 14.6248C11.357 14.6248 11.5795 14.5327 11.7436 14.3686L15.2436 10.8686Z" fill="#1DD1A1"/></svg>
                                </span>
                            }
                            <span className='f-s-16'>Annuel</span>
                        </button>
                        <button className={(PricingType === 'monthly' && 'blue shadow') + ' h-2 border-r-04 p-1'} onClick={e=> setPricingType('monthly')}>
                            {
                                PricingType === 'monthly' && 
                                <span className='display'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12C19 10.1435 18.2625 8.36301 16.9497 7.05025C15.637 5.7375 13.8565 5 12 5C10.1435 5 8.36301 5.7375 7.05025 7.05025C5.7375 8.36301 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19ZM15.2436 10.8686C15.403 10.7036 15.4912 10.4826 15.4892 10.2531C15.4872 10.0237 15.3952 9.80427 15.233 9.64203C15.0707 9.4798 14.8513 9.38778 14.6219 9.38579C14.3924 9.38379 14.1714 9.47199 14.0064 9.63137L11.125 12.5128L9.99362 11.3814C9.8286 11.222 9.60757 11.1338 9.37815 11.1358C9.14873 11.1378 8.92927 11.2298 8.76703 11.392C8.6048 11.5543 8.51278 11.7737 8.51078 12.0031C8.50879 12.2326 8.59699 12.4536 8.75638 12.6186L10.5064 14.3686C10.6705 14.5327 10.893 14.6248 11.125 14.6248C11.357 14.6248 11.5795 14.5327 11.7436 14.3686L15.2436 10.8686Z" fill="#1DD1A1"/><path d="M15.2436 10.8686C15.403 10.7036 15.4912 10.4826 15.4892 10.2531C15.4872 10.0237 15.3952 9.80427 15.233 9.64203C15.0707 9.4798 14.8513 9.38778 14.6219 9.38579C14.3924 9.38379 14.1714 9.47199 14.0064 9.63137L11.125 12.5128L9.99362 11.3814C9.8286 11.222 9.60757 11.1338 9.37815 11.1358C9.14873 11.1378 8.92927 11.2298 8.76703 11.392C8.6048 11.5543 8.51278 11.7737 8.51078 12.0031C8.50879 12.2326 8.59699 12.4536 8.75638 12.6186L10.5064 14.3686C10.6705 14.5327 10.893 14.6248 11.125 14.6248C11.357 14.6248 11.5795 14.5327 11.7436 14.3686L15.2436 10.8686Z" fill="#1DD1A1"/></svg>
                                </span>
                            }
                            <span className='f-s-16'>Mensuel</span>
                        </button>
                    </div>
                    {
                        PricingType === 'annual' &&
                        <div className='display border-r-100 p-lr-1 h-2 green m-l-1'>
                            <span className='c-white f-s-16'>-20%</span>
                        </div>
                    }
                </div>
            </div>


            <div className='display gap align-top justify-c'>
                {
                    Object.values(Plans)
                    .map(plan => {
                        return (
                            <PricingCard 
                                id='plan'
                                plan={plan.plan}
                                subtitle={plan.subtitle}
                                price={plan.price}
                                benefits={
                                    plan.benefits.map(benef=> {
                                        return benef
                                    })
                                } 
                                recommended={plan.recommended}
                            />
                        )
                    })
                }
            </div>


        </Container>
    )
}


function PricingCard({price, plan, subtitle, type, recommended, benefits, id}) {

    return (

        <div className='grid' id={'slide-slider-' + id} >
            <div className={(recommended ? 'yellow' : 'white border') + ' border-r-1 p-2 m-r-2'}  style={{width: '244px'}} >

                <div className='display justify-s-b m-b-2'>
                    <div className='display'>
                        <img src='/favicon.ico' width={40} />
                    </div>
                    {
                        recommended &&
                        <div className='display p-04 h-1 border-r-1 white'>
                            <span className='f-s-14 p-04 c-blue'>⭐️ Recommandé</span>
                        </div>
                    }
                </div>

                <div className='grid align-l'>
                    <span className='f-s-2rem f-w-600'>{plan}</span>
                    <span className='opacity f-s-18'>{subtitle}</span>
                </div>

                <div className='display m-t-1'>
                    <div className='lh-1 display align-b'>
                        <div className='display f-w-700 m-1 m-l-0'>
                            <span className='display f-s-2rem'>{formatCurrency(price)}</span>
                            <span className='f-s-16 m-l-04 opacity'>{type === 'annual' ? '/an' : '/mois'}</span>
                        </div>
                    </div>
                </div>

                <div className='display m-t-1'>
                    <button className={(recommended ? 'white hover-white' : 'blue hover-blue') + ' f-s-16 border-b p-1 h-3 border-r-1'} > 
                        <span>Essayer</span>
                    </button>
                </div>

                <div className='m-t-2'>
                {
                    benefits &&
                    benefits.map(benefit=> {
                        
                        return (
                            <div className='display align-t m-b-1'>
                                <span className='display m-r-04'>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.4 22.4C15.0522 22.4 17.5957 21.3465 19.4711 19.4711C21.3465 17.5957 22.4 15.0522 22.4 12.4C22.4 9.74786 21.3465 7.20432 19.4711 5.32896C17.5957 3.45359 15.0522 2.40002 12.4 2.40002C9.74786 2.40002 7.20432 3.45359 5.32896 5.32896C3.45359 7.20432 2.40002 9.74786 2.40002 12.4C2.40002 15.0522 3.45359 17.5957 5.32896 19.4711C7.20432 21.3465 9.74786 22.4 12.4 22.4ZM17.0338 10.7838C17.2615 10.548 17.3875 10.2323 17.3846 9.90452C17.3818 9.57678 17.2503 9.26326 17.0185 9.0315C16.7868 8.79974 16.4733 8.66828 16.1455 8.66543C15.8178 8.66258 15.502 8.78858 15.2663 9.01627L11.15 13.1325L9.53377 11.5163C9.29802 11.2886 8.98227 11.1626 8.65452 11.1654C8.32678 11.1683 8.01326 11.2997 7.7815 11.5315C7.54974 11.7633 7.41828 12.0768 7.41543 12.4045C7.41258 12.7323 7.53858 13.048 7.76627 13.2838L10.2663 15.7838C10.5007 16.0181 10.8186 16.1498 11.15 16.1498C11.4815 16.1498 11.7994 16.0181 12.0338 15.7838L17.0338 10.7838Z"/><path fill={recommended ? 'var(--white)' : "#1DD1A1"} d="M17.0338 10.7838C17.2615 10.548 17.3875 10.2323 17.3846 9.90452C17.3818 9.57678 17.2503 9.26326 17.0185 9.0315C16.7868 8.79974 16.4733 8.66828 16.1455 8.66543C15.8178 8.66258 15.502 8.78858 15.2663 9.01627L11.15 13.1325L9.53377 11.5163C9.29802 11.2886 8.98227 11.1626 8.65452 11.1654C8.32678 11.1683 8.01326 11.2997 7.7815 11.5315C7.54974 11.7633 7.41828 12.0768 7.41543 12.4045C7.41258 12.7323 7.53858 13.048 7.76627 13.2838L10.2663 15.7838C10.5007 16.0181 10.8186 16.1498 11.15 16.1498C11.4815 16.1498 11.7994 16.0181 12.0338 15.7838L17.0338 10.7838Z" /></svg>
                                </span>
                                <span className='f-s-16 opacity'>{benefit}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}


function Slider({children, id}) {

    const [Slide, setSlide] = useState(0)

    const [WidthSlide, setWidthSlide] = useState({})

    function Slider() {
        document.querySelectorAll('#slide-slider-' + id).forEach(slide => {
            slide.parentElement.style = `margin-left: -${Slide * slide.offsetWidth}px` 

            setWidthSlide({div: slide, width : slide.offsetWidth})
        })
    }

    useEffect(e=> {
        Slider()
    }, [Slide])



    return (
        <div className='grid'>
            <div className='display transition align-top overflow-hidden' >
                {children}
            </div>
            <div className='display gap justify-e m-t-1'>
                <button 
                    onClick={e=> setSlide(Slide > 0 ? Slide - 1 : Slide)} 
                    className={(Slide === 0 ? 'opacity ' : '') + 'border w-3 h-3 border-r-100'} 
                >
                    <span className='display'>
                        <svg width="44" height="44" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 24L16 19L21 14" stroke="var(--black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                </button>
                <button 
                    onClick={e=> setSlide(Slide < children.length-1 ? Slide + 1 : children.length-1)} 
                    className={(Slide === children.length-1 ? 'opacity ' : '') + 'border w-3 h-3 border-r-100'} 
                >
                    <span className='display'>
                        <svg width="44" height="44" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 24L22 19L17 14" stroke="var(--black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                </button>
            </div>
        </div>
    )
}
