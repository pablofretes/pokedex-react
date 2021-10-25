import React from 'react';
import { Button, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from '../reducers/reviewsReducer';
import { useHistory } from 'react-router';
import { capsFirstLetter } from '../utils/functions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: 100,
        marginBottom: 100,
        width: 450
    },
    input: {
        margin: 10,
        borderRadius: 5,
        padding: 15,
        height: 50,
        width: 300,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    review: {
        backgroundColor: '#c2185b',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 8,
        height: 50,
        width: 200,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    rating: {
        maxWidth: 40,
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Roboto, monospace',
        alignSelf: 'center',
        marginBottom: 0,
        marginTop: -6,
        color: 'white'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#E5709B',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    image: {
        width: 280,
        height: 'auto',
        alignSelf: 'flex-end',
    },
    div: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
}))

const NewReview = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pokemonObject = useSelector(state => state.individualPokemon);
    const history = useHistory();

    const pokemon = {
        //THE POKEMON OBJECT OBTAINED FOR OUR INDIVIDUAL POKEMON FROM pokeapi.co IS WAY TOO BIG SO WE ONLY 
        //COPY THE RELEVANT INFO IN A NEW OBJECT AND PASS THAT TO OUR DATABASE
        name: pokemonObject.name,
        sprite: pokemonObject.sprites.other["official-artwork"]["front_default"],
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const review = (event.target.reviewInput.value).toString();
        const rating = Number(event.target.reviewRating.value);
        const credentials = { content: review, rating: rating, pokemon: pokemon };
        dispatch(newReview(credentials));
        history.push('/reviews');
    };
    
    let optionsArray = [];

    for(let i = 0; i <= 100; i++){
        optionsArray.push(i);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form onSubmit={onSubmit}>
                    <div className={classes.div}>
                        <p className={classes.text}>{`Reviewing ${pokemon.name}`}</p>
                        <img className={classes.image} src={pokemon.sprite} alt={`${capsFirstLetter(pokemon.name)}'s sprite`}/>
                    </div>
                    <input name="reviewInput" placeholder="Write a Review!" className={classes.input} data-cy="new-review-input"/>
                    <div className={classes.container}>
                        <p className={classes.text}>Rate This Pokemon</p>
                        <select name="reviewRating" data-cy="select-rating" className={classes.rating}>
                            {optionsArray.map(o => <option data-cy={`select-rating-${o}`} key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <Button name="review-button" type="submit" className={classes.review} data-cy="review-form-button">Post Review</Button>
                </form>
            </Paper>
        </div>
    );
};

export default NewReview;