import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPerson } from '../../services/swapiService';
import authService from '../../services/authService';
import Cookies from 'js-cookie';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setPerson(null); // Reset person data on ID change or component remount
        const data = await getPerson(`https://swapi.dev/api/people/${id}/`);
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person:', error);
      }
    };

    fetchPerson();
  }, [id]); // Dependency array includes id to handle updates

  const addToFavorites = async () => {
    if (!person) return; // Guard clause to prevent errors if person is null

    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const personId = person.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoritePeople: [...user.favoritePeople, personId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${person.name} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Hair Color: {person.hair_color}</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default PersonDetail;
