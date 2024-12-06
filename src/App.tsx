import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router';
import RecipesPage from './pages/RecipesPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" Component={RecipesPage} />
          <Route path="/favorites" Component={FavoritesPage} />
        </Routes>
      </Router>
  );
}

export default App;
