import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'pt'

interface LanguageContextType {
  /** The current language */
  language: string
  /** Function to change the language */
  handleLanguageChange: (lng: "pt" | "en") => void
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = (props: PropsWithChildren) => {
  const { children } = props
  const { i18n } = useTranslation()

  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem('language')
    return storedLang || "en"
  })

  /**
  * Used to change languages
  */
  const handleLanguageChange = (lng: Language) => {
    setLanguage(lng)
  };

  const enableEn = () => handleLanguageChange('en')
  const enablePt = () => handleLanguageChange('pt')

  const addListeners = () => {
    window.addEventListener('language-selection-en', enableEn)
    window.addEventListener('language-selection-pt', enablePt)
  }

  const removeListeners = () => {
    window.removeEventListener('language-selection-en', enableEn)
    window.removeEventListener('language-selection-pt', enablePt)
  }

  /**
   * When the language changes, we update the i18n language
  */
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  /**
   * When a language is selected, listen for event and change language
  */
  useEffect(() => {
    addListeners()
    return removeListeners
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  return useContext(LanguageContext)
}