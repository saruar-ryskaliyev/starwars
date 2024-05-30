import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav>
      <ul>
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
          <form>
            <input type="text" placeholder="Search..." />
          </form>
        </li>
        <li><button className="signout-button" onClick={handleSignout}>Signout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
