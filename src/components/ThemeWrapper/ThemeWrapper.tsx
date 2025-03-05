import React, { useState, useEffect } from 'react';
// интерфейс может принимать дочерние элементы любого типа из реакт
interface ThemeProviderProps {
  children: React.ReactNode;
}
// ThemeProvider является функциональным компонентом реакт с пропсами выше
// тема по умолчанию светлая. setIsDarkTheme функция изменения состояния
// хук useEffect изменяет классы в зависимости от значения isDarkTheme
// document.body добавляет или удаляет классы в зависимости от значения isDarkTheme
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('light-theme', !isDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);
// функция переключения темы 
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // предоставляет значение темы для всех дочерних компонентов
  // value передает текущее состояние темы и функцию для переключения через контекст
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


// функция создает Context для доступа к теме из любых компонентов 
// <{ isDarkTheme: boolean; toggleTheme: () => void }>: Определяет тип значения контекста с использованием TypeScript.
const ThemeContext = React.createContext<{ isDarkTheme: boolean; toggleTheme: () => void }>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

// хук для доступа к контексту
export const useTheme = () => React.useContext(ThemeContext);
export default ThemeProvider;
