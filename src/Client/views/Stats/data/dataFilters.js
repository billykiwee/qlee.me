import { countBy } from '../functions/countBy'

export const dataFilter = (LinkStat) => {

    if (!LinkStat) return 
    
    const views = LinkStat.length

    const device = LinkStat.map(e=> e.device)
    const countByDevice = countBy(device)

    const reference = LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin)
    const countByReference = countBy(reference)

    const countries = LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country)
    const countByCountry = countBy(countries)

    const performance = LinkStat.map(e=> e.performance)
    const countPerformance = performance.length && ((performance.reduce((x,y) => x + y) / performance.length / 1000)).toFixed(2) + 's'


    const data = {
        clics :  LinkStat.length,
        device: {
            filter: LinkStat.map(e=> e.device),
            count : () => countBy(data.device)
        },
        reference: {
            filter: LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin),
            count : () => countBy(data.reference)
        },
    }

   console.log( data.count);


    return {
        clics       : views,
        device      : Object.values(countByDevice),
        reference   : Object.values(countByReference),
        localisation: Object.values(countByCountry),
        performance : { 
            performance, 
            speed: countPerformance
        }
    } 

}
