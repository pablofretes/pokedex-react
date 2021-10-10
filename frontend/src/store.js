import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import pokemonsReducer from './reducers/pokemonsReducer';
import offsetReducer from './reducers/offsetReducer';
import limitReducer from './reducers/limitReducer';
import currentPageReducer from './reducers/currentPageReducer';
import individualPokemonReducer from './reducers/individualPokemonReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import filterReducer from './reducers/filterReducer'
import favoriteReducer from './reducers/favoriteReducer'
import reviewsReducer from './reducers/reviewsReducer';

const reducer = combineReducers({
    pokemons: pokemonsReducer,
    offset: offsetReducer,
    limit: limitReducer,
    currentPage: currentPageReducer,
    individualPokemon: individualPokemonReducer,
    login: loginReducer,
    notification: notificationReducer,
    user: userReducer,
    filter: filterReducer,
    favorite: favoriteReducer,
    reviews: reviewsReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

<<<<<<< Updated upstream
/*store.subscribe(() => {
    const storeNow = store.getState();
    console.log(storeNow);
})*/
=======
store.subscribe(() => {
    const storeNow = store.getState().pokemons;
    console.log(storeNow);
});
>>>>>>> Stashed changes

export default store;