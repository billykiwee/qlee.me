import { countBy } from '../functions/countBy'

export const dataFilter = (LinkStat) => {

    if (!LinkStat) return 

    const stats = {
        clics : LinkStat.length,
        device: {
            filter: LinkStat.map(e=> e.device),
            count : () => countBy(stats.device.filter)
        },
        reference: {
            filter: LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin),
            count : () => countBy(stats.reference.filter)
        },
        countries: {
            filter: LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country),
            count : () => countBy(stats.countries.filter)
        },
        performance: {
            filter: LinkStat.map(e=> e.performance),
            count : () => {
                if (stats.performance.filter.length) {
                    let lenght       = stats.performance.filter.length
                    let sort         = stats.performance.filter.reduce((x,y) => x + y)
                    let result       = (sort / lenght) / 1000
                    let resultSecond = result.toFixed(2) + 's'
                    return resultSecond
                }
            }
        },
    }

    const { clics, device, reference, countries, performance } = stats

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
