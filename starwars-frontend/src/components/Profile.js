import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import { getPerson, getFilm } from '../services/swapiService';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favoritePeople, setFavoritePeople] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        const userData = response.data;
        setUser(userData);

        const favoritePeopleData = await Promise.all(
          userData.favoritePeople.map((id) => getPerson(`https://swapi.dev/api/people/${id}/`))
        );
        setFavoritePeople(favoritePeopleData);

        const favoriteFilmsData = await Promise.all(
          userData.favoriteFilms.map((id) => getFilm(`https://swapi.dev/api/films/${id}/`))
        );
        setFavoriteFilms(favoriteFilmsData);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, []);

  const removeFromFavorites = async (itemId, type) => {
    try {
      let updatedFavorites;
      if (type === 'people') {
        updatedFavorites = user.favoritePeople.filter((id) => id !== itemId);
        setFavoritePeople((prev) => prev.filter((person) => person.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoritePeople: updatedFavorites,
        }));
      } else if (type === 'films') {
        updatedFavorites = user.favoriteFilms.filter((id) => id !== itemId);
        setFavoriteFilms((prev) => prev.filter((film) => film.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoriteFilms: updatedFavorites,
        }));
      }
      await authService.updateFavorites({ [`favorite${type.charAt(0).toUpperCase() + type.slice(1)}`]: updatedFavorites });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h3>Favorites</h3>
      <p>Planets: {user.favoritePlanets ? user.favoritePlanets.join(', ') : ''}</p>
      <p>People:</p>
      <ul>
        {favoritePeople.map((person) => (
          <li key={person.url} className="favorite-item">
            {person.name}
            <button
              onClick={() => removeFromFavorites(person.url.split('/').filter(Boolean).pop(), 'people')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Films:</p>
      <ul>
        {favoriteFilms.map((film) => (
          <li key={film.url} className="favorite-item">
            {film.title}
            <button
              onClick={() => removeFromFavorites(film.url.split('/').filter(Boolean).pop(), 'films')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Species: {user.favoriteSpecies ? user.favoriteSpecies.join(', ') : ''}</p>
      <p>Vehicles: {user.favoriteVehicles ? user.favoriteVehicles.join(', ') : ''}</p>
      <p>Starships: {user.favoriteStarships ? user.favoriteStarships.join(', ') : ''}</p>
    </div>
  );
};

export default Profile;
