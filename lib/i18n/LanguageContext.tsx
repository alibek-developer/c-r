"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { dictionaries, type Language } from "@/lib/i18n/dictionaries";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof dictionaries)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: dictionaries[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
