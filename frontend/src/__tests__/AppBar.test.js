import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AppBar from '../components/AppBar';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import * as reactRedux from 'react-redux';
import { setUser } from '../reducers/userReducer';

const mockStore = configureStore([]);

describe('AppBar with user logged in', () => {
    let store;
    let component;
    const history = createMemoryHistory();
    const mockDispatch = jest.fn();

    beforeEach(async () => {
        store = mockStore({
            myState: {
                user: {
                    username: 'testing1234',
                    password: 'secret1234',
                    name: 'testtest'
                }
            },
        });
        reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);

        component = render(
            <Provider store={store}>
                <Router history={history}>
                    <AppBar />
                </Router>
            </Provider>
        );
    });

    it('buttons are defined', () => {
        const logout = component.getByText('Log Out');
        const home = component.getByText('Home');
        const pokedex = component.getByText('Pokedex');
        const favorite = component.getByText('Favorite');

        expect(logout).toBeDefined();
        expect(home).toBeDefined();
        expect(pokedex).toBeDefined();
        expect(favorite).toBeDefined();
    })

    it('should dispatch an action on logout button click', () => {
        const logout = component.getByText('Log Out');
        fireEvent.click(logout)
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(
          setUser(null)
        );
    });
});