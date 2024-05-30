import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Profile from './components/Profile';
import People from './components/catalog/People';
import Films from './components/catalog/Films';
import PersonDetail from './components/catalog/PersonDetail';
import FilmDetail from './components/catalog/FilmDetail';
import Navbar from './components/Navbar';
import Planets from './components/catalog/Planets';
import Species from './components/catalog/Species';
import Starships from './components/catalog/Starships';
import Vehicles from './components/catalog/Vehicles';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/profile" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/catalog/films" element={isAuthenticated ? <Films /> : <Navigate to="/" />} />
          <Route path="/catalog/people" element={isAuthenticated ? <People /> : <Navigate to="/" />} />
          <Route path="/catalog/people/:id" element={isAuthenticated ? <PersonDetail /> : <Navigate to="/" />} />
          <Route path="/catalog/films/:id" element={isAuthenticated ? <FilmDetail /> : <Navigate to="/" />} />
          <Route path="/catalog/planets" element={isAuthenticated ? <Planets /> : <Navigate to="/" />} />
          <Route path="/catalog/species" element={isAuthenticated ? <Species /> : <Navigate to="/" />} />
          <Route path="/catalog/starships" element={isAuthenticated ? <Starships /> : <Navigate to="/" />} />
          <Route path="/catalog/vehicles" element={isAuthenticated ? <Vehicles /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;