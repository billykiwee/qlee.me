
export const isUserPremium = (user) => {

    const plans = {
        FREE : {
            max_links: 10
        },
        PRO : {
            max_links: 300,
            features : {
                statistics    : true,
                edit_shortlink: true,
                monetization  : true,
            }
        },
        ENTREPRISE: {
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

    const userPlan = user.plan

    return {
        user     : user?.email,
        plan     : userPlan,
        max_links: userPlan && plans[userPlan].max_links,
        features : userPlan === 'PRO' ? plans.PRO.features: plans.ENTREPRISE.features
    }
}