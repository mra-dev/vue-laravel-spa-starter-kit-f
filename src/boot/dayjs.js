import {boot} from 'quasar/wrappers'

import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(jalaliday)
dayjs.calendar('jalali')
dayjs.locale('fa')
dayjs.extend(updateLocale)
dayjs.updateLocale('fa', {
    meridiem: (hour, minute, isLowercase) => {
        return hour >= 12 ? 'بعد از ظهر' : 'قبل از ظهر'
    }
})

export default boot(({app}) => {
    app.config.globalProperties.$dayjs = dayjs
})

export { dayjs as jd }
