import { Input } from "../ui/input";
import * as React from "react";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../feature/Switcher/hook/useDarkSide";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List } from "lucide-react";
import LanguageSelector from "@/feature/select_lanquage/SelectLanquage";
import { Link } from "react-router-dom";

export default function Navbard() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 fixed top-0 shadow-lg z-50">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-4 py-2 md:py-4">
        {/* Логотип */}
        <Link to="/">
          <div className="dark:bg-[url('/src/assets/image/logo/darkmode.png')] bg-[url('/src/assets/image/logo/lightmode.png')] bg-cover bg-center bg-no-repeat h-[30px] w-[100px]"></div>
        </Link>
        {/* Поле поиска */}
        <div className="hidden ml-4 md:block w-[36%]">
          <Input
            type="search"
            className="w-full border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800"
            placeholder="Search..."
          />
        </div>
        {/* Кнопки */}
        <div className="flex items-center space-x-3">
          {/* Кнопка входа */}
          <Link to="/login">
            <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Login
            </Button>
          </Link>
          {/* Меню (бургер) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2">
                <List className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">
                Appearance
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-gray-200 dark:border-gray-700" />
              <DropdownMenuCheckboxItem
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
              >
                Dark Mode
                <DarkModeSwitch
                  size={25}
                  checked={darkSide}
                  onChange={toggleDarkMode}
                  className="ml-auto"
                />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-gray-700 dark:text-gray-200">
                Language
                <LanguageSelector />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
