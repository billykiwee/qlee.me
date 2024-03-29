import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useStateProps } from "../../../../../App/provider/ContextProvider";
import { PlansData } from "../data/plans";

export default function Plans({ billing }) {
  const { auth, user } = useStateProps();
  const User = user?.profil;

  const redirect = (plan) => {
    if (!auth) return "/login";

    //if (User.plan === plan.id || plan.id === 'FREE') return '/dashboard'

    return plan.payment + "/" + billing;
  };

  return (
    <div className="display justify-c gap-2rem align-top m-t-1 pricing-blocks">
      {Object.values(PlansData).map((plan, i) => {
        const colorTop = {
          FREE: "linear-gradient(136deg, rgb(11 113 241 / 0.06), transparent)",
          PRO: "linear-gradient(136deg, rgba(250, 202, 35, 0.06), transparent)",
          ENTREPRISE:
            "linear-gradient(136deg, rgb(27 209 161 / 0.06), transparent)",
        };

        return (
          <article
            className="grid border-r-1 shadow article__plan"
            key={i}
            style={{
              opacity: !plan.available && 0.4,
              pointerEvents: !plan.available && "none",
            }}
          >
            <div
              className="p-2 grid gap-1rem white"
              style={{
                borderRadius: "1rem 1rem 0 0",
                background: colorTop?.[plan.id],
              }}
            >
              <div className="display justify-s-b align-top">
                <div className="grid align-l gap">
                  <span
                    className={
                      "f-s-2rem f-w-600 " +
                      (plan.id === "FREE"
                        ? "c-blue"
                        : plan.id === "PRO"
                        ? "c-yellow"
                        : "c-green")
                    }
                  >
                    {plan.plan}
                  </span>
                  <span className="opacity f-s-18">{plan.subtitle}</span>
                </div>
                {User.plan === plan.id && (
                  <div>
                    <img src="/images/check.svg" width={22} alt="" />
                  </div>
                )}
              </div>

              <div className="grid gap-1rem m-t-1">
                <div className="display">
                  <div className="lh-1 display align-b">
                    <div className="display">
                      <span className="display f-w-600 f-s-3rem">
                        €{plan.id === "FREE" ? 0 : plan.price?.[billing]}
                      </span>
                      <span className="f-s-20 m-l-04 opacity m-t-04">
                        / mois
                      </span>
                    </div>
                  </div>
                </div>

                <div className="display">
                  {!plan.available ? (
                    <button className="green border-r-1 h-4 p-1 f-s-16 border-b">
                      <span>Bientôt disponible</span>
                    </button>
                  ) : (
                    <Link to={redirect(plan)} className="w-100p">
                      <button
                        className={
                          (plan.recommended
                            ? "yellow hover-yellow"
                            : "blue hover-blue") +
                          " f-s-16 border-b p-1 h-4 border-r-1"
                        }
                      >
                        <span
                          style={{
                            color: plan.recommended ? "black" : "white",
                          }}
                        >
                          {User.plan === plan.id || plan.id === "FREE"
                            ? "Commencer"
                            : "Essayer"}
                        </span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="article__benefits">
              <div className="grid gap-2rem">
                <div className="grid gap-04">
                  {plan.benefits &&
                    plan.benefits.map((benefit, i) => {
                      return (
                        <div
                          className="display gap hover h-2 p-04 click"
                          style={{
                            borderBottom:
                              i !== plan.benefits.length - 1 &&
                              "1px solid var(--grey-2)",
                          }}
                          key={benefit}
                        >
                          <CheckIcon className="c-green" width={16} />
                          <div className="display gap-04">
                            <span className={"display justify-c c-black w-2"}>
                              {benefit[1]}
                            </span>
                            <p className="f-w-300">{benefit[0]}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
