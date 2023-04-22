import React, { useEffect, useState } from "react";
import { minimizeString } from "../../../../App/utils/minimizeString";

export default function Links() {
  const links = [
    {
      name: "Youtube",
      id: "link-1",
      shortLink: "youtube",
      url: "https://cdn-icons-png.flaticon.com/512/3670/3670147.png",
    },
    {
      name: "Instagram",
      id: "link-2",
      shortLink: "instagtam",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    },
    {
      name: "My Tiktok",
      id: "link-3",
      shortLink: "tiktok",
      url: "https://vialmtv.tv/wp-content/uploads/2022/04/tik-tok.webp",
    },
  ];

  return (
    <div className="display justify-c  w-100p">
      <div className="grid gap-1rem w-100p">
        <div className="display gap p-1 border-b border-r-1 border justify-s-b h-2 click">
          <div className="display gap-1rem">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              }
              className="border-r-100"
              width={30}
              height={30}
            />
            <div className="grid ">
              <div className="display gap-04">
                <WriteWord />
              </div>

              <div className="grid gap">
                <div className="display gap-04">
                  <small href={"https://" + ""} className="hover-link link">
                    {"qlee.me/myPlaylist"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {links.map((link) => {
          return (
            <div
              className="display gap p-1 border-b border-r-1 border justify-s-b h-2 click"
              key={link.id}
            >
              <div className="display gap-1rem">
                <img
                  src={link.url}
                  className="border-r-100"
                  width={30}
                  height={30}
                />
                <div className="grid ">
                  <div className="display gap-04">
                    <span className="f-s-16">
                      {minimizeString(link.name, 20)}
                    </span>
                  </div>

                  <div className="grid gap">
                    <div className="display gap-04">
                      <small
                        href={"https://" + link.shortLink}
                        className="hover-link link"
                      >
                        {"qlee.me/" + link.shortLink}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const WriteWord = () => {
  const [wordWrited, setWordWrited] = useState("Spotify");

  const word = ["My playlist", "Music"];

  useEffect((e) => {
    setInterval((e) => {
      setWordWrited(word[Math.floor(Math.random() * word.length)]);
    }, 1600);
  }, []);

  if (wordWrited)
    return (
      <div class="typewriter">
        <span className="c-black">{wordWrited}</span>
      </div>
    );
};
