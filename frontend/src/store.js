import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import pokemonsReducer from './reducers/pokemonsReducer';
import offsetReducer from './reducers/offsetReducer';
import currentPageReducer from './reducers/currentPageReducer';
import individualPokemonReducer from './reducers/individualPokemonReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import filterReducer from './reducers/filterReducer'
import reviewsReducer from './reducers/reviewsReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
    pokemons: pokemonsReducer,
    offset: offsetReducer,
    currentPage: currentPageReducer,
    individualPokemon: individualPokemonReducer,
    login: loginReducer,
    notification: notificationReducer,
    filter: filterReducer,
    reviews: reviewsReducer,
    users: userReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;