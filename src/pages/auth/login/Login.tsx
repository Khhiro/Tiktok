import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { getData } from "@/store/reducer/registration"; // Импортируем getData для получения данных

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: RootState) => state.registration); // Получаем данные из Redux

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Загрузка данных (пользователи) из Redux перед проверкой
    await dispatch(getData());

    // Проверка, если email и пароль совпадают с данными из data
    const user = data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Если нашли пользователя с таким email и паролем
      localStorage.setItem("token", "your-token-here"); // Сохранение токена (если нужно)
      alert("Вы успешно вошли в аккаунт!");
      navigate("/"); // Перенаправление на главную страницу
    } else {
      // Если данных нет в базе
      alert("Неверный email или пароль!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Войти в аккаунт
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Нет аккаунта?{" "}
          <a
            href="/registration"
            className="text-pink-500 font-medium hover:underline"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
}
