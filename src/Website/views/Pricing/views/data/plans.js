import { ArrowsRightLeftIcon, ChartPieIcon, Cog6ToothIcon, LinkIcon, QrCodeIcon, SwatchIcon } from '@heroicons/react/24/solid'
import { plans } from '../../../../../Admin/settings/plans'

export const PlansData = {
    Free : {
        id      : 'FREE',
        plan    : 'Free 💸',
        subtitle: 'Pour tous',
        price   : 0,
        benefits: [
            ['10 liens', <svg stroke="var(--black)" fill="var(--black)" strokeWidth="0" viewBox="0 0 24 24" width='20' xmlns="http://www.w3.org/2000/svg"><path d="M14 13H8V5H6v9a1 1 0 0 0 1 1h7v3l5-4-5-4v3z"></path></svg>],
            ['Qr code', <QrCodeIcon width={18} />],
        ],
        available: true
    },
    Pro : {
        plan    : 'Pro 👨🏻‍💻',
        id      : 'PRO',
        subtitle: 'Pour aller plus loin',
        price   : {
            yearly : plans.PRO.price.yearly,
            monthly: plans.PRO.price.monthly,
        },
        benefits: [
            ['100 liens', <svg stroke="var(--black)" fill="var(--black)" strokeWidth="0" viewBox="0 0 24 24" width='20' xmlns="http://www.w3.org/2000/svg"><path d="M14 13H8V5H6v9a1 1 0 0 0 1 1h7v3l5-4-5-4v3z"></path></svg>],
            ['Qr code', <QrCodeIcon width={18} />],
            ['Lien personalisable', <Cog6ToothIcon width={18} />],
            ['Statistiques', <ChartPieIcon width={18} />]
        ],
        recommended: true,
        payment    : '/payment/pro',
        available: true
    },
    Entrprise : {
        id      : 'ENTREPRISE',
        plan    : 'Entreprise 🚀',
        subtitle: 'Booster votre présence',
        price   : {
            yearly : plans.ENTREPRISE.price.yearly,
            monthly: plans.ENTREPRISE.price.monthly,
        },
        benefits: [
            ['1000 liens', <svg stroke="var(--black)" fill="var(--black)" strokeWidth="0" viewBox="0 0 24 24" width='20' xmlns="http://www.w3.org/2000/svg"><path d="M14 13H8V5H6v9a1 1 0 0 0 1 1h7v3l5-4-5-4v3z"></path></svg>],
            ['Qr code', <QrCodeIcon width={18} />],
            ['Link in bio', <SwatchIcon width={18} />],
            ['Lien personalisable', <Cog6ToothIcon width={18} />],
            ['Statistiques', <ChartPieIcon width={18} />]
        ],
        payment  : '/payment/entreprise',
        available: false
    }
}