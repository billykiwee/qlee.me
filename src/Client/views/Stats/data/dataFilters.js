import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from "@heroicons/react/24/solid"
import { Clics } from "../statistics/components/Clics"
import { Device } from "../statistics/components/Device"
import { Location } from "../statistics/components/Location"
import { Reference } from "../statistics/components/Reference"
import { Performance } from "../statistics/components/Performance"
import { countBy } from "../statistics/functions/countBy"



export const dataFilter = (LinkStat) => {

    if (!LinkStat) return 

    const newArray = (array) => Array.from(new Set([...array]))

    const clics = LinkStat.length
    const device = LinkStat.map(e=> e.device)
    const localisation = LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country)
    const reference = LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin)
    const performance = LinkStat.map(e=> e.performance)


    const statistics = [
        {
            title: 'Clics',
            name : 'clics',
            data : clics,
        },
        {
            title: 'Appareil',
            name : 'device',
            data : newArray(device).map(app=> {
                return {
                    app,
                    count: device.filter(x => x === app).length
                }
            })
        },
        {
            title: 'Source',
            name : 'reference',
            data : newArray(reference).map(url=> {
                return {
                    url,
                    count: reference.filter(x => x === url).length
                }
            })
        },
        {
            title: 'Localisation',
            name : 'localisation',
            data : newArray(localisation).map(adress=> {
                return {
                    adress,
                    count: localisation.filter(x => x === adress).length
                }
            })
        },
        {
            title: 'Performance',
            name : 'performance',
            data : {
                speed: ((performance.reduce((x,y) => (x + y), 0) / performance.length) / 1000).toFixed(2)
            }
        }
    ]


    return statistics
}