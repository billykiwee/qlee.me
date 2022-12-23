export const plans = {
    FREE : {
        max_links: 10
    },
    PRO : {
        price    : 4.90,
        max_links: 300,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
        }
    },
    ENTREPRISE: {
        price    : 12.90,
        max_links: 1000,
        features : {
            statistics    : true,
            edit_shortlink: true,
            monetization  : true,
            link_in_bio   : true,
            shop          : true,
        }
    }
}