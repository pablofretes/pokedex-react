import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import getPokemons from '../services/pokemons';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';
import { notificationError } from '../reducers/notificationReducer';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ buttonStyle, inputStyle }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      try {
        if(filter){
          //IF THE FILTER STATE CHANGES WE WILL ATTEMP TO GET THAT POKEMON FROM pokeapi.co AND IF IT SUCCEEDS THEN WE REDIRECT TO THAT POKEMON
          const searchedPokemon = await getPokemons.getPokemonByName(filter);
          dispatch(getOnePokemon(searchedPokemon));
          if(searchedPokemon.name === filter){
            history.push(`/pokemons/${searchedPokemon.name}`);
          };
					dispatch(setFilter(''));
        }
      } catch (error) {
        //IF IT FAILS WE SHOW THAT IN A NOTIFICATION AND THEN RETURN NULL SO NOTHING ELSE HAPPENS
        console.error(error);
        dispatch(notificationError('That pokémon doesnt exist! Try Again!'));
				dispatch(setFilter(''));
        return null;
      }
    } 
    fetch();
  }, [filter, dispatch, history])

  const handleChange = async (event) => {
    //WE DISPATCH A NEW FILTER STATE ONLY IF THE SEARCH BUTTON IS CLICKED
    event.preventDefault();
    const pokemon = event.target.filterInput.value;
    const lowercasePokemon = pokemon.toLowerCase();
    dispatch(setFilter(lowercasePokemon));
  };

  return (
    <div>
      <form className='filter-form' onSubmit={handleChange}>
        <input placeholder='Search...' name="filterInput" data-cy="searchBar" className={inputStyle} />
        <button type="submit" data-cy="searchBar-button" className={buttonStyle} >Search</button>
      </form>
    </div>
  );
};

export default Filter;