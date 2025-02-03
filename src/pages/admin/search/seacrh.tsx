import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/store/reducer/registration";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

export default function Search() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state: RootState) => state.registration);
  
  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // Фильтруем пользователей на основе ввода
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#141414]">
      {/* Поле поиска */}
      <div className="flex justify-center pt-10">
        <Input
          placeholder="Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Обновление состояния
          className="sm:w-[40%] sm:p-0 p-5"
        />
      </div>

      <div className="flex sm:mt-[70px] mt-[50px] justify-center">
        <div className="w-full max-w-lg bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg p-6 mx-4">
          {/* Заголовок */}
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Пользователи
          </h2>

          {/* Лоадер и ошибка */}
          {loading && (
            <div className="text-center text-gray-500 dark:text-gray-400">Загрузка...</div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}

          {/* Список пользователей */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg shadow-md"
                >
                  <img
                    className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                    src={`https://www.gravatar.com/avatar/${user.email}?d=robohash`}
                    alt={user.name}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>

                  {/* Ссылка на профиль пользователя */}
                  <Link
                    to={`/profilUser/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    Перейти
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Пустой список */}
          {!loading && !error && filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Пользователи не найдены.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
