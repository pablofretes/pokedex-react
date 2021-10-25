import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { deleteReview } from '../reducers/reviewsReducer';
import { capsFirstLetter } from '../utils/functions';
import { notificationSuccess } from '../reducers/notificationReducer';

const useStyles = makeStyles(() => ({
    noReviews: {
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
        width: 450,
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: '#E5709B',
        borderRadius: 30,
        marginTop: 100,
        borderStyle: 'solid',
        borderColor: '#c2185b'
    },
    reviewContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 'auto',
        width: 400,
        backgroundColor: '#E5709B',
        borderRadius: 30,
        marginTop: 10,
        borderStyle: 'solid',
        borderColor: '#c2185b'
    },
    parent:{
        fontFamily: 'Roboto, monospace',
        fontSize: 15,
        textAlign: 'center',
        width: 250
    },
    text: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        fontFamily: 'Roboto, monospace',
    },
    ratingContainerStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderStyle: 'solid',
        color: '#c2185b',
        borderColor: '#c2185b',
        marginTop: 10,
        marginLeft: 5
    },
    contentStyle: {
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    image: {
        height: 125,
        width: 'auto',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 7,
    },
    delete: {
        backgroundColor: '#c2185b',
        borderRadius: 5,
        padding: 8,
        height: 30,
        width: 100,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        alignSelf: 'center'
    },
    parent2:{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        position: 'relative',
        float: 'right'
    }
}))

const Reviews = () => {
    const classes = useStyles();
    const user = useSelector(state => state.login);
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();

    //IF THERE ARE REVIEWS IN THE DATABASE WE FILTER EVERY REVIEW TO CHECK IF THE LOGGED USER HAS MADE ANY REVIEWS AND STORE THEM IN THIS VARIABLE
    const userReviews = reviews ? reviews.filter(r => r.user.username === user.username) : null;

    const handleDelete = (review) => {
        //WE CONFIRM WITH THE USER IF HE REALLY WANTS TO DELETE THIS REVIEW
        const result = window.confirm('Do you really want to delete this review?');
        if(result){
            dispatch(deleteReview(review));
            dispatch(notificationSuccess('Review deleted'));
        };
    };

    return (
        <>  
            {userReviews.length === 0 ? (
                <div className={classes.noReviews}><p style={{ fontSize: 25, color: 'black', fontFamily: 'Roboto, monospace' }}>You haven't reviewed a pokemon yet</p></div>
                ) : (
                userReviews.map(r => {
                    return (
                        <div className={classes.reviewContainerStyle}>
                            <div className={classes.parent}>
                                <div className={classes.text}>
                                    <div className={classes.ratingContainerStyle}>
                                        <p>{r.rating}</p>
                                    </div>
                                    <div className={classes.contentStyle}>
                                        <p>{capsFirstLetter(r.content)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.parent2}>
                                <img  className={classes.image} src={r.pokemon.sprite} alt={`${r.pokemon.name}'s sprite`}/>
                                <Button className={classes.delete} onClick={() => handleDelete(r)} type="button" data-cy="delete-review-button">Delete</Button>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default Reviews;