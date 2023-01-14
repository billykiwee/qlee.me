import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from "@heroicons/react/24/solid"
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


    return [
        {
            title: 'Clics',
            type : 'clics',
            data : clics,
            icon : <EyeIcon width = {18}/>
        },
        {
            title: 'Appareil',
            type : 'device',
            data : device.count(),
            icon : <DevicePhoneMobileIcon width={18}/>
        },
        {
            title: 'Source',
            type : 'reference',
            data : reference.count(),
            icon : <GlobeEuropeAfricaIcon width={18}/>
        },
        {
            title: 'Localisation',
            type : 'localisation',
            data : localisation.count(),
            icon : <MapPinIcon width={18}/>
        },
        {
            title: 'Performance',
            type : 'performance',
            data : performance.count(),
            icon : <RocketLaunchIcon width={18} />
        },
    ]
}
