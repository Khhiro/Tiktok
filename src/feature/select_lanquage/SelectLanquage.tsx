import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("ru");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (selectedLanguage: string) => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
      localStorage.setItem("language", selectedLanguage);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <Select
        value={language}
        onValueChange={(value) => handleLanguageChange(value)}
      >
        <SelectTrigger className="w-[100px] sm:w-[100px] h-[40px] sm:h-[40px] border border-gray-300 rounded-md shadow-md">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
          <SelectItem value="ru">
            <div className="flex items-center gap-2">
              <img
                width={20}
                src="/assets/images/map/icons8-russian-federation-96.png"
                alt="Russia"
                className="rounded"
              />
              <span>{i18n.t("ru")}</span>
            </div>
          </SelectItem>
          <SelectItem value="tj">
            <div className="flex items-center gap-2">
              <img
                width={20}
                src="/assets/images/map/icons8-tajikistan-96.png"
                alt="Tajikistan"
                className="rounded"
              />
              <span>{i18n.t("tj")}</span>
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex items-center gap-2">
              <img
                width={20}
                src="/assets/images/map/icons8-usa-96.png"
                alt="United States"
                className="rounded"
              />
              <span>{i18n.t("en")}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSelector;
