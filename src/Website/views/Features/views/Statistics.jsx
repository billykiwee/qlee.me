import {
  DevicePhoneMobileIcon,
  EyeIcon,
  GlobeEuropeAfricaIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import getFavicon from "../../../../App/utils/getFavicon";
import { ProgressBar } from "../../../../Client/views/Stats/components/ProgressBar";

export default function Statistics({
  clics,
  device,
  reference,
  location,
  performance,
}) {
  return (
    <div className="display justify-c border-r-1 w-100p">
      <div className="grid gap-1rem w-100p">
        {clics && (
          <div className="display justify-s-b p-1 border-r-1 grey">
            <div className="display gap">
              <EyeIcon width={20} className="c-black" />
              <span>Clics</span>
            </div>
            <div>
              <span>9 838</span>
            </div>
          </div>
        )}
        {device && (
          <div className="grid gap-1rem justify-s-b p-1 border-r-1 grey">
            <div className="display gap">
              <DevicePhoneMobileIcon width={20} className="c-black" />
              <span>Appareil</span>
            </div>

            <div className="grid gap">
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>Mobile</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(8559)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={87} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>Ordinateur</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(1279)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={13} />
                </div>
              </div>
            </div>
          </div>
        )}
        {reference && (
          <div className="grid gap-1rem justify-s-b p-1 border-r-1 grey">
            <div className="display gap">
              <GlobeEuropeAfricaIcon width={20} className="c-black" />
              <span>Source du trafic</span>
            </div>

            <div className="grid gap">
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <img
                    src={getFavicon("www.instagram.com")}
                    className="border-r-100"
                    width={14}
                  />
                  <span>Instagram</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(4328)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={44} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <img
                    src={getFavicon("www.facebook.com")}
                    className="border-r-100"
                    width={14}
                  />
                  <span>Facebook</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(2754)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={28} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <img
                    src={getFavicon("www.youtube.com")}
                    className="border-r-100"
                    width={14}
                  />
                  <span>Youtube</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(1869)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={19} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <img
                    src={getFavicon("www.twitch.com")}
                    className="border-r-100"
                    width={14}
                  />
                  <span>Twitch</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(885)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={9} />
                </div>
              </div>
            </div>
          </div>
        )}
        {location && (
          <div className="grid gap-1rem justify-s-b p-1 border-r-1 grey">
            <div className="display gap">
              <GlobeEuropeAfricaIcon width={20} className="c-black" />
              <span>Localiation</span>
            </div>

            <div className="grid gap">
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>🇫🇷 France</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(6394)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={65} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(2853)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={29} />
                </div>
              </div>
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>🇪🇪 Estonie</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(590)}</small>
                                    */}
                </div>
                <div className="w-50p display justify-e">
                  <ProgressBar percentage={6} />
                </div>
              </div>
            </div>
          </div>
        )}
        {performance && (
          <div className="grid gap-1rem justify-s-b p-1 border-r-1 grey">
            <div className="display gap">
              <RocketLaunchIcon width={20} className="c-black" />
              <span>Performance</span>
            </div>

            <div className="grid gap">
              <div className="display  justify-s-b">
                <div className="display gap w-50p">
                  <span>Vitesse</span>
                  {/* 
                                    <small className='c-grey'>{makeFriendly(9838)}</small>
                                    */}
                </div>
                <span>1,12s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
