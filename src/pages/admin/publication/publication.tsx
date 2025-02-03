import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { postReels } from "@/store/reducer/registration";
import toast, { Toaster } from 'react-hot-toast';
import { FaCamera } from "react-icons/fa";

export default function Publication() {
  const [publicValue, setPublication] = useState<string>("");
  const dispatch = useDispatch();

  // Тосты
  const not_logged = () => toast.error("User is not logged in");
  const reelsSuccess = () => toast.success("Added to Reels!");
  const storiesSuccess = () => toast.success("Added to Stories!");
  const avatarSuccess = () => toast.success("Added to Profile Avatar!");

  const handleSaveToReels = () => {
    if (publicValue) {
      const userId = localStorage.getItem("userId"); // Извлекаем userId из localStorage
      if (!userId) {
        not_logged(); // Покажем ошибку, если пользователь не залогинен
        return;
      }

      console.log("Sending to Reels:", { reels: publicValue, userId });

      dispatch(postReels({ reels: publicValue, userId }))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            reelsSuccess(); // Покажем тост об успехе
          } else {
            console.error("Failed to save reels:", result.payload);
          }
        });
    }
  };

  const handleSaveToStories = () => {
    if (publicValue) {
      const stories = JSON.parse(localStorage.getItem("stories") || "[]");
      stories.push(publicValue);
      localStorage.setItem("stories", JSON.stringify(stories));
      storiesSuccess(); // Покажем тост об успехе
    }
  };

  const handleSaveToAvatar = () => {
    if (publicValue) {
      localStorage.setItem("avatar", publicValue);
      avatarSuccess(); // Покажем тост об успехе
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <div className="h-full sm:w-[31%] 2xl:w-[25%] bg-slate-100 dark:bg-[#ffffff22] m-auto mt-[70px] rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
        {/* Зона для загрузки файла */}

        {publicValue && (
          <div className="flex gap-4">
            <button
              onClick={handleSaveToReels}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add to Reels
            </button>
            <button
              onClick={handleSaveToStories}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              Add to Stories
            </button>
            <button
              onClick={handleSaveToAvatar}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              Add to Profile Avatar
            </button>
          </div>
        )}
{!publicValue ? (
  <div className="w-full h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-[#ffffff33] transition-colors cursor-pointer dark:bg-black relative">
    <FileBase64
      onDone={(file) => setPublication(file.base64)}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
    <FaCamera className="text-gray-500 dark:text-gray-300 text-4xl" />
    <span className="text-gray-500 dark:text-gray-300 text-center text-sm font-medium mt-2">
      Click or Drag File Here to Upload
    </span>
  </div>
) : (
  <div className="w-full h-[85%] rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-4">
    {publicValue.startsWith("data:image") ? (
      <img
        src={publicValue}
        alt="Uploaded Preview"
        className="w-full h-full object-cover"
      />
    ) : publicValue.startsWith("data:video") ? (
      <video
        src={publicValue}
        controls
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-gray-500 dark:text-gray-300 text-center text-sm">
        Unsupported format
      </span>
    )}
  </div>
)}
      </div>

      {/* Добавляем компонент ToastContainer для отображения тостов */}
      <Toaster />
    </div>
  );
}
