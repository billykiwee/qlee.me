import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from "@heroicons/react/24/solid"
import { Clics } from "../statistics/components/Clics"
import { Device } from "../statistics/components/Device"
import { Location } from "../statistics/components/Location"
import { Reference } from "../statistics/components/Reference"
import { Performance } from "../statistics/components/Performance"
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
            icon : <EyeIcon width={18}/>,
            data : clics,
        },
        {
            title: 'Appareil',
            type : 'device',
            icon : <DevicePhoneMobileIcon width={18}/>,
            data : device.count()
        },
        {
            title: 'Source',
            type : 'reference',
            icon : <GlobeEuropeAfricaIcon width={18}/>,
            data : reference.count()
        },
        {
            title: 'Localisation',
            type : 'localisation',
            icon : <MapPinIcon width={18}/>,
            data : localisation.count()
        },
        {
            title: 'Performance',
            type : 'performance',
            icon : <RocketLaunchIcon width={18} />,
            data : performance.count()
        },
    ]
}
