import React, { useEffect } from 'react';
import PokemonsDisplay from './components/pokemonsDisplay/PokemonsDisplay';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import AppBarPokemon from './components/AppBar';
import IndividualPokemon from './components/individualPokemon/IndividualPokemon';
import Notification from './components/Notification';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Reviews from '../src/components/reviews/Reviews';
import { fetchEverything } from './reducers/pokemonsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { existingLogin } from './reducers/loginReducer';
import './App.css';
import NewReview from './components/newReview/NewReview';
import { initReviews } from './reducers/reviewsReducer';

const App = () => {
  const dispatch = useDispatch();
  const offset = useSelector(state => state.offset);
  
  useEffect(() => {
    //FETCHES 20 OBJECTS THAT CONTAIN AN URL TO AN INDIVIDUAL POKEMON
    fetchEverything(offset, dispatch)
  }, [offset, dispatch]);

  useEffect(() => {
    dispatch(existingLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initReviews());
  }, [dispatch]);

  return (
    <div >
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
