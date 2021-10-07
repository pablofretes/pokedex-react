import reviewsService from '../services/reviews';

const reviewsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_REVIEWS':
            return action.data;
        case 'NEW_REVIEW':
            return [...state, action.data];
        case 'DELETE_REVIEW':
            return state.filter(r => r.id !== action.data.id);
        default:
            return state;
    };
};

export const initReviews = () => {
    return async dispatch => {
        const reviews = await reviewsService.getAll();
        dispatch({
            type: 'INIT_REVIEWS',
            data: reviews,
        });
    };
};

export const newReview = (content) => {
    return async dispatch => {
        const review = await reviewsService.create(content);
        dispatch({
            type: 'NEW_REVIEW',
            data: review,
        });
    };
};

export const deleteReview = (review) => {
    return async dispatch => {
        await reviewsService.deleteReview(review.id);
        dispatch({
            type: 'DELETE_REVIEW',
            data: review
        });
    };
};

export default reviewsReducer;