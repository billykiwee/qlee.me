import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Home from '../Website/Home'

import Dashboard from '../Client/views/Dashboard/Dashboard'
import Edit from '../Client/views/Links/views/Edit/Edit'
import Header from './components/header/Header'

import Footer from './components/Footer'
import Login from '../Website/views/connection/Login'
import Page404 from '../Website/views/Page404'
import Pricing from '../Website/views/Pricing/Pricing'
import Stats from '../Client/views/Stats/Stats'
import Redirection from '../Client/Redirection.jsx'
import Payment from '../Website/views/payment/Payment'
import LinkInBio from '../Client/views/LinkInBio/LinkInBio'
import Profil from '../Client/views/Profil/Profil'
import Terms from '../Website/views/Terms/Terms'
import { EditLinkInBio } from '../Client/views/LinkInBio/views/Edit/Edit'
import { SnackBar } from './components/snackBar/SnackBar'
import Popup from './components/popUp/Popup'


export default function App() {

    const router = [
        { path : '/*', element : <Page404 /> },
        { path : '/page404', element : <Page404 /> },
        { path : '/', element : <Home /> },
        { path : '/dashboard', element : <Dashboard /> },
        { path : '/edit/:LinkID', element : <Edit /> },
        { path : '/:LinkID', element : <Redirection /> },
        { path : '/login', element : <Login /> },
        { path : '/pricing', element : <Pricing /> },
        { path : '/stats', element : <Stats /> },
        { path : '/stats/:LinkID', element : <Stats /> },
        { path : '/payment/:plan', element : <Payment /> },
        { path : '/@:userName', element : <LinkInBio /> },
        { path : '/edit/@:userName', element : <EditLinkInBio /> },
        { path : '/profil', element : <Profil /> },
        { path : '/terms', element : <Terms /> },
    ]



    return (
        <BrowserRouter>
            <Header active/>
                <SnackBar />
                <Popup />
                <Routes>
                    {
                        router.map((route, i) => {
                            return <Route key={i} path={route.path} exact element={route.element} />
                        })
                    }
                </Routes>
            <Footer />
        </BrowserRouter>
    )

}
