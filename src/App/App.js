import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useStateValue } from './provider/StateProvider'
import { getAuth } from "firebase/auth"

import Home from '../Website/Home'

import Dashboard from '../Client/views/Dashboard/Dashboard'
import Edit from '../Client/views/Links/Edit'
import Header from './components/Header'

import Footer from './components/Footer'
import Login from '../Website/connection/Login'
import Page404 from '../Website/views/Page404'
import Pricing from '../Website/views/Pricing/Pricing'
import Stats from '../Client/views/Stats/Stats'
import Redirection from '../Client/Redirection.jsx'
import Payment from '../Website/views/Payment'
import LinkInBio from '../Client/views/LinkInBio/LinkInBio'
import Profil from '../Client/views/Profil/Profil'
import Terms from '../Website/views/Terms/Terms'
import { EditLinkInBio } from '../Client/views/LinkInBio/components/Edit'
import Main from './components/Main'
import { useFetchUser } from '../Client/data/Users/users'




export default function App() {

    const [{user}, dispatch] = useStateValue('')
    const auth = getAuth()

    
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } else { 
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })
    }, [dispatch, auth])

    


    const router = {
        init : {
            path : '/*',
            element : <Page404 />
        },
        page404 : {
            path : '/page404',
            element : <Page404 />
        },
        home : {
            path : '/',
            element : <Home />
        },
        dashboard : {
            path : '/dashboard',
            element : <Dashboard />
        },
        edit : {
            path : '/edit/:LinkID',
            element : <Edit />
        },
        redirection : {
            path : '/:LinkID',
            element : <Redirection />
        },
        login : {
            path : '/login',
            element : <Login />
        },
        pricing : {
            path : '/pricing',
            element : <Pricing />
        },
        stats : {
            path : '/stats',
            element : <Stats />
        },
        statsByLink : {
            path : '/stats/:LinkID',
            element : <Stats />
        },
        payment : {
            path : '/payment/:plan',
            element : <Payment />
        },
        linkinbio : {
            path : '/@:userName',
            element : <LinkInBio />
        },
        edit_linkinbio : {
            path : '/edit/@:userName',
            element : <EditLinkInBio />
        },
        profil : {
            path : '/profil',
            element : <Profil />
        },
        terms : {
            path : '/terms',
            element : <Terms />
        },
    }


    const User = useFetchUser(user)

    Object.values(router).forEach(route => {
        route.element = React.cloneElement(route.element, {
            User
        })
    })

    return (
        <BrowserRouter>
            <Header/>
                <Routes>
                    {
                        Object.values(router)
                        .map((route, i)=> {
                            return (
                                <Route 
                                    path={route.path} 
                                    exact 
                                    element={
                                        <Main>
                                            {route.element }
                                        </Main>
                                    } 
                                    key={i}
                                />
                            )
                        })
                    }
                </Routes>
            <Footer />  
        </BrowserRouter>
                
    )

}
