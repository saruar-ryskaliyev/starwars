import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CatalogProvider } from './context/CatalogContext';

ReactDOM.render(
  <CatalogProvider>
    <App />
  </CatalogProvider>,
  document.getElementById('root')
);
