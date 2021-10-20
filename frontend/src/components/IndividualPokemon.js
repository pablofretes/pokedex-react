import React from 'react';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loading from './Loading';

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
    },
    reviewButton: {
        backgroundColor: '#c2185b',
        borderRadius: 5,
        padding: 8,
        height: 30,
        width: 100,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        alignSelf: 'center'
    },
}));

const IndividualPokemon = ({ capsFirstLetter }) => {
    const classes = useStyles();
    const history = useHistory();
    const pokemon = useSelector(state => state.individualPokemon);

    const handleReview = (p) => {
        history.push(`/reviews/${p.name}`)
    }

    const isEmpty = (obj) => {
        return obj && Object.keys(obj).length === 0;
    }

    return (
        <div>
            {isEmpty(pokemon) ? <Loading /> : 
                (<div className={classes.root}>
                    <Paper className={classes.paper} elevation={8} key={pokemon.name}>
                        {pokemon.types.map(t => <div className={classes.type}>{t.type.name.toUpperCase()}</div>)}
                        {pokemon.sprites.other["dream_world"]["front_default"] !== null ? 
                        <img className={classes.image} alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["dream_world"]["front_default"]}/> :
                        <img className={classes.image} alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["official-artwork"]["front_default"]}/>}
                        <p className={classes.text}>#{pokemon.id}</p>
                        <p className={classes.text}>{capsFirstLetter(pokemon.name)}</p>
                        {pokemon.stats.map(s => (
                            <p className={classes.text} key={s.stat.name}>{capsFirstLetter(s.stat.name)}: {s.base_stat}</p>
                        ))}
                        <Button className={classes.reviewButton} onClick={() => handleReview(pokemon)}>Review</Button>
                    </Paper>
                </div>)}
        </div>
    );
};

export default IndividualPokemon;