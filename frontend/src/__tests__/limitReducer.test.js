import limitReducer from '../reducers/limitReducer';
import '@testing-library/jest-dom/extend-expect';

describe('limit reducer', () => {

    it('should return the initial state', () => {
        expect(limitReducer(undefined, {})).toEqual(20);
    });

    it('if limit is not 18 state must be 20', () => {
        const action = {
            type: 'LIMIT',
            data: 15,
        };

        expect(limitReducer(20, action)).toEqual(20);
    });

    it('if limit is 18, state must be 18', () => {
        const action = {
            type: 'LIMIT',
            data: 18
        };

        expect(limitReducer(20, action)).toEqual(18);
    });
});