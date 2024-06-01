import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchCatalog } from '../services/searchService';
import Cookies from 'js-cookie';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const searchCatalog = useSearchCatalog();

  useEffect(() => {
    console.log("Component mounted or query changed:", query);
    const fetchResults = async () => {
      try {
        const data = await searchCatalog(query);
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query, searchCatalog]);

  const getIdFromURL = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.url}>
              <a 
                href={`/catalog/${result.type}/${getIdFromURL(result.url)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.name} ({result.type})
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
