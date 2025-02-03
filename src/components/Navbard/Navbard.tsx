import { Input } from "../ui/input";
import * as React from "react";
import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../feature/Switcher/hook/useDarkSide";
import { Button } from "@/components/ui/button";
import myImage from "/src/assets/O-removebg-preview.png";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List, LogOut } from "lucide-react";
import LanguageSelector from "@/feature/select_lanquage/SelectLanquage";
import { Link } from "react-router-dom";
import RotatingImage from "@/feature/logo/logo";
import Search from "@/pages/admin/search/seacrh"; // Импорт компонента поиска

export default function Navbard() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Строка поиска

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Обновляем строку поиска
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div className="w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 fixed top-0 shadow-lg">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
   
        
        <Link to="/">
          <RotatingImage imageSrc={myImage} />
        </Link>

        {/* Поле поиска */}
        <div className="hidden mr-[65px] md:block w-[36%]">
          {/* Добавлен компонент Search */}
          <Input
            type="search"
            className="w-full border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange} // Обработчик для обновления searchQuery
          />
        </div>

        {/* Остальные элементы */}
        <div className="flex items-center space-x-3">
          {!isLoggedIn && (
            <Link to="/login">
              <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Login
              </Button>
            </Link>
          )}
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
              <DropdownMenuCheckboxItem className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
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
              <DropdownMenuCheckboxItem className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                Logout
                <LogOut onClick={Logout} />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
