import { plans } from "./plans";

export function isUserPremium(user) {
  const userPlan = user.plan;

  if (userPlan !== "FREE") {
    return {
      user: user.email,
      plan: userPlan,
      max_links: plans[userPlan]?.max_links,
      features: plans[userPlan]?.features,
    };
  } else
    return {
      user: user.email,
      plan: "FREE",
      max_links: plans.FREE.max_links,
      features: plans.FREE.features,
    };
}
