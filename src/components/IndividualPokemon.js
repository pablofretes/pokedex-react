import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

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
        marginBottom: 9
    }
}));

const IndividualPokemon = ({ pokemon, CapsFirstLetter }) => {
    const classes = useStyles();
    
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    if(isEmpty(pokemon)){
        return null;
    };

    console.log(pokemon);
    return (
        <div className={classes.root}>
                <Paper className={classes.paper} elevation={8}>
                    {pokemon.types.map(t => <div className={classes.type}>{t.type.name.toUpperCase()}</div>)}
                    {pokemon.sprites.other["dream_world"]["front_default"] !== null ? 
                    <img className={classes.image} alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["dream_world"]["front_default"]}/> :
                    <img className={classes.image} alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["official-artwork"]["front_default"]}/>}
                    <p className={classes.text}>#{pokemon.id}</p>
                    <p className={classes.text}>{CapsFirstLetter(pokemon.name)}</p>
                    {pokemon.stats.map(s => (
                        <p className={classes.text} key={s.stat.name}>{CapsFirstLetter(s.stat.name)}: {s.base_stat}</p>
                    ))}
                </Paper>
        </div>
    );
};

export default IndividualPokemon;