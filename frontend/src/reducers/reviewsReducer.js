import reviewsService from '../services/reviews';

const reviewsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_REVIEWS':
            return action.data;
        case 'NEW_REVIEW':
            return [...state, action.data];
        case 'DELETE_REVIEW':
            return state.filter(r => r.id !== action.data.id);
        case 'EDIT_REVIEW': {
            //PLANNING TO ADD A WAY TO EDIT REVIEWS
            const id = action.data.id
            const reviewToEdit = state.find(r => r.id === id)
            const editedReview = {
                ...reviewToEdit,
                content: reviewToEdit.content,
                rating: reviewToEdit.rating
            };
            return state.map(r => r.id === id ? editedReview : r);
        };
        default:
            return state;
    };
};

export const initReviews = () => {
    return async dispatch => {
        try {
            const reviews = await reviewsService.getAll();
            dispatch({
                type: 'INIT_REVIEWS',
                data: reviews,
            });
        } catch (error) {
            console.error(error);
            return null;
        }

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

//PLANNING TO ADD A WAY TO EDIT REVIEW LATER ON
export const editReview = (id, content) => {
    return async dispatch => {
        const editedReview = await reviewsService.editReview(id, content);
        dispatch({
            type: 'EDIT_REVIEW',
            data: editedReview,
        });
    };
};

export default reviewsReducer;