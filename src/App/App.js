import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useStateValue } from './components/StateProvider'

import Home from '../Website/Home'

import Dashboard from '../Client/Dashboard'
import Edit from '../Client/Edit'



export default function App() {


    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/game" exact element={<Dashboard />} />
                    <Route path="/ProjectView" exact element={<ProjectView />} />
                    <Route path="/edit/:LinkID" exact element={<Edit />} />
                </Routes>
            </main>
        </BrowserRouter>
                
    )

}
