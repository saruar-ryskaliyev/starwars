import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilm } from '../../services/swapiService';
import authService from '../../services/authService';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = await getFilm(`https://swapi.dev/api/films/${id}/`);
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film:', error);
      }
    };

    fetchFilm();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const filmId = film.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoriteFilms: [...user.favoriteFilms, filmId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${film.title} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{film.title}</h2>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default FilmDetail;
