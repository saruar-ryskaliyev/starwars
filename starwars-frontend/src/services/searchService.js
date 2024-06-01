import { useContext, useCallback } from 'react';
import { CatalogContext } from '../context/CatalogContext';

export const useSearchCatalog = () => {
  const { people, films, planets, species, vehicles, starships } = useContext(CatalogContext);

  const searchCatalog = useCallback((query) => {
    const allItems = [
      ...people.map(item => ({ ...item, type: 'people' })),
      ...films.map(item => ({ ...item, type: 'films' })),
      ...planets.map(item => ({ ...item, type: 'planets' })),
      ...species.map(item => ({ ...item, type: 'species' })),
      ...vehicles.map(item => ({ ...item, type: 'vehicles' })),
      ...starships.map(item => ({ ...item, type: 'starships' }))
    ];

    const filteredItems = allItems.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase()));
    return filteredItems;
  }, [people, films, planets, species, vehicles, starships]);

  return searchCatalog;
};
