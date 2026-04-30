import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './theme';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [accent] = useState('#FF6B35');
  const [userName, setUserName] = useState('Alex');
  const [goal, setGoal] = useState(2200);
  const [showGoalSheet, setShowGoalSheet] = useState(false);

  const theme = dark ? darkTheme(accent) : lightTheme(accent);

  return (
    <AppContext.Provider value={{
      theme, dark, setDark, accent,
      userName, setUserName,
      goal, setGoal,
      showGoalSheet, setShowGoalSheet,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
