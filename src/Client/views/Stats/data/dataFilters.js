import { countBy } from '../functions/countBy'

export const dataFilter = (LinkStat) => {

    const views = LinkStat.length

    const device = LinkStat.map(e=> e.device)
    const countByDevice = countBy(device)

    const reference = LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin)
    const countByReference = countBy(reference)

    const countries = LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country)
    const countByCountry = countBy(countries)

    const performance = LinkStat.map(e=> e.performance)
    const countPerformance = performance.length && ((performance.reduce((x,y) => x + y) / performance.length / 1000)).toFixed(2) + 's'


    return {
        clics       : views,
        device      : Object.values(countByDevice),
        reference   : Object.values(countByReference),
        localisation: Object.values(countByCountry),
        performance : { performance, speed : countPerformance }
    } 
}
