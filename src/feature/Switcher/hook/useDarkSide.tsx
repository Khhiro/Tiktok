import { useEffect, useState } from "react";

export default function useDarkSide(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const colorTheme: string = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme); // Удаляем предыдущую тему
    root.classList.add(theme); // Добавляем текущую тему

    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
