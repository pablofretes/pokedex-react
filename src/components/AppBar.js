import React from 'react';
import { Button, makeStyles, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Filter from './Filter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  filter: {
    position: 'absolute',
    top: 95,
    right: 50,
    width: '100%',
  }
}))

const AppBarPokemon = ({ setPokemon, pokemon, setError }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
              <Button color="inherit" component={Link} to="/" data-cy='home-button'>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/pokemons" data-cy='pokedex-button'>
                Pokedex
              </Button>
          </Typography>
        </Toolbar>
        <Toolbar variant="dense">
          <Filter setPokemon={setPokemon} setError={setError} route="search"/>
          <Button color="inherit" component={Link} to="/favorite" data-cy="favorite-button">
            Favorite
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarPokemon;