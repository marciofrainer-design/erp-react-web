import { useTranslation } from "react-i18next";
import type { AppLanguage } from "@/i18n/resources";
import { motion } from "motion/react";

interface Language {
  code: AppLanguage;
  flag: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "pt-BR", flag: "🇧🇷", name: "Português" },
  { code: "en-US", flag: "🇺🇸", name: "English" },
  { code: "es-ES", flag: "🇪🇸", name: "Español" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: AppLanguage) => {
    void i18n.changeLanguage(languageCode);
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-surface-container-high/30">
      {LANGUAGES.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`relative px-2 py-1 rounded transition-all cursor-pointer text-lg ${
            i18n.language === lang.code
              ? "bg-primary/20 scale-110"
              : "hover:bg-primary/10"
          }`}
          title={lang.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang.flag}
          {i18n.language === lang.code && (
            <motion.div
              layoutId="active-language"
              className="absolute inset-0 rounded border-2 border-primary pointer-events-none"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
