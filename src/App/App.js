import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from '../Website/Home'

import Dashboard from '../Client/views/Dashboard/Dashboard'
import Edit from '../Client/views/Links/views/Edit/Edit'
import Header from './components/header/Header'

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
import { EditLinkInBio } from '../Client/views/LinkInBio/views/Edit/Edit'
import { SnackBar } from './components/snackBar/SnackBar'
import Popup from './components/popUp/Popup'


export default function App() {

    const router = {
        init          : { path : '/*', element : <Page404 /> },
        page404       : { path : '/page404', element : <Page404 /> },
        home          : { path : '/', element : <Home /> },
        dashboard     : { path : '/dashboard', element : <Dashboard /> },
        edit          : { path : '/edit/:LinkID', element : <Edit /> },
        redirection   : { path : '/:LinkID', element : <Redirection /> },
        login         : { path : '/login', element : <Login /> },
        pricing       : { path : '/pricing', element : <Pricing /> },
        stats         : { path : '/stats', element : <Stats /> },
        statsByLink   : { path : '/stats/:LinkID', element : <Stats /> },
        payment       : { path : '/payment/:plan', element : <Payment /> },
        linkinbio     : { path : '/@:userName', element : <LinkInBio /> },
        edit_linkinbio: { path : '/edit/@:userName', element : <EditLinkInBio /> },
        profil        : { path : '/profil', element : <Profil /> },
        terms         : { path : '/terms', element : <Terms /> },
    }

    return (
        <BrowserRouter>
            <Header />
                <SnackBar />
                <Popup />
                <Routes>
                    {
                        Object.values(router).map((route, i) => {
                            return <Route key={i} path={route.path} exact element={route.element} />
                        })
                    }
                </Routes>
            <Footer />
      </BrowserRouter>
    )

}
