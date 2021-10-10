import React from 'react';
import { Button, makeStyles, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

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
  },
  button: {
    marginLeft: "auto"
  }
}))

const AppBarPokemon = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.login);

  const handleLogOut = () => {
    dispatch(logoutUser);
  }

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
          <Filter route='pokemons'/>
          <Button color="inherit" component={Link} to="/favorite" data-cy="favorite-button">
            Favorite
          </Button>
          {user !== null ? (
            <div>
              <Button onClick={handleLogOut} color="inherit" to="/login" data-cy="logout-button" component={Link} className="logout-button">
                Log Out
              </Button>
              <Button color="inherit" component={Link} to="/reviews" data-cy="reviews-button">Reviews</Button>
            </div>
          ) : (
            <div>
              <Button className={classes.button} color="inherit" component={Link} to="/login" data-cy="login-button">Log In</Button>
              <Button className={classes.button} color="inherit" component={Link} to="/signUp" data-cy="signUp-button">Sign Up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarPokemon;