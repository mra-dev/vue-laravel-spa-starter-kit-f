import {boot} from 'quasar/wrappers'
import {can, cant, hasAny} from "src/services/accessManager";

export default boot(({app}) => {
    app.config.globalProperties.$can = can
    app.config.globalProperties.$cant = cant
    app.config.globalProperties.$hasAny = hasAny
})
