const getPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const initialTheme = getPreference;

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  document.querySelector("html").setAttribute("data-theme", theme);
};

export const toggleTheme = (theme) => {
  setTheme(theme === "light" ? "dark" : "light");

  return theme;
};

const savedTheme = localStorage.getItem("theme");

const setThemeOnInit = (e) => {
  savedTheme
    ? document.querySelector("html").setAttribute("data-theme", savedTheme)
    : setTheme(initialTheme);
};

setThemeOnInit();

export const GetTheme = () => {
  return toggleTheme();
};
