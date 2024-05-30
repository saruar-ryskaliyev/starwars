import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllVehicles } from '../../services/swapiService';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h2>Vehicles</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.url}>
            <Link to={`/catalog/vehicles/${vehicle.url.split('/').slice(-2, -1)[0]}`}>
              {vehicle.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;
