import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import getPokemons from '../services/pokemons';
import { Button } from '@material-ui/core';

const Filter = ({ setPokemon, setError, route }) => {
    const [filter, setFilter] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetch = async () => {
            try {
                if(filter){
                    const searchedPokemon = await getPokemons.getPokemonByName(filter);
                    console.log(searchedPokemon);
                    setPokemon(searchedPokemon);
                    if(searchedPokemon.name === filter){
                        history.push(`/${route}/${searchedPokemon.name}`);
                    };
                }
            } catch (error) {
                console.log(error);
                setError('That pokémon doesnt exist! Try Again!');
                setTimeout(() => {
                    setError(null);
                }, 3500)
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
        setFilter(lowercasePokemon);
    };//

    return (
        <div>
            <form onSubmit={handleChange}>
                <input placeholder='Search...' name="filterInput"/>
                <Button type="submit" >Search</Button>
            </form>
        </div>
    );
};

export default Filter;