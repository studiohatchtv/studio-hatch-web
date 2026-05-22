import { createContext, useContext, useEffect, useState } from "react";
import { STRINGS } from "./strings.js";

const LanguageContext = createContext({
  lang: "tr",
  t: STRINGS.tr,
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("hatch-lang");
    return saved === "en" || saved === "tr" ? saved : "tr";
  });

  useEffect(() => {
    localStorage.setItem("hatch-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, t: STRINGS[lang], setLang };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
