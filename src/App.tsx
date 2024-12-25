import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./feature/select_language/SelectLanguage";
import "./i18n/i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/admin/home/home";
import Chats from "./pages/admin/chats/chats";
import Profil from "./pages/admin/profil/profil";
import Publication from "./pages/admin/publication/publication";
import Layout from "./layout/layout";
import Search from "./pages/admin/search/seacrh";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> }, // Главная страница
      { path: "chats", element: <Chats /> },
      { path: "profil", element: <Profil /> },
      { path: "publication", element: <Publication /> },
      { path: "search", element: <Search /> },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Основной элемент для маршрута /login
  },
  {
    path: "/registration",
    element: <Registration />, // Отдельный маршрут для регистрации
  },
]);

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      {/* <LanguageSelector onChangeLanguage={changeLanguage} /> */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
