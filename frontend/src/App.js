import React, { useEffect } from 'react';
import PokemonsDisplay from './components/PokemonsDisplay';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AppBarPokemon from './components/AppBar';
import IndividualPokemon from './components/IndividualPokemon';
import Notification from './components/Notification';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Reviews from '../src/components/Reviews';
import { fetchEverything } from './reducers/pokemonsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { existingLogin } from './reducers/loginReducer';
import './App.css'
import NewReview from './components/NewReview';
import { initReviews } from './reducers/reviewsReducer';

const App = () => {
  const dispatch = useDispatch();
  const offset = useSelector(state => state.offset);
  const limit = useSelector(state => state.limit);
  
  useEffect(() => {
    //FETCHES 20 OBJECTS THAT CONTAIN AN URL TO AN INDIVIDUAL POKEMON
    fetchEverything(limit, offset, dispatch)
  }, [limit, offset, dispatch]);

  useEffect(() => {
    dispatch(existingLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initReviews());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#222222' }}>
      <Notification />
      <AppBarPokemon />
      <Switch>
        <Route path="/pokemons/:name">
          <IndividualPokemon/>
        </Route>
        <Route path="/pokemons">
          <PokemonsDisplay/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/reviews/edit/:id">
          <NewReview/>
        </Route>
        <Route path="/reviews/:name">
          <NewReview/>
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
