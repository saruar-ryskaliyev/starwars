import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0'; 
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${debouncedQuery}`);
    }
  }, [debouncedQuery, navigate]);

  return (
    <nav>
      <ul className="navbar">
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <div className="dropdown">
            <button className="dropbtn">Catalog</button>
            <div className="dropdown-content">
              <Link to="/catalog/films">Films</Link>
              <Link to="/catalog/people">People</Link>
              <Link to="/catalog/planets">Planets</Link>
              <Link to="/catalog/species">Species</Link>
              <Link to="/catalog/starships">Starships</Link>
              <Link to="/catalog/vehicles">Vehicles</Link>
            </div>
          </div>
        </li>
        <li>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </li>

        <li><button onClick={handleLogout}>Sign Out</button></li>

      </ul>
    </nav>
  );
};

export default Navbar;
