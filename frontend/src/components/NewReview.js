import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const NewReview = () => {
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        const review = event.reviewInput;
        dispatch(NewReview(review));
    };

    return (
        <form onSubmit={onSubmit}>
            <input name="reviewInput" placeholder="Write a Review!"/>
            <Button name="review-button" type="submit">Post Review</Button>
        </form>
    );
};

export default NewReview;