import React from 'react';
import { Link } from 'react-router-dom';
import pikachu from '../../img/pikachu(1).png';
import Filter from '../Filter';
import './home.css'

const Home = () => {
  return (
    <div className='home-root'>
				<Link className='pokedex-container-inside' to="/pokemons">
					<p className='text-pokedex-link'>POKEDEX</p>
					<div data-cy="pokedex-pikachu" className='pikachu-button' data-testid='pikachu-button'>
						<img  className='pikachu-img' src={pikachu} alt='imagen pikachu'/>
					</div>
				</Link>
				<div className='filter-container-inside'>
					<p className='text-pokedex-link'>SEARCH BAR</p>
					<div className='filter-center'>
						<Filter buttonStyle='filter-button-home' inputStyle='filter-input-home' />
					</div>
				</div>
    </div>
  );
};

export default Home;