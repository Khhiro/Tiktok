import { Link, useLocation } from "react-router-dom";
import { AlignJustify, CirclePlus, House, MessageSquareText, Search, UserRound } from "lucide-react";
import { useState, useEffect } from "react";

import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../feature/Switcher/hook/useDarkSide";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { List, LogOut } from "lucide-react";
import LanguageSelector from "@/feature/select_lanquage/SelectLanquage";
import { t } from "i18next";

export default function Footer() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [footerWidth, setFooterWidth] = useState("20%");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Toggle footer width based on screen size
  const toggleFooterWidth = () => {
    if (window.innerWidth >= 640) {
      setFooterWidth((prevWidth) => (prevWidth === "20%" ? "10%" : "20%"));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Update layout when footer width changes
    const updateComponentsLayout = () => {
      const components = document.querySelectorAll('.other-components');
      components.forEach(component => {
        if (footerWidth === "20%") {
          component.style.marginLeft = "20%";
        } else {
          component.style.marginLeft = "10%";
        }
      });
    };

    updateComponentsLayout();
  }, [footerWidth]);

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  

  return (
    <div
      onClick={toggleFooterWidth}
      style={{ width: footerWidth }}
      className="bg-white dark:bg-black border-t sm:border-r sm:border-t-0 border-gray-200 dark:border-gray-700 fixed bottom-0 sm:top-0 sm:left-0 w-full sm:w-[20%] sm:pl-9 sm:pt-5 shadow-inner transition-all"
    >
         <h1 className="font-mono mb-10">Olam</h1>
      <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:gap-0 gap-4 sm:items-start sm:py-4 px-4">
        <Link
          to="/"
          className="sm:mb-10 flex items-center gap-2 sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <House
            className={`${
              isActive("/") ? "text-[#d50087] scale-110" : "dark:text-white text-black"
            } hover:text-[#d50087] transition-all active:scale-90`}
          />
          {footerWidth === "20%" && <span className="hidden sm:inline-block">{t("footer.home")}</span>}
        </Link>

        <Link
          to="/search"
          className="sm:mb-10 flex items-center gap-2 sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Search
            className={`${
              isActive("/search") ? "text-[#d50087] scale-110" : "dark:text-white text-black"
            } hover:text-[#d50087] transition-all active:scale-90`}
          />
          {footerWidth === "20%" && <span className="hidden sm:inline-block">{t("footer.search")}</span>}
        </Link>

        <Link
          to="/publication"
          className="sm:mb-10 flex items-center gap-2 sm:w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <CirclePlus
            className={`${
              isActive("/publication") ? "text-[#d50087] scale-110" : "dark:text-white text-black"
            } hover:text-[#d50087] transition-all active:scale-90`}
          />
          {footerWidth === "20%" && <span className="hidden sm:inline-block">{t("footer.add")}</span>}
        </Link>

        <Link
          to="/chats"
          className="sm:mb-10 flex items-center gap-2 sm:w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageSquareText
            className={`${
              isActive("/chats") ? "text-[#d50087] scale-110" : "dark:text-white text-black"
            } hover:text-[#d50087] transition-all active:scale-90`}
          />
          {footerWidth === "20%" && <span className="hidden sm:inline-block">{t("footer.mesege")}</span>}
        </Link>

        <Link
          to="/profil"
          className="flex items-center gap-2 sm:w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <UserRound
            className={`${
              isActive("/profil") ? "text-[#d50087] scale-110" : "dark:text-white text-black"
            } hover:text-[#d50087] transition-all active:scale-90`}
          />
          {footerWidth === "20%" && <span className="hidden sm:inline-block">{t("footer.profil")}</span>}
        </Link>

        <div className="sm:block hidden flex items-center mt-64">
          {!isLoggedIn && (
            <div className="mb-[20px]">
            <Link to="/login">
              <Button className="bg-red-500 text-white px-[20px] py-2 rounded-md hover:bg-red-600 transition">
                Login
              </Button>
            </Link>
            </div>
          )}
          <div className="w-[50%] flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2">
                {/* <List /> */}
                <AlignJustify className="h-6 w-6"  />
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
          {footerWidth === "20%" && <span className="hidden sm:inline-block">Ешё</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
