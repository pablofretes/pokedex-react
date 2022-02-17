import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import getPokemons from '../services/pokemons';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';
import { notificationError } from '../reducers/notificationReducer';
import { setFilter } from '../reducers/filterReducer';

const useStyles = makeStyles((theme) => ({
  filter: {
    fontFamily: 'Cairo',
    fontWeight: 'bolder',
    width: 100
  }
}))

const Filter = () => {
  const classes = useStyles();
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
        }
      } catch (error) {
        //IF IT FAILS WE SHOW THAT IN A NOTIFICATION AND THEN RETURN NULL SO NOTHING ELSE HAPPENS
        console.error(error);
        dispatch(notificationError('That pokémon doesnt exist! Try Again!'));
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
      <form onSubmit={handleChange}>
        <input placeholder='Search...' name="filterInput" data-cy="searchBar" className={classes.filter} />
        <Button type="submit" data-cy="searchBar-button" className='button' >Search</Button>
      </form>
    </div>
  );
};

export default Filter;