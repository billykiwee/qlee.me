import React from "react";
import { Link } from "react-router-dom";
import Main from "../../../App/components/Main";
import { GetWidth } from "../../../App/utils/GetWidth";
import Links from "./views/Links";
import Qrcode from "./views/Qrcode";
import { VideoCameraIcon } from "@heroicons/react/24/solid";
import Statistics from "./views/Statistics";

export default function Features() {
  const width = GetWidth();

  return (
    <Main>
      <h2 className="m-0">Fonctionnalités</h2>

      <div className="display justify-c">
        <div className="grid gap-2rem m-t-2">
          <div className="grid gap white p-2 border-r-1 shadow">
            <div className="display gap-1rem">
              <h3 className="m-0">Créer & Personaliser</h3>
            </div>
            <div className="grid blocks align-top gap-2rem f-w-200">
              <div className="grid gap-1rem p-1">
                <p className="f-s-18">
                  Créer facilement des liens URL raccourcis pour tes liens longs
                  et encombrants et personnalise ces liens en modifiant le lien
                  court, l'image et même l'URL principale.
                </p>
                <div className="display gap">
                  <div className="display">
                    <Link className="display" to="/dashboard">
                      <button className="blue h-3 p-1 border-r-1">
                        <span className="f-s-16">Commencer</span>
                      </button>
                    </Link>
                  </div>
                  <div className="display">
                    <Link className="display" to="/dashboard">
                      <button className="display gap green h-3 w-3 p-1 border-r-2">
                        <VideoCameraIcon width={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <Links />
            </div>
          </div>

          <div className="grid gap white p-2 border-r-1 shadow">
            <div className="grid gap">
              <div className="display gap-1rem">
                <h3 className="m-0">Statistiques</h3>
              </div>
              <div className="grid blocks align-top gap-2rem f-w-200">
                <div className="grid gap-1rem p-1">
                  <p className="f-s-18">
                    Analyse les statistiques pour comprendre comment tes liens
                    sont utilisés par tes visiteurs et comment tu peux améliorer
                    leur performance.
                  </p>
                  <div className="display gap">
                    <div className="display">
                      <Link className="display" to="/dashboard">
                        <button className="blue h-3 p-1 border-r-1">
                          <span className="f-s-16">Commencer</span>
                        </button>
                      </Link>
                    </div>
                    <div className="display">
                      <Link className="display" to="/dashboard">
                        <button className="display gap green h-3 w-3 p-1 border-r-2">
                          <VideoCameraIcon width={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <Statistics />
              </div>
            </div>
          </div>

          <div className="grid gap white p-2 border-r-1 shadow">
            <div className="display gap-1rem">
              <h3 className="m-0">Qr code</h3>
            </div>
            <div className="grid blocks align-top gap-2rem f-w-200">
              <div className="grid gap-2rem p-1">
                <span className="f-s-18">
                  Créer et de personnaliser des codes QR pour chaque lien. Tes
                  liens seront encore plus accessibles pour tes utilisateurs, en
                  leur offrant la possibilité de les scanner directement avec
                  leur appareil mobile.
                </span>
                <div className="display gap">
                  <div className="display">
                    <Link className="display" to="/dashboard">
                      <button className="blue h-3 p-1 border-r-1">
                        <span className="f-s-16">Commencer</span>
                      </button>
                    </Link>
                  </div>
                  <div className="display">
                    <Link className="display" to="/dashboard">
                      <button className="display gap green h-3 w-3 p-1 border-r-2">
                        <VideoCameraIcon width={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <Qrcode />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
