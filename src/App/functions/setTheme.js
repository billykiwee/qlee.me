import { useEffect, useState } from "react"
import { useStateValue } from "../provider/StateProvider"

const getPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'

const initialTheme = getPreference

const setTheme = theme => {
    localStorage.setItem('theme', theme)
    document.querySelector('html').setAttribute('data-theme', theme)
}

export const toggleTheme = theme => {
    setTheme(theme === 'light' ? 'dark' : 'light')

    return theme
}

const savedTheme = localStorage.getItem('theme')

const setThemeOnInit = e => {
    savedTheme 
        ? document.querySelector('html').setAttribute('data-theme', savedTheme)
        : setTheme(initialTheme)
}

setThemeOnInit()


export const useGetTheme = () => {

    const [{ theme }, dispatch] = useStateValue()

    const change = (theme) => {
        dispatch({
            type: 'SET_THEME',
            theme: theme
        })
        console.log(theme);
    }

    localStorage.setItem('theme', theme)

   return { change, theme }
}