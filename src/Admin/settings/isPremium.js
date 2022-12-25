import { plans } from "./plans"

export const isUserPremium = (user) => {

    const userPlan = user.plan

    if (userPlan) {
        return {
            user     : user?.email,
            plan     : userPlan,
            max_links: plans[userPlan]?.max_links,
            features : userPlan === 'PRO' ? plans.PRO.features: plans.ENTREPRISE.features
        }
    }
    else return { max_links:  plans.FREE.max_links }
}