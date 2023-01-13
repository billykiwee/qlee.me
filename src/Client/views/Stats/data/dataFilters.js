import { countBy } from "../statistics/functions/countBy"



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
        localisation: {
            filter: LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country),
            count : () => countBy(stats.localisation.filter)
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

    const { clics, device, reference, localisation, performance } = stats


    return {
        clics       : { 
            name : 'clics',
            count: clics 
        },
        device      : { 
            name : 'device',
            array: device.count() 
        },
        reference   : { 
            name : 'reference',
            array: reference.count() 
        },
        localisation: { 
            name : 'localisation',
            array: localisation.count() 
        },
        performance : { 
            name : 'performance',
            count: performance.count()
         }
    } 

}
