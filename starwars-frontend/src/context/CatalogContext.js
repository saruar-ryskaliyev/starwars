import React, { createContext, useState, useEffect } from 'react';
import { getAllPeople, getAllFilms, getAllPlanets, getAllSpecies, getAllVehicles, getAllStarships } from '../services/swapiService';

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [catalogData, setCatalogData] = useState({
    people: [],
    films: [],
    planets: [],
    species: [],
    vehicles: [],
    starships: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [people, films, planets, species, vehicles, starships] = await Promise.all([
          getAllPeople(),
          getAllFilms(),
          getAllPlanets(),
          getAllSpecies(),
          getAllVehicles(),
          getAllStarships()
        ]);
        setCatalogData({ people, films, planets, species, vehicles, starships });
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CatalogContext.Provider value={catalogData}>
      {children}
    </CatalogContext.Provider>
  );
};
