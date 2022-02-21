import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePokemon } from '../../reducers/individualPokemonReducer';
import axios from 'axios';
import Loading from '../loading/Loading';
import { capsFirstLetter } from '../../utils/functions';
import './pokemonsDisplay.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Cairo, monospace',
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

  const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    ghost: '#5c6cac',
    ice: '#98D8D8',
    steel: '#787887',
    dark: '#705746'
  };

  return (
    <div className='display-pokemons'>
        {pokemons.length < 18 ? <Loading /> : 
        (
          <Grid container spacing={3}>
            {pokemons.sort((a,b) => a.id - b.id).map((p) => (
          <Grid 
						item 
						xs={3} 
						key={p.name} 
						style={{ textDecoration: 'none' } } 
						component={Link} 
						onClick={() => handleClick(p)} 
						to={`/pokemons/${p.name}`} 
						data-cy={`pokemon-button-${p.name}`}>
              <Paper className={classes.paper} style={{ backgroundColor: colors[p.types[0].type.name] } }>
                <p className={`text-display ${classes.text}`}>{capsFirstLetter(p.name)}</p>
                <img className='image' alt={`${p.name}'s sprite`} src={p.sprites.other["official-artwork"]["front_default"]}/>
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