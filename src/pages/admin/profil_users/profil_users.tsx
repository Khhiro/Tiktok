import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Импорт состояния из Redux

const ProfilUsers = () => {
  const { userId } = useParams();
  const { data: users, loading, error } = useSelector((state: RootState) => state.registration);

  // Логирование для отладки
  console.log("User ID from URL:", userId);
  console.log("Users data:", users);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId && !loading) {
      console.log("Профиль пользователя с ID:", userId);
    }
  }, [userId, loading]);

  if (loading) return <div className="text-center text-gray-500">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return <div className="text-center text-red-500">Пользователь не найден</div>;
  }

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-[100px] p-6">
      {/* Заголовок профиля */}
      <div className="flex items-center mb-8">
        <img
          className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-6"
          src={`https://www.gravatar.com/avatar/${user.email}?d=robohash`}
          alt={user.name}
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Секция с видео */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Видео пользователя</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.reels?.map((reel, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => handleVideoClick(reel.reels)}
            >
              <video
                className="w-full h-60 object-cover rounded-lg"
                src={reel.reels}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для видео */}
      {isModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-black p-4 rounded-lg">
            <video className="w-full h-auto" controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilUsers;
