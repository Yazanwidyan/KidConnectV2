import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("lang", newLang);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full bg-gray-200 px-3 py-[9px] text-sm font-semibold text-gray-700 shadow-lg transition hover:bg-gray-100 hover:shadow-lg"
    >
      {i18n.language === "ar" ? "En" : "عربي"}{" "}
    </button>
  );
}
