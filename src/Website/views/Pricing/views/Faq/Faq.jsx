import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";
import { GetWidth } from "../../../../../App/utils/GetWidth";

export function FAQ() {
  const width = GetWidth();

  const [showQ, setShowQ] = useState("");

  const questions = [
    {
      id: "q-1",
      q: "Le service est-il gratuit ?",
      a: "Oui, le service est gratuit jusqu'à 10 liens. Les autres fonctionnalités comme les statistqiues sont payante.",
    },
    {
      id: "q-2",
      q: "Puis-je partager des liens raccourcis sur les réseaux sociaux ou par e-mail ?",
      a: "Oui, tous tes liens sont partageable sur toutes les plateformes de media sociaux.",
    },
    {
      id: "q-3",
      q: "Puis-je arrêter mon abonnement à votre service ?",
      a: "Oui, nos abonnements sont sans engagement. Vous pouvez à tout moment arrêter votre abonnement.",
    },
    {
      id: "q-4",
      q: "Le service est-il garanti de ne pas être banni par les réseaux sociaux ou les moteurs de recherche ?",
      a: "Oui, car les lien sont sous le nom domaine qlee.me qui utilise la technologie SSL",
    },
    {
      id: "q-5",
      q: "Il y a t-il un support technique pour aider les utilisateurs en cas de problème ?",
      a: "Oui, tu peux nous poser toute tes questions par mail : contact@kiwee.site",
    },
  ];

  return (
    <div className="grid gap-2rem m-t-4">
      <div className="display justify-c p-2">
        <div className="grid">
          <span className="f-s-25 c-blue f-w-800 text-align-c">FAQ</span>
          <h2 className="m-0 text-align-c">Toujours une question ?</h2>
        </div>
      </div>

      <div
        className="display justify-c margin-auto w-100p"
        style={{ width: width > 780 && "66%" }}
      >
        <div className="display justify-c w-100p">
          <div className="grid gap-1rem w-100p">
            {questions.map((question, i) => {
              return (
                <div
                  className="display white border-r-1 shadow"
                  key={i}
                  style={{ padding: "1.5rem" }}
                >
                  <div className="grid gap-1rem w-100p">
                    <div className="display justify-s-b gap">
                      <div className="display gap">
                        <span className="f-s-18">{question.q}</span>
                      </div>
                      <div
                        className="display justify-c click border-r-100 w-2 h-2 hover"
                        onClick={(e) =>
                          setShowQ((e) =>
                            e !== question.id ? question.id : ""
                          )
                        }
                      >
                        {showQ !== question.id ? (
                          <PlusCircleIcon width={32} className="c-grey" />
                        ) : (
                          <MinusCircleIcon width={32} className="c-grey" />
                        )}
                      </div>
                    </div>
                    {showQ === question.id && (
                      <div>
                        <small className="c-grey f-w-200 f-s-16">
                          {question.a}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
