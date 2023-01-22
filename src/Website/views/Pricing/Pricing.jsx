
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Main from '../../../App/components/Main'
import '../../../App/css/pricing.css'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { GetWidth } from '../../../App/utils/GetWidth'
import { FAQ } from './views/Faq/Faq'
import Plans from './views/Plans/Plans'

export default function Pricing() {


    const { auth, user } = useStateProps()
    
    const User = user?.profil

    const [billied, setBillied] = useState('yearly')
    
    const width = GetWidth()

    return (
        <Main>

            <div className='grid gap-2rem'>
                <div className='grid'>
                    <div className='grid'>
                        <h2 className='m-0 text-align-c'>Pricing</h2>
                        <h2 className='f-w-200 c-grey text-align-c f-s-25'>Toutes les fonctionnalités disponible pour le prix d'un expresso ☕️</h2>
                    </div>

                    <div className='display justify-c'>
                        <div className='display justify-s-b gap-04 blue-secondary h-3 p-04 border-r-1'  style={{ width : width > 780 ? '50%' : '100%' }}>
                            <button className={billied === 'yearly' && 'blue' + ' h-3 p-04 border-r-1'} onClick={e=> setBillied('yearly')}>
                                <span className='c-black f-s-16'>Paiement annuel</span>
                            </button>
                            <button className={billied === 'monthly' && 'blue' + ' h-3 p-04 border-r-1'} onClick={e=> setBillied('monthly')}>
                                <span className='c-black f-s-16'>Paiement mensuel</span>
                            </button>
                        </div>
                    </div>
                    {
                        !user &&  
                        <div className='display justify-c'>
                            <div className='display justify-c'>
                                <button className='blue hover-blue h-4 p-1 border-r-1'>
                                    <span className='f-s-18 c-black'>Créer un compte gratuitement</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>

                    <Plans billied={billied} />
            </div>

            <FAQ /> 
        </Main>
    )
}
