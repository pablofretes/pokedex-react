import filterReducer from '../reducers/filterReducer';
import '@testing-library/jest-dom/extend-expect';

describe('filter reducer', () => {

    it('should return the initial state', () => {
        expect(filterReducer(undefined, {})).toEqual('');
    });

    it('should handle SET_FILTER', () => {
        const action = {
            type: 'SET_FILTER',
            data: 'blue',
        };

        expect(filterReducer('', action)).toEqual('blue');
    });
});