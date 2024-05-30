import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicle } from '../../services/swapiService';
import authService from '../../services/authService';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicle(`https://swapi.dev/api/vehicles/${id}/`);
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };

    fetchVehicle();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const user = userResponse.data;
      const vehicleId = vehicle.url.split('/').filter(Boolean).pop();
      const updatedFavorites = { favoriteVehicles: [...user.favoriteVehicles, vehicleId] };
      await authService.updateFavorites(updatedFavorites);
      alert(`${vehicle.name} added to favorites`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{vehicle.name}</h2>
      <p>Model: {vehicle.model}</p>
      <p>Manufacturer: {vehicle.manufacturer}</p>
      <p>Cost in Credits: {vehicle.cost_in_credits}</p>
      <p>Length: {vehicle.length}</p>
      <p>Max Atmosphering Speed: {vehicle.max_atmosphering_speed}</p>
      <p>Crew: {vehicle.crew}</p>
      <p>Passengers: {vehicle.passengers}</p>
      <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
      <p>Consumables: {vehicle.consumables}</p>
      <p>Vehicle Class: {vehicle.vehicle_class}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default VehicleDetail;
