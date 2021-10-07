import React, { useEffect } from 'react';
import PokemonsDisplay from './components/PokemonsDisplay';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AppBarPokemon from './components/AppBar';
import IndividualPokemon from './components/IndividualPokemon';
import Notification from './components/Notification';
import Favorite from './components/Favorite';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Reviews from '../src/components/Reviews';
import { fetchPokemons } from './reducers/pokemonsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { existingLogin } from './reducers/loginReducer';
import { initReviews } from './reducers/reviewsReducer';

const App = () => {
  const dispatch = useDispatch();
  const offset = useSelector(state => state.offset);
  const limit = useSelector(state => state.limit);

  useEffect(() => {
    //FETCHES 20 OBJECTS THAT CONTAIN AN URL TO AN INDIVIDUAL POKEMON
    dispatch(fetchPokemons(limit, offset));
  }, [limit, offset, dispatch]);

  useEffect(() => {
    dispatch(existingLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initReviews());
  }, [dispatch])

  const CapsFirstLetter = (str) => {
    //SOME POKEMONS' STATS ARE SEPARATED BY A '-'. THIS FUNCTION ELIMINATES IT AND CAPITALIZES THE FIRST LETTER OF EACH WORD.
    let toCapitalize = str.split(/-/);

    for (let i = 0; i < toCapitalize.length; i++) {
      toCapitalize[i] = toCapitalize[i][0].toUpperCase() + toCapitalize[i].substr(1);
    };

    const joined = toCapitalize.join(' ');

    return joined;
  };

  return (
    <div style={{ backgroundColor: '#222222' }}>
      <Notification />
      <AppBarPokemon />
      <Switch>
        <Route path="/pokemons/:name">
          <IndividualPokemon CapsFirstLetter={CapsFirstLetter}/>
        </Route>
        <Route path="/pokemons">
          <PokemonsDisplay CapsFirstLetter={CapsFirstLetter}/>
        </Route>
        <Route path="/favorite">
          <Favorite CapsFirstLetter={CapsFirstLetter}/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
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
