import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./hook/useDarkSide";

export default function Switcher(): JSX.Element {
  const [colorTheme, setTheme] = useDarkSide(); // Возвращаемые типы хука должны быть указаны в самом хуке
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div>
      <DarkModeSwitch
        size={25}
        checked={darkSide}
        onChange={toggleDarkMode} // Убрана ненужная обертка
        className="2xl:size-[40px] sm:ml-0 ml-[8px]"
        style={{ width: "25px" }}
      />
    </div>
  );
}
