import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import pokemonsReducer from './reducers/pokemonsReducer';
import offsetReducer from './reducers/offsetReducer';
import limitReducer from './reducers/limitReducer';
import currentPageReducer from './reducers/currentPageReducer';
import individualPokemonReducer from './reducers/individualPokemonReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
    pokemons: pokemonsReducer,
    offset: offsetReducer,
    limit: limitReducer,
    currentPage: currentPageReducer,
    individualPokemon: individualPokemonReducer,
    user: userReducer,
    notification: notificationReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    const storeNow = store.getState();
    console.log(storeNow);
})

export default store;