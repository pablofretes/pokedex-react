import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

describe('<Pagination />', () => {
    let component
    const history = createMemoryHistory();

    beforeAll(() => {
        component = render(
            <Router history={history}>
                <Pagination />
            </Router>
        );
    });
})