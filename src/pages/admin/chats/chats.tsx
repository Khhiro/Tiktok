import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getData } from '@/store/reducer/registration';
import { Trash, Edit, X } from 'lucide-react';

export default function Chats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные пользователей из Redux
  const { data: users, loading, error } = useSelector((state: any) => state.registration);

  // Стейт для выбранного чата
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [showEditField, setShowEditField] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');

  useEffect(() => {
    // Загружаем список пользователей, если данные ещё не загружены
    if (!users.length) {
      dispatch(getData());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    // Загружаем чаты из localStorage
    if (currentUser) {
      const storedChats = localStorage.getItem('chats');
      const chats = storedChats ? JSON.parse(storedChats) : {};
      setMessages(chats[currentUser.id] || []);
    }
  }, [currentUser]);

  const startChat = (user: any) => {
    setCurrentUser(user);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Обновляем сообщения локально
      const updatedMessages = [...messages, { sender: 'me', text: newMessage }];
      setMessages(updatedMessages);

      // Обновляем localStorage с новыми сообщениями
      const storedChats = localStorage.getItem('chats');
      const chats = storedChats ? JSON.parse(storedChats) : {};

      // Сохраняем сообщения в localStorage
      chats[currentUser.id] = updatedMessages;
      localStorage.setItem('chats', JSON.stringify(chats));

      setNewMessage('');
    }
  };

  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);

    const storedChats = localStorage.getItem('chats');
    const chats = storedChats ? JSON.parse(storedChats) : {};
    chats[currentUser.id] = updatedMessages;
    localStorage.setItem('chats', JSON.stringify(chats));
    setShowMessageOptions(false);
  };

  const openEditMessage = (index: number) => {
    setSelectedMessage(index);
    setEditedMessage(messages[index].text);
    setShowEditField(true);
    setShowMessageOptions(false);
  };

  const saveEditedMessage = () => {
    const updatedMessages = [...messages];
    updatedMessages[selectedMessage as number].text = editedMessage;
    setMessages(updatedMessages);

    const storedChats = localStorage.getItem('chats');
    const chats = storedChats ? JSON.parse(storedChats) : {};
    chats[currentUser.id] = updatedMessages;
    localStorage.setItem('chats', JSON.stringify(chats));

    setShowEditField(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{`Ошибка: ${error}`}</div>;
  }

  return (
    <div className='w-[100%] sm:ml-[300px] flex'>
      <div className=" h-[83.5vh] w-full sm:w-[80%]  2xl:h-[86vh] bg-gray-100 dark:bg-[#1a1a1a]">
        <div className="flex  flex-col md:flex-row h-full">
          {/* Список пользователей */}
          <div className="flex-1 sm:w-[50%] overflow-y-auto bg-gray-200 dark:bg-[#333] p-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Чаты</h2>
            <ul className="mt-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center p-2 hover:bg-[#7873763b] dark:hover:bg-[#444] rounded-md cursor-pointer"
                  onClick={() => startChat(user)}
                >
                  <img
                    src={user.avatar || '/src/assets/image/profil/profilUser.png'}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <span className="text-lg font-medium text-[#d50087] dark:text-white">{user.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Чат с выбранным пользователем */}
          <div className="flex-3 sm:w-[50%] bg-white dark:bg-[#121212] p-4 flex flex-col">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentUser.name}
                  </h2>
                  <Button
                    onClick={() => setCurrentUser(null)}
                    className="text-red-500 border-none bg-transparent"
                  >
                    Закрыть чат
                  </Button>
                </div>

                {/* Сообщения */}
                <div className="flex-1 overflow-y-auto mb-4">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender === 'me' ? 'bg-[#d50087] text-white' : 'bg-gray-200 text-gray-900'
                          }`}
                          onClick={() => {
                            setSelectedMessage(index);
                            setShowMessageOptions(true);
                          }}
                        >
                          <span>{msg.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Поле для ввода сообщения */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-3 border border-[#d50087] dark:border-[#444] rounded-lg dark:bg-[#333] text-gray-900 dark:text-white"
                    placeholder="Напишите сообщение..."
                  />
                  <Button onClick={sendMessage} className="px-4 py-2 bg-[#d50087] text-white rounded-lg">
                    Отправить
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-400">
                Выберите пользователя для начала чата.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Диалоговое окно с опциями (Изменить/Удалить) */}
      {showMessageOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded--grshadow-lg dark:bg-[#333] text-center">
            <h3 className="text-lg text-gray-900 dark:text-white">Выберите действие</h3>
            <div className="mt-4 flex justify-around">
              <Button
                onClick={() => openEditMessage(selectedMessage as number)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
              >
                Изменить <Edit size={16} />
              </Button>
              <Button
                onClick={() => deleteMessage(selectedMessage as number)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Удалить <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Поле для редактирования сообщения */}
      {showEditField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-[#333] text-center">
            <h3 className="text-lg text-gray-900 dark:text-white">Редактирование сообщения</h3>
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="w-full p-3 border border-[#d50087] dark:border-[#444] rounded-lg dark:bg-[#333] text-gray-900 dark:text-white mt-4"
            />
            <div className="mt-4 flex justify-around">
              <Button
                onClick={saveEditedMessage}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Сохранить
              </Button>
              <Button
                onClick={() => setShowEditField(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
