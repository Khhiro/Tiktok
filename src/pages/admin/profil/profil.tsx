import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReels } from "@/store/reducer/registration";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Profil() {
  const getLocalData = (key, defaultValue) => localStorage.getItem(key) || defaultValue;

  const avatar = getLocalData("avatar", "/src/assets/image/profil/profilUser.png");
  const name = getLocalData("name", "Имя пользователя");
  const biography = getLocalData("biography", "Добавьте свою биографию");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();
  const { data: reels, loading, error } = useSelector((state) => state.registration);

  const [userReels, setUserReels] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && !reels.length) {
      dispatch(getReels());
    }
  }, [dispatch, reels.length, token]);

  useEffect(() => {
    if (userId && reels.length > 0) {
      const filteredReels = reels.filter((reel) => reel.userId === userId);
      setUserReels(filteredReels);
    }
  }, [reels, userId]);

  const handleDeleteReel = (reelId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить это видео?");
    if (!confirmDelete) {
      toast.info("Удаление отменено.");
      return;
    }

    const removedReel = userReels.find((reel) => reel.id === reelId);
    setUserReels((prevReels) => prevReels.filter((reel) => reel.id !== reelId));

    axios
      .delete(`http://localhost:2211/reels/${reelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Видео удалено!");
      })
      .catch((error) => {
        console.error("Ошибка при удалении видео:", error);
        toast.error("Не удалось удалить видео.");
        setUserReels((prevReels) => [...prevReels, removedReel]);
      });
  };

  const openModal = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  const isVideo = (content) => content?.startsWith("data:video") || content?.endsWith(".mp4");

  return (
    <div className="flex justify-end">
      <Toaster position="top-right" />
      <div className="sm:w-[80%] w-full min-h-screen bg-gray-100 dark:bg-[#141414]">
        {/* Верхняя часть профиля */}
        <div className="h-auto sm:h-[40%] bg-slate-50 dark:bg-[#1c1c1c] py-6 px-4 sm:px-8">
          {!token ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Для отображения профиля зарегистрируйтесь или войдите в аккаунт.
            </p>
          ) : (
            <div className="flex sm:flex-row flex-col items-center justify-between gap-6">
              <img
                className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                src={avatar}
                alt="User Avatar"
              />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  {name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{biography}</p>
              </div>
              <Button
                onClick={() => navigate("/edit-profil")}
                className="px-6 py-2 bg-[#d50087] hover:bg-[#f6069e] text-white rounded-lg shadow-md"
              >
                Редактировать профиль
              </Button>
            </div>
          )}
        </div>

        {/* Секция для добавленных видео */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ваши видео</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userReels.length > 0 ? (
              userReels.map((reel) => (
                <div
                  key={reel.id}
                  className="p-4 bg-white dark:bg-[#1c1c1c] rounded-lg shadow-md"
                >
                  <video
                    src={reel.reels}
                    controls
                    className="w-full h-[200px] object-cover rounded-md"
                    onClick={() => openModal(reel.reels)}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDeleteReel(reel.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">Нет добавленных видео</p>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white dark:bg-[#1c1c1c] p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Остановить закрытие при клике внутри модалки
          >
            {isVideo(selectedContent) ? (
              <video
                src={selectedContent}
                controls
                className="w-[80vw] h-[80vh] object-contain"
              />
            ) : (
              <img
                src={selectedContent}
                alt="Selected Content"
                className="w-[80vw] h-[80vh] object-contain"
              />
            )}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
