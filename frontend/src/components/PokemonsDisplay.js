import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';
import axios from 'axios';
import Loading from './Loading';

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

const PokemonsDisplay = ({ capsFirstLetter }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const pokemonsArray = useSelector(state => state.pokemons);
    const pageSize = 20;
    const totalCount = 898;
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const awaitingPokemons = async () => {
            let urlArray = [];
            pokemonsArray.forEach(async (r) => {
                const pokemonNow = await axios.get(r.url);
                urlArray.push(pokemonNow.data);
                if(urlArray.length > 0){
                    setPokemons([...urlArray]);
                }
            });
        };
        awaitingPokemons();
    }, [pokemonsArray]);

    const handleClick = (p) => {
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