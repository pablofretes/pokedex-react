import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';
import axios from 'axios';
import Loading from './Loading';
import { capsFirstLetter } from '../utils/functions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backGroundColor: '#222222'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    image: {
        width: 100,
        height: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    gridItem : {
        textDecoration: 'none',
        justifyContent: 'center'
    },
    color: {
        backgroundColor: '#E5709B',
    },
    p: {
        textAlign: 'center',
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold'
    }
}));

const PokemonsDisplay = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const pokemonsObject = useSelector(state => state.pokemons);
    const pageSize = 20;
    const totalCount = pokemonsObject.count;
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const awaitingPokemons = async () => {
            //THIS FUNCTION GETS EVERY POKEMON ON OUR pokemons STORE AND PUSHES THEM TO A REACT STATE.
            //EVERY TIME OUR pokemons STORE CHANGES THIS FUNCTION RUNS FETCHES THE NEW POKEMMONS ONCE AGAIN
            let urlArray = [];

            pokemonsObject.results.forEach(async (r) => {
                const pokemonNow = await axios.get(r.url);
                urlArray.push(pokemonNow.data);
                if(urlArray.length > 0){
                    setPokemons([...urlArray]);
                };
            });
        };
        awaitingPokemons();
    }, [pokemonsObject]);

    const handleClick = (p) => {
        //IF A POKEMON IS CLICKED WE STORE IT INTO OUR individualPokemon STORE
        dispatch(getOnePokemon(p));
    };

    return (
        <div className={classes.root}>
                {pokemons.length < 18 ? <Loading /> : 
                (
                    <Grid container spacing={3}>
                        {pokemons.map((p) => (
                    <Grid item xs={3} key={p.name} className={classes.gridItem} component={Link} onClick={() => handleClick(p)} to={`/pokemons/${p.name}`} data-cy={`pokemon-button-${p.name}`}>
                            <Paper className={classes.paper && classes.color} elevation={10}>
                                <p className={classes.p}>#{p.id}</p>
                                <p className={classes.p}>{capsFirstLetter(p.name)}</p>
                                <img className={classes.image} alt={`${p.name}'s sprite`} src={p.sprites.other["official-artwork"]["front_default"]}/>
                            </Paper>
                    </Grid>
                ))}
                    </Grid>
                )}
            <Pagination
                totalCount={totalCount} 
                pageSize={pageSize}
            />
        </div>
    );
};

export default PokemonsDisplay;