import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from "@heroicons/react/24/solid"

export const statistics = (LinkStat) => {

    if (!LinkStat) return 

    const newArray = (array) => Array.from(new Set([...array]))

    const clics = LinkStat.length
    const device = LinkStat.map(e=> e.device)
    const localisation = LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country)
    const reference = LinkStat.filter(e=> e.reference !== '').map(e=> e.reference && new URL(e.reference).origin)
    const performance = LinkStat.map(e=> e.performance)


    return [
        {
            title: 'Clics',
            name : 'clics',
            data : clics,
            icon : <EyeIcon width={16} />
        },
        {
            title: 'Appareil',
            name : 'device',
            data : newArray(device).map(app=> {
                return {
                    app,
                    count: device.filter(x => x === app).length,
                }
            }),
            icon : <DevicePhoneMobileIcon width={16} />
        },
        {
            title: 'Source',
            name : 'reference',
            data : newArray(reference).map(url=> {
                return {
                    url,
                    count: reference.filter(x => x === url).length,
                    percentage: 0
                }
            }),
            icon : <GlobeEuropeAfricaIcon width={16} />,
        },
        {
            title: 'Localisation',
            name : 'localisation',
            data : newArray(localisation).map(adress=> {
                return {
                    adress,
                    count: localisation.filter(x => x === adress).length,
                    percentage: 0
                }
            }),
            icon : <MapPinIcon width={16} />,
        },
        {
            title: 'Performance',
            name : 'performance',
            data : {
                type : [
                    {
                        title: 'vitesse',
                        name : 'speed',
                        data : ((performance.reduce((x,y) => (x + y), 0) / performance.length) / 1000).toFixed(2) + ' s',
                    }
                ]
            },
            icon : <RocketLaunchIcon width={16} />
        }
    ]
}