export const plans = {
    FREE : {
        name: 'FREE',
        max_links: 10,
        features : {},
    },
    PRO : {
        name : 'PRO',
        price: {
            yearly : 3.9,
            monthly: 4.9
        },
        max_links: 100,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
        }
    },
    ENTREPRISE: {
        name: 'ENTREPRISE',
        price    : {
            yearly : 9.9,
            monthly: 12.9
        },
        max_links: 1000,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
            link_in_bio   : true,
        }
    }
}