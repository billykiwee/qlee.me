import { ArrowsRightLeftIcon, ChartPieIcon, Cog6ToothIcon, LinkIcon, QrCodeIcon, SwatchIcon } from '@heroicons/react/24/solid'
import { plans } from '../../../../Admin/settings/plans'

export const Plans = {
    Free : {
        plan    : 'Free 💸',
        subtitle: 'Pour tous',
        price   : 0,
        benefits: [
            ['10 liens', <ArrowsRightLeftIcon width={18} />],
            ['Qr code', <QrCodeIcon width={18} />],
            ['Lien personalisable', <Cog6ToothIcon width={18} />],
        ],
    },
    Pro : {
        plan    : 'Pro 👨🏻‍💻',
        subtitle: 'Pour aller plus loin',
        price   : plans.PRO.price,
        benefits: [
            ['100 liens', <ArrowsRightLeftIcon width={18} />],
            ['Qr code', <QrCodeIcon width={18} />],
            ['Lien personalisable', <Cog6ToothIcon width={18} />],
            ['Statistiques', <ChartPieIcon width={18} />]
        ],
        recommended: true,
        payment    : '/payment/pro',
    },
    Entrprise : {
        plan    : 'Entreprise 🚀',
        subtitle: 'Booster votre présence',
        price   : plans.ENTREPRISE.price,
        benefits: [
            ['1000 liens', <ArrowsRightLeftIcon width={18} />],
            ['Qr code', <QrCodeIcon width={18} />],
            ['Link in bio', <SwatchIcon width={18} />],
            ['Lien personalisable', <Cog6ToothIcon width={18} />],
            ['Statistiques', <ChartPieIcon width={18} />]
        ],
        payment    : '/payment/entreprise',
    }
}