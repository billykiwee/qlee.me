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
import { useFetchUser, useFetchUserLinks } from '../Client/data/Users/users'




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





    

    const User = useFetchUser(user)
    const UserLinks = useFetchUserLinks(user)
    

    const props = {
        User,
        UserLinks,
        lol: 'bonkour'
    }



    const router = {
        init : {
            path : '/*',
            element : <Page404 props={props} />
        },
        page404 : {
            path : '/page404',
            element : <Page404 props={props} />
        },
        home : {
            path : '/',
            element : <Home props={props} />
        },
        dashboard : {
            path : '/dashboard',
            element : <Dashboard props={props} />
        },
        edit : {
            path : '/edit/:LinkID',
            element : <Edit props={props} />
        },
        redirection : {
            path : '/:LinkID',
            element : <Redirection props={props} />
        },
        login : {
            path : '/login',
            element : <Login props={props} />
        },
        pricing : {
            path : '/pricing',
            element : <Pricing props={props} />
        },
        stats : {
            path : '/stats',
            element : <Stats props={props} />
        },
        statsByLink : {
            path : '/stats/:LinkID',
            element : <Stats props={props} />
        },
        payment : {
            path : '/payment/:plan',
            element : <Payment props={props} />
        },
        linkinbio : {
            path : '/@:userName',
            element : <LinkInBio props={props} />
        },
        edit_linkinbio : {
            path : '/edit/@:userName',
            element : <EditLinkInBio props={props} />
        },
        profil : {
            path : '/profil',
            element : <Profil props={props} />
        },
        terms : {
            path : '/terms',
            element : <Terms props={props} />
        },
    }

    return (
        <BrowserRouter>
            <Header/>
                <Routes>
                    {
                        Object.values(router)
                        .map((route, i)=> {
                            return (
                                <Route 
                                    key={i}
                                    path={route.path} 
                                    exact 
                                    element={ <Main>{route.element}</Main> } 
                                />
                            )
                        })
                    }
                </Routes>
            <Footer />  
        </BrowserRouter> 
    )

}
