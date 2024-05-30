import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStarships } from '../../services/swapiService';

const Starships = () => {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const data = await getAllStarships();
        setStarships(data);
      } catch (error) {
        console.error('Error fetching starships:', error);
      }
    };

    fetchStarships();
  }, []);

  return (
    <div>
      <h2>Starships</h2>
      <ul>
        {starships.map((starship) => (
          <li key={starship.url}>
            <Link to={`/catalog/starships/${starship.url.split('/').slice(-2, -1)[0]}`}>
              {starship.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Starships;
