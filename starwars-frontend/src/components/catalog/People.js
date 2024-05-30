import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPeople } from '../../services/swapiService';

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getAllPeople();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person) => (
          <li key={person.url}>
            <Link to={`/catalog/people/${person.url.split('/').slice(-2, -1)[0]}`}>
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default People;
