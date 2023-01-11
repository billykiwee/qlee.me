import { countBy } from '../functions/countBy'

export const dataFilter = (LinkStat) => {

    if (!LinkStat) return 

    const data = {
        clics : LinkStat.length,
        device: {
            filter: LinkStat.map(e=> e.device),
            count : () => countBy(data.device.filter)
        },
        reference: {
            filter: LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin),
            count : () => countBy(data.reference.filter)
        },
        countries: {
            filter: LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country),
            count : () => countBy(data.countries.filter)
        },
        performance: {
            filter: LinkStat.map(e=> e.performance),
            count : () => {
                if (data.performance.filter.length) {
                    let lenght       = data.performance.filter.length
                    let sort         = data.performance.filter.reduce((x,y) => x + y)
                    let result       = (sort / lenght) / 1000
                    let resultSecond = result.toFixed(2) + 's'
                    return resultSecond
                }
            }
        },
    }

    const { clics, device, reference, countries, performance } = data


    return {
        clics       : clics,
        device      : device.count(),
        reference   : reference.count(),
        localisation: countries.count(),
        performance : { 
            performance: performance.filter,
            speed      : performance.count()
        }
    } 

}
