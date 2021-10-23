import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import getPokemons from '../services/pokemons';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';
import { notificationError } from '../reducers/notificationReducer';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ route }) => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const history = useHistory();

    useEffect(() => {
        const fetch = async () => {
            try {
                if(filter){
                    const searchedPokemon = await getPokemons.getPokemonByName(filter);
                    console.log(searchedPokemon);
                    dispatch(getOnePokemon(searchedPokemon));
                    if(searchedPokemon.name === filter){
                        history.push(`/${route}/${searchedPokemon.name}`);
                    };
                }
            } catch (error) {
                console.log(error);
                dispatch(notificationError('That pokémon doesnt exist! Try Again!'));
                return null;
            }
        } 
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    const handleChange = async (event) => {
        event.preventDefault();
        console.log(event.target.filterInput.value)
        const pokemon = event.target.filterInput.value;
        const lowercasePokemon = pokemon.toLowerCase();
        dispatch(setFilter(lowercasePokemon));
    };

    return (
        <div>
            <form onSubmit={handleChange}>
                <input placeholder='Search...' name="filterInput" data-cy="searchBar"/>
                <Button type="submit" data-cy="searchBar-button">Search</Button>
            </form>
        </div>
    );
};

export default Filter;