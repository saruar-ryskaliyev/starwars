import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlanet } from '../../services/swapiService';
import authService from '../../services/authService';
import './Detail.css';

const PlanetDetail = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const data = await getPlanet(`https://swapi.dev/api/planets/${id}/`);
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planet:', error);
      }
    };

    fetchPlanet();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const planetId = planet.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoritePlanets: [...user.favoritePlanets, planetId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${planet.name} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detail-container'>
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Diameter: {planet.diameter}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default PlanetDetail;
