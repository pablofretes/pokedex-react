import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from '../reducers/reviewsReducer';
import { useHistory } from 'react-router';
import { capsFirstLetter } from '../utils/functions';
import { notificationError } from '../reducers/notificationReducer';

const useStyles = makeStyles((theme) => ({
    review: {
        display: 'block',
        backgroundColor: '#c2185b',
        borderRadius: 5,
        padding: 8,
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 'auto',
        marginTop: 40
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Roboto, monospace',
        textAlign: 'center',
        marginBottom: 0,
        color: 'white'
    },
}))

const NewReview = () => {
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
            <div className='imageContainer' style={{ backgroundColor: '#E5709B' }}>
                <p className='text' style={{ textAlign: 'center'}}>{`Reviewing ${capsFirstLetter(pokemon.name)}`}</p>
                <img className='image-individual' src={pokemon.sprite} alt={`${pokemon.name}'s sprite`}/>
            </div>
            <div className='imageContainer' style={{ backgroundColor: '#E5709B' }}>
                <form onSubmit={onSubmit}>
                    <input name="reviewInput" placeholder="Write a Review!" className='input' data-cy="new-review-input"/>
                    <div className={classes.container}>
                        <p className={classes.text}>Rate This Pokemon</p>
                        <select name="reviewRating" data-cy="select-rating" className='rating-input'>
                            {optionsArray.map(o => <option data-cy={`select-rating-${o}`} key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <Button name="review-button" type="submit" className={`review-button ${classes.review}`} data-cy="review-form-button">Post Review</Button>
                </form>
            </div>
        </div>
    );
};

export default NewReview;