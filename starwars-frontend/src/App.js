import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Profile from './components/Profile';
import People from './components/catalog/People';
import Films from './components/catalog/Films';
import Planets from './components/catalog/Planets';
import Species from './components/catalog/Species';
import Vehicles from './components/catalog/Vehicles';
import Starships from './components/catalog/Starships';
import PersonDetail from './components/catalog/PersonDetail';
import FilmDetail from './components/catalog/FilmDetail';
import PlanetDetail from './components/catalog/PlanetDetail';
import SpeciesDetail from './components/catalog/SpeciesDetail';
import VehicleDetail from './components/catalog/VehicleDetail';
import StarshipDetail from './components/catalog/StarshipDetail';
import SearchResults from './components/SearchResults';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log("Token:", token);
    setIsAuthenticated(!!token);
  }, []);

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalog/films" element={<Films />} />
          <Route path="/catalog/people" element={<People />} />
          <Route path="/catalog/planets" element={<Planets />} />
          <Route path="/catalog/species" element={<Species />} />
          <Route path="/catalog/vehicles" element={<Vehicles />} />
          <Route path="/catalog/starships" element={<Starships />} />
          <Route path="/catalog/people/:id" element={<PersonDetail />} />
          <Route path="/catalog/films/:id" element={<FilmDetail />} />
          <Route path="/catalog/planets/:id" element={<PlanetDetail />} />
          <Route path="/catalog/species/:id" element={<SpeciesDetail />} />
          <Route path="/catalog/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/catalog/starships/:id" element={<StarshipDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
