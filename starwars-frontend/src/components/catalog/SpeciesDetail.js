import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecies } from '../../services/swapiService';
import authService from '../../services/authService';

const SpeciesDetail = () => {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await getSpecies(`https://swapi.dev/api/species/${id}/`);
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const speciesId = species.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoriteSpecies: [...user.favoriteSpecies, speciesId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${species.name} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!species) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{species.name}</h2>
      <p>Classification: {species.classification}</p>
      <p>Designation: {species.designation}</p>
      <p>Average Height: {species.average_height}</p>
      <p>Skin Colors: {species.skin_colors}</p>
      <p>Hair Colors: {species.hair_colors}</p>
      <p>Eye Colors: {species.eye_colors}</p>
      <p>Average Lifespan: {species.average_lifespan}</p>
      <p>Language: {species.language}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default SpeciesDetail;
