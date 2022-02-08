import React from 'react';
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import pokedex from '../img/Pokédex_logo.png';
import pikachu from '../img/pikachu(1).png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'center'
    },
    pokedex: {
        backgroundColor: '#E5709B',
        height: 150,
        alignSelf: 'center',
        width: width,
        borderRadius: width/2 
    },
}));

const width = 250

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img className='logo' src={pokedex} alt='pokedex logo' data-testid='pokedex-logo'/>
            <Button data-cy="pokedex-pikachu" className={`pikachu-button ${classes.pokedex}`} component={Link} to="/pokemons" data-testid='pikachu-button'>
                <img  className='pikachu-img' src={pikachu} alt='imagen pikachu'/>
            </Button>
        </div>
    );
};

export default Home;