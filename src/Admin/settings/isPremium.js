import { plans } from "./plans"

export const isUserPremium = (user) => {
    const userPlan = user.plan

    if (userPlan === 'PRO' || userPlan === 'ENTREPRISE') {
        return {
            user: user.email,
            plan: userPlan,
            max_links: plans[userPlan].max_links,
            features: plans[userPlan].features
        };
    } 
    else return {
        user: user.email,
        plan: 'FREE',
        max_links: plans.FREE.max_links,
        features: plans.FREE.features
    }
}
