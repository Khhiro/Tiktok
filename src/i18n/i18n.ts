import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Переводы для разных языков
import en from "../../public/locales/en.json";
import ru from "../../public/locales/ru.json";
import tj from "../../public/locales/tj.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      tj: { translation: tj },
    },
    lng: localStorage.getItem("language") || "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
