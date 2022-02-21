import React from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import './appbar.css';

const AppBarPokemon = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  const handleLogOut = () => {
		dispatch(logoutUser());
  }

  return (
  <nav className='nav' data-cy='navbar'>
  <div className='container-navbar'>
    <ul className='nav-list'>
    <li className='nav-item'>
      <Link to="/" data-cy='home-button' className='button-nav'>
      Home
      </Link>
    </li>
    <li>
      <Link to="/pokemons" data-cy='pokedex-button' className='button-nav'>
      Pokedex
      </Link>
      </li>
      <li>
      <Filter buttonStyle='input-button' inputStyle='filter-input'/>
      </li>
      {user !== null && <li>
      <Link to="/reviews" data-cy="reviews-button" className='button-nav'>
        Reviews
      </Link>
      </li>}
    	{user !== null ? <li>
        <Link to="/login" onClick={handleLogOut}  data-cy="logout-button" className='button-nav'>
        Log Out
        </Link>
      </li>
     	:
      <li>
        <Link  to="/login" className='button-nav' data-cy="login-button">Log In</Link>
      </li>
      }
    	{user === null && <li>
        <Link to="/signUp" className='button-nav' data-cy="signUp-button">
        Sign Up
        </Link>
      </li>
      }
    </ul>
  </div>
  </nav>
  );
}

export default AppBarPokemon;