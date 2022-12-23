import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useStateValue } from './provider/StateProvider'
import { getAuth } from "firebase/auth"

import Home from '../Website/Home'

import Dashboard from '../Client/Dashboard'
import Edit from '../Client/Edit'
import Popup from './components/Popup'
import Header from './components/Header'
import Container from './components/Container'
import Footer from './components/Footer'
import Login from '../Website/connection/Login'
import Page404 from '../Website/views/Page404'
import Pricing from '../Website/views/Princing'
import Stats from '../Client/views/Stats'
import Redirection from '../Client/Redirection.jsx'
import Payment from '../Website/views/Payment'



export default function App() {

    const [{user}, dispatch] = useStateValue('')
    const auth = getAuth()

    
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // The user just ged in or the user is ged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } else { 
                // The user is logged out
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })
    }, [dispatch, auth])

    



    return (
        <BrowserRouter>
            <Header />
                <Container>
                    <Routes>
                        <Route path="/*" exact element={<Page404 />} />
                        <Route path="/page404" exact element={<Page404 />} />
                        <Route path="/home" exact element={<Home />} />
                        <Route path="/" exact element={<Home />} />
                        <Route path="/dashboard" exact element={<Dashboard />} />
                        <Route path="/edit/:LinkID" exact element={<Edit />} />
                        <Route path="/:LinkID" exact element={<Redirection />} />
                        <Route path="/login" exact element={<Login />} />

                        <Route path="/pricing" exact element={<Pricing />} />

                        <Route path="/stats" exact element={<Stats />} />
                        <Route path="/stats/:LinkID" exact element={<Stats />} />

                        <Route path="/payment" exact element={<Payment />} />
                    </Routes>
                </Container>
            <Footer />  
        </BrowserRouter>
                
    )

}
