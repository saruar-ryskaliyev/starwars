import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import { getPerson, getFilm, getPlanet, getSpecies, getVehicle, getStarship } from '../services/swapiService';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favoritePeople, setFavoritePeople] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);
  const [favoriteSpecies, setFavoriteSpecies] = useState([]);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [favoriteStarships, setFavoriteStarships] = useState([]);

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

        const favoritePlanetsData = await Promise.all(
          userData.favoritePlanets.map((id) => getPlanet(`https://swapi.dev/api/planets/${id}/`))
        );
        setFavoritePlanets(favoritePlanetsData);

        const favoriteSpeciesData = await Promise.all(
          userData.favoriteSpecies.map((id) => getSpecies(`https://swapi.dev/api/species/${id}/`))
        );
        setFavoriteSpecies(favoriteSpeciesData);

        const favoriteVehiclesData = await Promise.all(
          userData.favoriteVehicles.map((id) => getVehicle(`https://swapi.dev/api/vehicles/${id}/`))
        );
        setFavoriteVehicles(favoriteVehiclesData);

        const favoriteStarshipsData = await Promise.all(
          userData.favoriteStarships.map((id) => getStarship(`https://swapi.dev/api/starships/${id}/`))
        );
        setFavoriteStarships(favoriteStarshipsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      } else if (type === 'planets') {
        updatedFavorites = user.favoritePlanets.filter((id) => id !== itemId);
        setFavoritePlanets((prev) => prev.filter((planet) => planet.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoritePlanets: updatedFavorites,
        }));
      } else if (type === 'species') {
        updatedFavorites = user.favoriteSpecies.filter((id) => id !== itemId);
        setFavoriteSpecies((prev) => prev.filter((species) => species.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoriteSpecies: updatedFavorites,
        }));
      } else if (type === 'vehicles') {
        updatedFavorites = user.favoriteVehicles.filter((id) => id !== itemId);
        setFavoriteVehicles((prev) => prev.filter((vehicle) => vehicle.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoriteVehicles: updatedFavorites,
        }));
      } else if (type === 'starships') {
        updatedFavorites = user.favoriteStarships.filter((id) => id !== itemId);
        setFavoriteStarships((prev) => prev.filter((starship) => starship.url.split('/').filter(Boolean).pop() !== itemId));
        setUser((prevUser) => ({
          ...prevUser,
          favoriteStarships: updatedFavorites,
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
      <p>Planets:</p>
      <ul>
        {favoritePlanets.map((planet) => (
          <li key={planet.url} className="favorite-item">
            {planet.name}
            <button
              onClick={() => removeFromFavorites(planet.url.split('/').filter(Boolean).pop(), 'planets')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
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
      <p>Species:</p>
      <ul>
        {favoriteSpecies.map((speciesItem) => (
          <li key={speciesItem.url} className="favorite-item">
            {speciesItem.name}
            <button
              onClick={() => removeFromFavorites(speciesItem.url.split('/').filter(Boolean).pop(), 'species')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Vehicles:</p>
      <ul>
        {favoriteVehicles.map((vehicle) => (
          <li key={vehicle.url} className="favorite-item">
            {vehicle.name}
            <button
              onClick={() => removeFromFavorites(vehicle.url.split('/').filter(Boolean).pop(), 'vehicles')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Starships:</p>
      <ul>
        {favoriteStarships.map((starship) => (
          <li key={starship.url} className="favorite-item">
            {starship.name}
            <button
              onClick={() => removeFromFavorites(starship.url.split('/').filter(Boolean).pop(), 'starships')}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
