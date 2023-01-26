import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from './components/header/Header'
import Footer from './components/Footer'

import { SnackBar } from './components/snackBar/SnackBar'
import Popup from './components/popUp/Popup'
import { router } from './router/router'

export default function App() {

    return (
        <BrowserRouter>
                <SnackBar />
                <Popup />
                <Routes>
                    {
                        router
                        .map((route, i) => {
                            return (
                                <Route 
                                    key={i} 
                                    path={route.path} 
                                    exact 
                                    element={
                                        <>
                                            <Header active={!route.blank} />
                                            {route.element}
                                            <Footer active={!route.blank}/>
                                        </>
                                    } 
                                />
                            )
                        })
                    }
                </Routes>
        </BrowserRouter>
    )

}
