import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/css/style.css'
import './App/css/dashboard.css'
import './App/css/header.css'
import App from './App/App';
import reducer, { initialState } from './App/components/reducer'
import { StateProvider } from './App/components/StateProvider'


const root = ReactDOM.createRoot(document.getElementById('root'))


const btn = document.querySelectorAll('button')

btn.forEach(btn=> {
    btn.onmousedown = () => btn.style.borderBottom = 'unset'
    btn.onmouseup = () => btn.style.borderBottom = '6px solid #00000017'
})

root.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer} >
            <App />
        </StateProvider>
    </React.StrictMode>
)
