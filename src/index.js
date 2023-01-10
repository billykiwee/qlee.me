import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/css/style.css'
import './App/css/dashboard.css'
import './App/css/header.css'
import './App/css/home.css'
import App from './App/App';
import reducer, { initialState } from './App/provider/reducer'
import { Context, StateProvider } from './App/provider/StateProvider'
import { PropsProvider } from './App/provider/context';

const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer} >
            <App />
        </StateProvider>
    </React.StrictMode>
)
