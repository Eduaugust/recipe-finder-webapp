import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router';
import RecipesPage from './pages/RecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import { ConfigProvider, theme } from 'antd';
import { useDarkMode } from './contexts/DarkModeContext';
import { RecipeProvider } from './contexts/RecipeContext'
function App() {

  const { isDarkMode } = useDarkMode();

  console.log(isDarkMode);

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <RecipeProvider>
        <Router>
          <Routes>
            <Route path="/" Component={RecipesPage} />
            <Route path="/favorites" Component={FavoritesPage} />
          </Routes>
        </Router>
      </RecipeProvider>
    </ConfigProvider>
  );
}

export default App;
