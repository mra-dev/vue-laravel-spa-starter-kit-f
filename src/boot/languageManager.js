// noinspection JSCheckFunctionSignatures

import {LocalStorage, Quasar} from 'quasar'
import {i18n} from "boot/i18n";

const changeLanguage = async (langIso = 'fa-IR') => {
    try {
        await import(
            /* webpackInclude: /(fa-IR|en-US)\.js$/ */
        'quasar/lang/' + langIso
            ).then(lang => {
            LocalStorage.set('lang', langIso)
            Quasar.lang.set(lang.default)
            i18n.global.locale.value = langIso
        })
    } catch (err) {
        console.warn('Language not found. Switching to default. (Be cool, Play fair)')
        await changeLanguage()
    }
}

const userLang = () => LocalStorage.getItem('lang') ?? undefined


export default async () => {
    await changeLanguage(userLang())
}

export {changeLanguage}
