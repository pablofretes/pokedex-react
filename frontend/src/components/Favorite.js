import React from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

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

<<<<<<< Updated upstream:frontend/src/components/Favorite.js
const Favorite = ({ CapsFirstLetter }) => {
=======
<<<<<<< Updated upstream:src/components/Favorite.js
const Favorite = ({ CapsFirstLetter, setError, route }) => {
=======
const Favorite = ({ capsFirstLetter }) => {
>>>>>>> Stashed changes:frontend/src/components/Favorite.js
>>>>>>> Stashed changes:src/components/Favorite.js
    const classes = useStyles();
    const favorite = useSelector(state => state.favorite);
    console.log(favorite);

    const isEmpty = (obj) => {
        return obj && Object.keys(obj).length === 0;
    }

    if(isEmpty(favorite)){
        return (
            <div>
                <p>You don't have a favorite pokémon right now! Please pick One!</p>
            </div>

        )
    };

    return (
        <div>
            {!isEmpty(favorite) && 
                <div>
                    <p className={classes.text}>Your Favorite Pokémon Is:</p>
                    
                    <Paper className={classes.paper}>
<<<<<<< Updated upstream:frontend/src/components/Favorite.js
                        <img src={favorite.sprites.other["official-artwork"]["front_default"]} alt={`${favorite.name}'s sprite`} className={classes.image}></img>
                        {favorite.types.map(t => <div className={classes.type} key={t.type.name}>{t.type.name.toUpperCase()}</div>)}
                        <div className={classes.abilities}>Abilities: {favorite.abilities.map(a => <Grid xs={3} key={a.ability.name} className={classes.text}>{CapsFirstLetter(a.ability.name)}</Grid>)}</div>
                        <p className={classes.text}>Height: {favorite.height}</p>
                        <p className={classes.text}>Weight: {favorite.weight}</p>
=======
<<<<<<< Updated upstream:src/components/Favorite.js
                        <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`${pokemon.name}'s sprite`} className={classes.image}></img>
                        {pokemon.types.map(t => <div className={classes.type} key={t.type.name}>{t.type.name.toUpperCase()}</div>)}
                        <div className={classes.abilities}>Abilities: {pokemon.abilities.map(a => <Grid xs={3} key={a.ability.name} className={classes.text}>{CapsFirstLetter(a.ability.name)}</Grid>)}</div>
                        <p className={classes.text}>Height: {pokemon.height}</p>
                        <p className={classes.text}>Weight: {pokemon.weight}</p>
=======
                        <img src={favorite.sprites.other["official-artwork"]["front_default"]} alt={`${favorite.name}'s sprite`} className={classes.image}></img>
                        {favorite.types.map(t => <div className={classes.type} key={t.type.name}>{t.type.name.toUpperCase()}</div>)}
                        <div className={classes.abilities}>Abilities: {favorite.abilities.map(a => <Grid xs={3} key={a.ability.name} className={classes.text}>{capsFirstLetter(a.ability.name)}</Grid>)}</div>
                        <p className={classes.text}>Height: {favorite.height}</p>
                        <p className={classes.text}>Weight: {favorite.weight}</p>
>>>>>>> Stashed changes:frontend/src/components/Favorite.js
>>>>>>> Stashed changes:src/components/Favorite.js
                        <p className={classes.text}>If you want to pick a new favorite Pokémon, use this search bar!</p>
                    </Paper>
                </div>
            }
        </div>
    );
};

export default Favorite;