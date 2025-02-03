import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReels } from "@/store/reducer/registration"; // Путь к экшенам
import { RootState } from "@/store/store";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Для перехода на страницу профиля пользователя
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

export default function Home() {
  const dispatch = useDispatch();
  const {
    data: reels,
    loading,
    error,
  } = useSelector((state: RootState) => state.registration);
  const navigate = useNavigate();

  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set());
  const [comments, setComments] = useState<{ [key: number]: string[] }>({}); // Состояние для комментариев
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({}); // Состояние для показа поля ввода

  useEffect(() => {
    dispatch(getReels());
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, [dispatch]);

  const handleVideoVisibility = (entry: IntersectionObserverEntry) => {
    setVisibleVideos((prev) => {
      const updated = new Set(prev);
      if (entry.isIntersecting) {
        updated.add(Number(entry.target.id));
      } else {
        updated.delete(Number(entry.target.id));
      }
      return updated;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(handleVideoVisibility);
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("video").forEach((video) => {
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleLikeClick = (index: number) => {
    setLikedReels((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  // Функция для добавления комментария
  const handleAddComment = (index: number, comment: string) => {
    setComments((prev) => {
      const updatedComments = { ...prev };
      if (updatedComments[index]) {
        updatedComments[index].push(comment); // Добавляем новый комментарий
      } else {
        updatedComments[index] = [comment]; // Если комментариев еще нет, создаем новый массив
      }
      return updatedComments;
    });
    setShowCommentInput((prev) => ({ ...prev, [index]: false })); // Скрываем поле ввода после отправки
  };

  const toggleCommentInput = (index: number) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [index]: !prev[index], // Переключаем видимость поля ввода
    }));
  };

  if (!Array.isArray(reels)) {
    return (
      <div className="w-full min-h-screen bg-gray-100 dark:bg-[#141414]">
        <div className="text-center text-red-500 py-6">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  bg-gray-100 dark:bg-[#141414]">
      {loading && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-6">Загрузка...</div>
      )}
      {error && <div className="text-center text-red-500 py-6">{error}</div>}

      <div className="flex flex-col items-center gap-6 py-6">
        {reels.map((reel, index) => {
          const reelSrc = reel.reels || "";
          const userId = reel.userId || index + 1;
          const isLiked = likedReels.has(index);

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="w-[90%] pl-10 pr-10 sm:w-[40%] bg-white dark:bg-[#2d2d2d] h-[90vh] relative rounded-lg shadow-lg flex flex-col items-center overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105"
            >
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <img
                  src="/default-avatar.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full cursor-pointer transition-transform duration-300 ease-in-out transform "
                  onClick={() => handleUserClick(userId)}
                />
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#d50087] transition-colors duration-300"
                  onClick={() => handleUserClick(userId)}
                >
                  User {index + 1}
                </p>
              </div>

              {reelSrc.startsWith("data:image") ? (
                <img
                  className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 ease-in-out "
                  src={reelSrc}
                  alt="Reel"
                />
              ) : reelSrc.startsWith("data:video") ? (
                <video
                  id={String(index)}
                  className="w-full h-[90%] object-cover rounded-t-lg transition-transform duration-500 ease-in-out"
                  src={reelSrc}
                  controls
                  autoPlay={visibleVideos.has(index)}
                  muted
                />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">Unsupported format</p>
              )}

              <div className="absolute bottom-4 left-4 flex items-center justify-between w-full px-6 py-4">
                {/* Кнопка Лайка */}
                <button
                  onClick={() => handleLikeClick(index)}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d50087] transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaHeart
                    className={
                      isLiked
                        ? "text-[#d50087] transform scale-110"
                        : "text-gray-400"
                    }
                  />
                  <span className="font-semibold">{isLiked ? "Liked" : "Like"}</span>
                </button>

                {/* Кнопка Комментариев */}
                <button
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d50087] transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => toggleCommentInput(index)} // Показываем/скрываем поле ввода
                >
                  <FaComment />
                  <span className="font-semibold">Comment</span>
                </button>
              </div>

              {/* Поле для ввода комментария */}
              {showCommentInput[index] && (
                <div className="absolute bottom-14 left-4 w-full px-6 py-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#2d2d2d] resize-none"
                    placeholder="Leave a comment..."
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        const newComment = (e.target as HTMLTextAreaElement).value;
                        handleAddComment(index, newComment); // Добавляем комментарий
                        (e.target as HTMLTextAreaElement).value = ""; // Очистка поля
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const newComment = (document.querySelector(
                        `textarea[data-index="${index}"]`
                      ) as HTMLTextAreaElement).value;
                      handleAddComment(index, newComment);
                    }}
                    className="w-full mt-2 bg-[#d50087] text-white p-2 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              )}

              {/* Отображение комментариев */}
              {comments[index] && (
                <div className="absolute bottom-24 z-50 left-4 w-full px-6 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {comments[index].map((comment, idx) => (
                    <div key={idx} className="mb-2">
                      <span className="font-semibold">User {idx + 1}: </span>
                      <span>{comment}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
