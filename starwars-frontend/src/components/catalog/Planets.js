import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlanets } from '../../services/swapiService';

const Planets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const data = await getAllPlanets();
        setPlanets(data);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div>
      <h2>Planets</h2>
      <ul>
        {planets.map((planet) => (
          <li key={planet.url}>
            <Link to={`/catalog/planets/${planet.url.split('/').slice(-2, -1)[0]}`}>
              {planet.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planets;
