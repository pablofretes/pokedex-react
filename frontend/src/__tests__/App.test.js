import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import * as reactRedux from 'react-redux';
import thunk from 'redux-thunk';

const middlewares = [thunk]

const mockStore = configureStore(middlewares);

describe('App', () => {
    let store;
    let component;
    const history = createMemoryHistory();
    const mockDispatch = jest.fn();
    const mockEffect = jest.fn();

    beforeEach(async () => {
        store = mockStore({
            myState: {
                pokemons: [],
                limit: 20,
                offset: 0,
                user: {
                    username: 'testing22222',
                    password: 'secret123333',
                    name: 'testtest'
                }
            },
        });
        reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
        React.useEffect = jest.fn().mockImplementation(() => mockEffect)

        component = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );
    });

    it('should load pokemons on load', () => {
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    })
});