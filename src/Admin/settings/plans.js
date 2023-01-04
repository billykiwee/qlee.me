export const plans = {
    FREE : {
        max_links: 10
    },
    PRO : {
        price    : 4.9,
        max_links: 300,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
        }
    },
    ENTREPRISE: {
        price    : 12.9,
        max_links: 1000,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
            link_in_bio   : true,
        }
    }
}