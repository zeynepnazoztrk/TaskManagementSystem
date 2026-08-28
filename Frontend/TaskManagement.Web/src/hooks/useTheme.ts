import { useEffect, useState } from "react";
import darkThemeUrl from "primereact/resources/themes/bootstrap4-dark-blue/theme.css?url";
import lightThemeUrl from "primereact/resources/themes/bootstrap4-light-blue/theme.css?url";

const THEME_LINK_ID = "primereact-theme";
const STORAGE_KEY = "theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = THEME_LINK_ID;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = isDark ? darkThemeUrl : lightThemeUrl;
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
