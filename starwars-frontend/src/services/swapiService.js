import axios from 'axios';

const SWAPI_URL = 'https://swapi.dev/api';

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
