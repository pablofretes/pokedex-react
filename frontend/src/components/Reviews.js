import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { deleteReview } from '../reducers/reviewsReducer';

const useStyles = makeStyles(() => ({
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

    const userReviews = reviews ? reviews.filter(r => r.user.username === user.username) : null;
    console.log(userReviews);

    const handleDelete = (review) => {
        dispatch(deleteReview(review));
    };

    return (
        <>  
            {!userReviews ? <p>You haven't reviewed any pokemons!</p> : (
                userReviews.map(r => {
                    return (
                        <div className={classes.reviewContainerStyle}>
                            <div className={classes.parent}>
                                <div className={classes.text}>
                                    <div className={classes.ratingContainerStyle}>
                                        <p>{r.rating}</p>
                                    </div>
                                    <div className={classes.contentStyle}>
                                        <p>{r.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.parent2}>
                                <img  className={classes.image} src={r.pokemon.sprite} alt={`${r.pokemon.name}'s sprite`}/>
                                <Button className={classes.delete} onClick={() => handleDelete(r)} type="button">Delete</Button>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default Reviews;