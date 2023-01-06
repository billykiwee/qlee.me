import React from 'react'
import { Link } from 'react-router-dom'
import Main from '../../App/components/Main'


export default function Page404() {
    return (
        <>
            <div className='grid gap-2rem'>
                <div className='grid'>
                    <h2>Petite ereur ? 🤔</h2>
                    <span>Ce lien n'est plus disponible.</span>
                </div>
                <div>
                    <Link to='/'>
                        <button className='blue border-b border-r-1 p-1'>
                            <span className='f-s-16'>Retour à l'acceuil</span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
