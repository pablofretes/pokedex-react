import React, { useState } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import Filter from './Filter';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#222222',
        justifyContent: 'center',
        padding: 10
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#E5709B',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    image: {
        width: 280,
        height: 'auto',
        alignSelf: 'flex-start',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
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
        marginBottom: 9,
    },
    abilities: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    }
}))

const Favorite = ({ CapsFirstLetter, setError, route }) => {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState({});

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    if(isEmpty(pokemon)){
        return (
            <div>
                <p>You don't have a favorite pokémon right now! Please pick One!</p>
                <Filter setPokemon={setPokemon} setError={setError} route={route}/>
            </div>

        )
    };

    return (
        <div>
            {!isEmpty(pokemon) && 
                <div>
                    <p className={classes.text}>Your Favorite Pokémon Is:</p>
                    
                    <Paper className={classes.paper}>
                        <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`${pokemon.name}'s sprite`} className={classes.image}></img>
                        {pokemon.types.map(t => <div className={classes.type} key={t.type.name}>{t.type.name.toUpperCase()}</div>)}
                        <div className={classes.abilities}>Abilities: {pokemon.abilities.map(a => <Grid xs={3} key={a.ability.name} className={classes.text}>{CapsFirstLetter(a.ability.name)}</Grid>)}</div>
                        <p className={classes.text}>Height: {pokemon.height}</p>
                        <p className={classes.text}>Weight: {pokemon.weight}</p>
                        <p className={classes.text}>If you want to pick a new favorite Pokémon, use this search bar!</p>
                        <Filter setPokemon={setPokemon} setError={setError} route={route}/>
                    </Paper>
                </div>
            }
        </div>
    );
};

export default Favorite;