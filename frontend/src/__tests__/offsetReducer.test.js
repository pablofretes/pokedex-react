import offsetReducer from '../reducers/offsetReducer';
import '@testing-library/jest-dom/extend-expect';

describe('offset reducer', () => {

    it('should return the initial state', () => {
        expect(offsetReducer(undefined, {})).toEqual(0);
    });

    it('should handle OFFSET', () => {
        const action = {
            type: 'OFFSET',
            data: 15,
        };

        expect(offsetReducer(0, action)).toEqual(15);
    });
});