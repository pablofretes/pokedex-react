import reviewsReducer from '../reducers/reviewsReducer';
import '@testing-library/jest-dom/extend-expect';

const allReviews = [
    {
        content: 'test1',
        pokemon: { name: 'bulbasaur', sprite: '' },
        rating: 10,
        id: 1,
    },
    {
        content: 'test2',
        pokemon: { name: 'squirtle', sprite: '' },
        rating: 60,
        id: 2,
    },
];

const review = {
    content: 'this is a test review',
    pokemon: { name: '', sprite: '' },
    rating: 50,
    id: 3,
};

const newAllReviews = [...allReviews, review];

describe('reviews reducer', () => {

    it('should return the initial state', () => {
        expect(reviewsReducer(undefined, {})).toEqual([]);
    });

    it('should handle INIT_REVIEWS', () => {
        const action = {
            type: 'INIT_REVIEWS',
            data: allReviews
        };

        expect(reviewsReducer({}, action)).toEqual(allReviews);
    });

    it('should handle NEW_REVIEW', () => {
        const action = {
            type: 'NEW_REVIEW',
            data: review
        };

        expect(reviewsReducer(allReviews, action)).toEqual(newAllReviews);
    });

    it('should handle DELETE_REVIEW', () => {
        const action = {
            type: 'DELETE_REVIEW',
            data: review
        };

        expect(reviewsReducer(newAllReviews, action)).toEqual(allReviews);
    });
});