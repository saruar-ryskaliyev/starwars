import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllFilms } from '../../services/swapiService';

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getAllFilms();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h2>Films</h2>
      <ul>
        {films.map((film) => (
          <li key={film.url}>
            <Link to={`/catalog/films/${film.url.split('/').slice(-2, -1)[0]}`}>
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Films;
