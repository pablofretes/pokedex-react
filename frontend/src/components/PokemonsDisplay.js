import React from 'react';
import Pagination from './Pagination';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePokemon } from '../reducers/individualPokemonReducer';

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

<<<<<<< Updated upstream:frontend/src/components/PokemonsDisplay.js
const PokemonsDisplay = ({ CapsFirstLetter }) => {
    const dispatch = useDispatch();
=======
<<<<<<< Updated upstream:src/components/PokemonsDisplay.js
const PokemonsDisplay = ({ pokemons, CapsFirstLetter, onNext, onPrevious, currentPage, totalCount, pageSize, onPageChange, handleSelect }) => {
=======
const PokemonsDisplay = ({ capsFirstLetter }) => {
    const dispatch = useDispatch();
>>>>>>> Stashed changes:frontend/src/components/PokemonsDisplay.js
>>>>>>> Stashed changes:src/components/PokemonsDisplay.js
    const classes = useStyles();
    const pokemons = useSelector(state => state.pokemons);
    console.log(pokemons);
<<<<<<< Updated upstream:frontend/src/components/PokemonsDisplay.js
=======
<<<<<<< Updated upstream:src/components/PokemonsDisplay.js
=======
>>>>>>> Stashed changes:src/components/PokemonsDisplay.js
    const pageSize = 20;
    const totalCount = 898;

    const handleClick = (p) => {
<<<<<<< Updated upstream:frontend/src/components/PokemonsDisplay.js
        dispatch(getOnePokemon(p))
    };
=======
        dispatch(getOnePokemon(p));
    };
>>>>>>> Stashed changes:frontend/src/components/PokemonsDisplay.js
>>>>>>> Stashed changes:src/components/PokemonsDisplay.js

    return (
        <div className={classes.root}>
                {pokemons && (
                    <Grid container spacing={3}>
                        {pokemons.map(p => (
                    <Grid item xs={3} key={p.name} className={classes.gridItem} component={Link} onClick={() => handleClick(p)} to={`/pokemons/${p.name}`} data-cy={`pokemon-button-${p.name}`}>
                            <Paper className={classes.paper && classes.color} elevation={10}>
                                <p className={classes.p}>#{p.id}</p>
                                <p className={classes.p}>{capsFirstLetter(p.name)}</p>
                                {p.sprites.other["dream_world"]["front_default"] !== null ? 
                                <img className={classes.image} alt={`${p.name}'s sprite`} src={p.sprites.other["dream_world"]["front_default"]}/> : 
                                <img className={classes.image} alt={`${p.name}'s sprite`} src={p.sprites.other["official-artwork"]["front_default"]}/>}
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