import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStarship } from '../../services/swapiService';
import authService from '../../services/authService';
import './Detail.css'

const StarshipDetail = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const data = await getStarship(`https://swapi.dev/api/starships/${id}/`);
        setStarship(data);
      } catch (error) {
        console.error('Error fetching starship:', error);
      }
    };

    fetchStarship();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const starshipId = starship.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoriteStarships: [...user.favoriteStarships, starshipId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${starship.name} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!starship) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detail-container'>
      <h2>{starship.name}</h2>
      <p>Model: {starship.model}</p>
      <p>Manufacturer: {starship.manufacturer}</p>
      <p>Cost in Credits: {starship.cost_in_credits}</p>
      <p>Length: {starship.length}</p>
      <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
      <p>Crew: {starship.crew}</p>
      <p>Passengers: {starship.passengers}</p>
      <p>Cargo Capacity: {starship.cargo_capacity}</p>
      <p>Consumables: {starship.consumables}</p>
      <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
      <p>MGLT: {starship.MGLT}</p>
      <p>Starship Class: {starship.starship_class}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default StarshipDetail;
