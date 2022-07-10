import {LocalStorage, Dark} from "quasar";

const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
const userTheme = () => LocalStorage.getItem('theme')
const initTheme = userTheme() ?? hasDarkPreference


const setTheme = (theme = true) => {
    Dark.set(theme)
    LocalStorage.set('theme', theme)
}
const toggleTheme = () => {
    if (!userTheme())
        setTheme(true)
    else
        setTheme(false)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    setTheme(event.matches)
})
setTheme(initTheme)

export { setTheme, toggleTheme }
