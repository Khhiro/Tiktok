import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/admin/home/home";
import Chats from "./pages/admin/chats/chats";
import Layout from "./layout/layout";
import Search from "./pages/admin/search/seacrh";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/Registration";
import Publication from "./pages/admin/publication/publication";
import ProfilUsers from "./pages/admin/profil_users/profil_users";
import Profil from "./pages/admin/profil/profil";
import EditProfile from "./pages/admin/edit_profil/edit_profil";
import myImage from "/src/assets/O-removebg-preview.png";  // Подключаем изображение

// Необходимо для корректной работы переводов
import './i18n/i18n';
import RotatingImage from "./feature/logo/logo";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";


// Если ваши компоненты загружаются асинхронно, используйте React.lazy() для их импорта
const HomeLazy = React.lazy(() => import("./pages/admin/home/home"));
const EditLazy = React.lazy(() => import("./pages/admin/edit_profil/edit_profil"));
const ChatsLazy = React.lazy(() => import("./pages/admin/chats/chats"));
const LayoutLazy = React.lazy(() => import("./layout/layout"));
const SearchLazy = React.lazy(() => import("./pages/admin/search/seacrh"));
const PublicationLazy = React.lazy(() => import("./pages/admin/publication/publication"));
const ProfilUsersLazy = React.lazy(() => import("./pages/admin/profil_users/profil_users"));
const ProfilLazy = React.lazy(() => import("./pages/admin/profil/profil"));
// const { t, i18n } = useTranslation();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutLazy />,
    errorElement: <div>Страница не найдена! Попробуйте ещё раз.</div>,  
    children: [
      { path: "", element: <HomeLazy /> },
      { path: "chats", element: <ChatsLazy /> },
      { path: "search", element: <SearchLazy /> },
      { path: "publication", element: <PublicationLazy /> },
      { path: "profil", element: <ProfilLazy /> },
      { path: "edit-profil", element: <EditLazy /> },
      {
        path: "/profilUser/:userId",
        element: <ProfilUsersLazy />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);


export default function App() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <img src={myImage} alt="loading" className="w-[150px] h-[150px] animate-spin" />
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  );
}
