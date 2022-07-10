import {jd} from "boot/dayjs";


const secondsToTime = seconds => {
    let h = Math.floor(seconds / 3600).toString().padStart(2, '0'),
        m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(seconds % 60).toString().padStart(2, '0')

    if ( (s < 0 || s === '00') && (m < 0 && h < 0))
        return `00:00`

    if (h === '00' || h <= 0)
        return `${m}:${s}`

    return `${h}:${m}:${s}`
}

const authInProgress = (authStoreInstance, expiry = true, leastBonusTime = 1) => {
    if (!!authStoreInstance.auth.mode) {
        if (!expiry)
            return true

        const expiry_time = jd(authStoreInstance.auth.expiry ?? 0).diff(jd(), 's')
        return expiry_time > leastBonusTime
    }
    return false
}

const remainingTime = (laterTime, unit = 's') => {
    return laterTime !== null ? jd(laterTime).diff(jd(), unit) : 0
}


export { secondsToTime, authInProgress, remainingTime }
