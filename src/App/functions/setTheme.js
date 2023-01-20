const initialTheme = 'dark'

const setTheme = theme => {
    localStorage.setItem('theme', theme)
    document.querySelector('html').setAttribute('data-theme', theme)
}

export const toggleTheme = theme => setTheme(theme === 'light' ? 'dark' : 'light')

const savedTheme = localStorage.getItem('theme')

const setThemeOnInit = e => {
    savedTheme 
        ? document.querySelector('html').setAttribute('data-theme', savedTheme)
        : setTheme(initialTheme)
}

setThemeOnInit()