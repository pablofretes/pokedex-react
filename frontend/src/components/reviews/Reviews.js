import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button, Grid, Paper } from '@material-ui/core';
import { deleteReview } from '../../reducers/reviewsReducer';
import { capsFirstLetter } from '../../utils/functions';
import { notificationSuccess } from '../../reducers/notificationReducer';
import './reviews.css';

const useStyles = makeStyles((theme) => ({
  delete: {
    backgroundColor: '#c2185b',
    borderRadius: 5,
    padding: 8,
    height: 30,
    width: 100,
    fontWeight: 'bold',
    fontSize: 15,
    margin: 10,
    fontFamily: 'Cairo',
    alignSelf: 'center'
  },
  paper: {
    marginTop: 15,
    animation: 'ease-in-out',
    padding: theme.spacing(2),
    backgroundColor: 'lightpink',
  },
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
    <div className='reviews-root'>  
      {userReviews.length === 0 ? (
        <div className='no-reviews'><p>You haven't reviewed a pokemon yet</p></div>
        ) : (    
        <Grid container spacing={3}>
        {userReviews.map(r => {
          return (
          <Grid item xs={3} >
            <Paper className={`${classes.paper} review-container-style`}>
              <div className='image-review-container'>
                <img src={r.pokemon.sprite} alt={`${r.pokemon.name}'s sprite`}/>
              </div>
              <div className='review-content'>
                <div className='rating-container-style'>
                  <p>{r.rating}</p>
                </div>
                <div className='content-style'>
                  <p>{capsFirstLetter(r.content)}</p>
                  <Button className={classes.delete} onClick={() => handleDelete(r)} type="button" data-cy="delete-review-button">Delete</Button>
                </div>
              </div>
            </Paper>
          </Grid>
          );
        })})
        </Grid>
      )}
    </div>
  );
};

export default Reviews;