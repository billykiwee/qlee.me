import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useStateValue } from './components/StateProvider'
import { getAuth } from "firebase/auth"

import Home from '../Website/Home'

import Dashboard from '../Client/Dashboard'
import Edit from '../Client/Edit'
import Link from '../Client/Link'
import Popup from './components/Popup'
import Header from './components/Header'
import Container from './components/Container'
import Footer from './components/Footer'
import Main from './components/Main'


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

            <Container>
                <Main>
                    <Header />

                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/dashboard" exact element={<Dashboard />} />
                        <Route path="/edit/:LinkID" exact element={<Edit />} />
                        <Route path="/:LinkID" exact element={<Link />} />
                    </Routes>

                </Main>
                <Footer />
            </Container>

        </BrowserRouter>
                
    )

}
