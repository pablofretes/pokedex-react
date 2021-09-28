import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    type: {
        height: 25,
        fontSize: 18,
        fontFamily: 'Roboto, monospace',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#c2185b',
        borderRadius: 60,
        marginBottom: 9
    }
}))

const Favorite = ({ pokemon, CapsFirstLetter }) => {
    const classes = useStyles();
    return (
        <div>
            <p>Your Favorite Pokémon Is:</p>
            <img src={pokemon.sprites["front_default"]} alt={`${pokemon.name}'s sprite`}></img>
            <div>
                {pokemon.types.map(t => <div className={classes.type}>{t.type.name.toUpperCase()}</div>)}
                <p>Abilities: {pokemon.abilities.map(a => <p>{CapsFirstLetter(a.ability.name)}</p>)}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
};

export default Favorite;