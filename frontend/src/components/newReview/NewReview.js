import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from '../../reducers/reviewsReducer';
import { useHistory } from 'react-router';
import { capsFirstLetter } from '../../utils/functions';
import { notificationError } from '../../reducers/notificationReducer';
import './newReview.css';

const useStyles = makeStyles((theme) => ({
  review: {
    backgroundColor: '#c2185b',
    borderRadius: 5,
    padding: 8,
    height: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Cairo',
    marginTop: 40
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'Cairo, monospace',
    textAlign: 'center',
    marginBottom: 0,
    color: 'white'
  },
}))

const NewReview = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const pokemonObject = useSelector(state => state.individualPokemon);
  const user = useSelector(state => state.login);
  const reviews = useSelector(state => state.reviews);
  const history = useHistory();

  const pokemon = {
    //THE POKEMON OBJECT OBTAINED FOR OUR INDIVIDUAL POKEMON FROM pokeapi.co IS WAY TOO BIG SO WE ONLY 
    //COPY THE RELEVANT INFO IN A NEW OBJECT AND PASS THAT TO OUR DATABASE
    name: pokemonObject.name,
    sprite: pokemonObject.sprites.other["official-artwork"]["front_default"],
  };

  const userReviews = reviews ? reviews.filter(r => r.user.username === user.username) : null;

  const onSubmit = (event) => {
    event.preventDefault();
    const review = (event.target.reviewInput.value).toString();
    const rating = Number(event.target.reviewRating.value);
    const credentials = { content: review, rating: rating, pokemon: pokemon };

    if(userReviews.find(r => r.pokemon.name === pokemon.name)){
      dispatch(notificationError('You have already reviewed this pokemon!'));
      return null;
    };

    if(!review){
      dispatch(notificationError('The review field cannot be empty.'));
      return null;
    };

    dispatch(newReview(credentials));
    history.push('/reviews');
  };
  
  let optionsArray = [];

  for(let i = 0; i <= 100; i++){
    optionsArray.push(i);
  };

  return (
    <div className='root'>
      <div className='new-review-root'>
        <div className='image-container-new-review'>
          <p className='text' style={{ textAlign: 'center'}}>{`Reviewing ${capsFirstLetter(pokemon.name)}`}</p>
          <img className='image-review' src={pokemon.sprite} alt={`${pokemon.name}'s sprite`}/>
        </div>
        <div >
          <form onSubmit={onSubmit}>
            <div className='form-container'>
              <input name="reviewInput" placeholder="Write a Review!" className='input' data-cy="new-review-input"/>
              <div className={classes.container}>
                <p className={classes.text}>Rate This Pokemon: {sliderValue}</p>
                <input name="reviewRating" data-cy="select-rating" className='rating-input' type='range' min={0} max={100} onChange={(e) => setSliderValue(e.target.value)}/>
              </div>
              <Button name="review-button" type="submit" className={classes.review} data-cy="review-form-button">Post Review</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewReview;