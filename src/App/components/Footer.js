import React from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer({ active }) {
  const socialMedia = {
    GitHub: {
      logo1: <BsGithub size={24} />,
      name: "GitHub",
      link: "https://github.com/billykiwee",
    },
    LinkedIn: {
      logo1: <BsLinkedin size={24} />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/billy-turpin-a5b283217/",
    },
    Twitter: {
      logo1: <BsTwitter size={24} />,
      name: "Twitter",
      link: "https://twitter.com/billy_kiwee",
    },
  };

  if (active)
    return (
      <footer className="white">
        <div className="display justify-s-b">
          <div className="align-top display justify-s-b">
            <div className="display gap">
              {Object.values(socialMedia).map((socialMedia) => {
                return (
                  <div key={socialMedia.name}>
                    <a
                      href={socialMedia.link}
                      className="display justify-c w-2 h-2 border-r-04 click"
                    >
                      <span className="display justify-c c-grey">
                        {socialMedia.logo1}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <a href="https://www.kiwee.site">
              <div className="c-grey click display gap">
                <small>made by</small>
                <div className="display justify-c  border-r-1 blue p-04">
                  <img src="./images/kiwee.svg" width={18} alt="" />
                  <small style={{ color: "white" }}>Kiwee</small>
                </div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    );
}
