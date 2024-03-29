import {
  BuildingOfficeIcon,
  LockOpenIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { toggleTheme } from "../../../functions/setTheme";
import { GetWidth } from "../../../utils/GetWidth";

export function Menu({ props }) {
  const { User, menu, setMenu } = props;

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const list = [
    {
      name: "Créer un lien",
      link: "/dashboard",
      icon: <PencilIcon width={22} className="currentColor" />,
    },
    /* {
            name: 'Link in bio',
            link: '/edit/' + User.link_in_bio,
            icon: <SwatchIcon width={18} className='c-yellow' />
        }, */
    {
      name: "Fonctionnalités",
      link: "/features",
      icon: <BiLike size={22} className="currentColor" />,
    },
    {
      name: "Pricing",
      link: "/pricing",
      icon: <LockOpenIcon width={22} className="currentColor" />,
    },
    {
      name: "Terms",
      link: "/terms",
      icon: <BuildingOfficeIcon width={22} className="currentColor" />,
    },
    {
      id: "theme",
      name: theme === "light" ? "Clair" : "Sombre",
      icon:
        theme === "light" ? <MoonIcon width={22} /> : <SunIcon width={22} />,
    },
    {
      id: "user",
      name: User ? User.name : "Se connecter",
      link: User ? "/profil" : "/login",
      icon: (
        <img
          src={User?.photoURL ?? "/images/user.svg"}
          className="border-r-100"
          width={36}
          height={36}
          alt=""
        />
      ),
    },
  ];

  useEffect((e) => {
    window.onclick = (e) => {
      if (!e.target.closest("header")) setMenu(false);
    };
  });

  const width = GetWidth();

  const redirect = (menu) => {
    if (menu.id === "theme") {
      setTheme(localStorage.getItem("theme"));
      return toggleTheme(localStorage.getItem("theme"));
    }

    window.location.href = menu.link;
  };

  if (menu)
    return (
      <div className="menu m-t-2" style={{ width: width > 780 ? "34%" : "" }}>
        <div className="grid w-100p">
          {list.map((menu, i) => {
            return (
              <div key={i} className={menu.id === "user" && "border-r-1 white"}>
                <button
                  className="h-4 border-r-1 display p-1 menu__btn"
                  onClick={(e) => redirect(menu)}
                >
                  <div className="display gap-1rem">
                    <span className="p-04 display justify-c h-2 w-2">
                      {menu.icon}
                    </span>
                    <span className="f-s-20">{menu.name}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
}
