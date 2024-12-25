import useDarkSide from "@/feature/Switcher/hook/useDarkSide";
import { useState } from "react";

export default function Registration() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Создайте аккаунт
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              placeholder="Введите имя пользователя"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              placeholder="Введите ваш email"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              placeholder="Введите ваш пароль"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Подтвердите пароль
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Введите пароль ещё раз"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?{" "}

          <a
            href="/login"
            className="text-pink-500 font-medium hover:underline"
          >
            Войти
          </a>
        </div>
      </div>
    </div>
  );
}
