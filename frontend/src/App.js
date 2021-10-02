import React, { useState, useEffect } from 'react';
import PokemonsDisplay from './components/PokemonsDisplay';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from './components/Home';
import AppBarPokemon from './components/AppBar';
import getPokemons from './services/pokemons';
import IndividualPokemon from './components/IndividualPokemon';
import ErrorNotification from './components/ErrorNotification';
import axios from 'axios';
import Favorite from './components/Favorite';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';

const pageSize = 20;
const totalCount = 898;

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemon, setPokemon] = useState({});
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchPokemons = async () => {
          //FETCHES 20 OBJECTS THAT CONTAIN AN URL TO AN INDIVIDUAL POKEMON
          const results = await getPokemons.getPokemons(limit, offset);
          let urlArray = [];
          results.results.forEach(async (r) => {
              //FETCHES EACH POKEMON URL AND STORES ITS DATA ON pokemons STATE
              const pokemonNow = await axios.get(r.url);
              urlArray.push(pokemonNow.data);
              if(urlArray.length > 0){
                  setPokemons([...urlArray]);
              };
          });
      }
      fetchPokemons();
  }, [offset, limit]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser){
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, [])

  const CapsFirstLetter = (str) => {
    let toCapitalize = str.split(/-/);

    for (let i = 0; i < toCapitalize.length; i++) {
      toCapitalize[i] = toCapitalize[i][0].toUpperCase() + toCapitalize[i].substr(1);
    };

    const joined = toCapitalize.join(' ');

    return joined;
  };

  const handleChange = (pageNumber) => {
    
    if(pageNumber === 45){
        setLimit(18);
    }
    if(pageNumber !== 45){
        setLimit(20)
    }
    const page = (pageNumber*20) - 20;
    setOffset(page);
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    const page = ((currentPage + 1) * 20) - 20;
    setOffset(page);
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    const page = ((currentPage - 1) * 20) - 20;
    setOffset(page);
    setCurrentPage(currentPage - 1);
  };

  const handleSelect = (event) => {
    const page = event.target.value;
    const offsetPage = (page * 20) - 20;
    setOffset(offsetPage);
  }

  const match = useRouteMatch('/pokemons/:name');
  const pokemonMatch = match ? pokemons.find(p => p.name === match.params.name) : null;
  console.log(pokemonMatch); 

  return (
    <div style={{ backgroundColor: '#222222' }}>
      {error && <ErrorNotification error={error}/>}
      <AppBarPokemon setPokemon={setPokemon} setError={setError} user={user} setUser={setUser}/>
      <Switch>
        <Route path="/pokemons/:name">
          <IndividualPokemon pokemon={pokemonMatch} CapsFirstLetter={CapsFirstLetter}/>
        </Route>
        <Route path="/search/:name">
          <IndividualPokemon pokemon={pokemon} CapsFirstLetter={CapsFirstLetter}/>
        </Route>
        <Route path="/pokemons">
          <PokemonsDisplay 
            pokemons={pokemons} 
            CapsFirstLetter={CapsFirstLetter} 
            currentPage={currentPage}
            totalCount={totalCount} 
            pageSize={pageSize}
            onPageChange={page => handleChange(page)}
            onNext={onNext}
            onPrevious={onPrevious}
            handleSelect={handleSelect}
          />
        </Route>
        <Route path="/favorite">
          <Favorite CapsFirstLetter={CapsFirstLetter} setError={setError} route="favorite"/>
        </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>
        <Route path="/signUp">
          <SignUp setUser={setUser}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
