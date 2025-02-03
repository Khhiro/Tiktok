import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [newName, setNewName] = useState(localStorage.getItem("name") || "");
  const [newBio, setNewBio] = useState(localStorage.getItem("biography") || "");  // Исправлено
  const [newAvatar, setNewAvatar] = useState(localStorage.getItem("avatar") || "");

  const handleSave = () => {
    // Обновляем данные в localStorage
    localStorage.setItem("name", newName);
    localStorage.setItem("biography", newBio);  // Исправлено
    localStorage.setItem("avatar", newAvatar);

    // Перенаправляем обратно в профиль
    navigate("/profil");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[60%] bg-white dark:bg-[#1c1c1c] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Редактировать профиль</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Имя
          </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Биография
          </label>
          <textarea
            id="bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            rows={4}
            className="mt-2 p-2 w-full border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Фото профиля
          </label>
          <input
            type="file"
            id="avatar"
            onChange={(e) => {
              if (e.target.files) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewAvatar(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="mt-2"
          />
          {newAvatar && (
            <img
              className="mt-4 w-[150px] h-[150px] rounded-full object-cover"
              src={newAvatar}
              alt="Preview Avatar"
            />
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            className="px-6 py-2 bg-[#d50087] hover:bg-[#f6069e] text-white rounded-lg shadow-md"
          >
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  );
};
