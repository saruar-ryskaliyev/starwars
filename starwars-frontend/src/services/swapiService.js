import axios from 'axios';

const SWAPI_URL = 'https://swapi.dev/api';

export const getAllPlanets = async () => {
  let allPlanets = [];
  let nextUrl = `${SWAPI_URL}/planets/?format=json`;

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      allPlanets = [...allPlanets, ...response.data.results];
      nextUrl = response.data.next;
    } catch (error) {
      console.error('Error fetching planets:', error);
      throw error;
    }
  }

  return allPlanets;
};

export const getPlanet = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching planet:', error);
    throw error;
  }
};

export const getAllPeople = async () => {
  let allPeople = [];
  let nextUrl = `${SWAPI_URL}/people/?format=json`;

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      allPeople = [...allPeople, ...response.data.results];
      nextUrl = response.data.next;
    } catch (error) {
      console.error('Error fetching people:', error);
      throw error;
    }
  }

  return allPeople;
};

export const getPerson = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};

export const getAllFilms = async () => {
  try {
    const response = await axios.get(`${SWAPI_URL}/films/?format=json`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
};

export const getFilm = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching film:', error);
    throw error;
  }
};

export const getAllSpecies = async () => {
    let allSpecies = [];
    let nextUrl = `${SWAPI_URL}/species/?format=json`;
  
    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        allSpecies = [...allSpecies, ...response.data.results];
        nextUrl = response.data.next;
      } catch (error) {
        console.error('Error fetching species:', error);
        throw error;
      }
    }
  
    return allSpecies;
  };
  
  export const getSpecies = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching species:', error);
      throw error;
    }
  };
  
  export const getAllVehicles = async () => {
    let allVehicles = [];
    let nextUrl = `${SWAPI_URL}/vehicles/?format=json`;
  
    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        allVehicles = [...allVehicles, ...response.data.results];
        nextUrl = response.data.next;
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
      }
    }
  
    return allVehicles;
  };
  
  export const getVehicle = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      throw error;
    }
  };