import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSpecies } from '../../services/swapiService';

const Species = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await getAllSpecies();
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <div>
      <h2>Species</h2>
      <ul>
        {species.map((speciesItem) => (
          <li key={speciesItem.url}>
            <Link to={`/catalog/species/${speciesItem.url.split('/').slice(-2, -1)[0]}`}>
              {speciesItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Species;
