import React from 'react';
import { Button, makeStyles, AppBar, Toolbar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  button: {
    fontFamily: 'Cairo',
    fontWeight: 'bolder'
  },
  filter: {
    position: 'absolute',
    top: 95,
    right: 50,
    width: '100%',
  }
}))

const AppBarPokemon = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.login);

  const handleLogOut = () => {
    dispatch(logoutUser());
  }

  return (
    <Box sx={{ flexGrow: 1 } }>
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense" className={classes.toolBar}>
          <Button color="inherit" component={Link} to="/" data-cy='home-button' className={classes.button}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/pokemons" data-cy='pokedex-button' className={classes.button}>
            Pokedex
          </Button>
          <Filter />
          {user !== null && <Button color="inherit" component={Link} to="/reviews" data-cy="reviews-button" className={classes.button}>Reviews</Button>}
          {user !== null ? (
            <Button onClick={handleLogOut} color="inherit" to="/login" data-cy="logout-button" component={Link} className={`logout-button ${classes.button}`}>
              Log Out
            </Button>
          ) : (
            <Button className={classes.button} color="inherit" component={Link} to="/login" data-cy="login-button">Log In</Button>
          )}
          {user === null && <Button className={classes.button} color="inherit" component={Link} to="/signUp" data-cy="signUp-button">Sign Up</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarPokemon;