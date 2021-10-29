import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loading from './Loading';
import { capsFirstLetter, isEmpty } from '../utils/functions';

const useStyles = makeStyles((theme) => ({
    type: {
        height: 25,
        fontSize: 18,
        fontFamily: 'Roboto, monospace',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        borderRadius: 60,
        padding: 7,
        margin: 5,
    },
    reviewButton: {
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
}));

const IndividualPokemon = () => {
    const classes = useStyles();
    const history = useHistory();
    const pokemon = useSelector(state => state.individualPokemon);
    const user = useSelector(state => state.login);

    const handleReview = (p) => {
        history.push(`/reviews/${p.name}`);
    };

    const colors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5',
        ghost: '#5c6cac',
        ice: '#98D8D8',
        steel: '#787887'
    };

    return (
        <div>
            {isEmpty(pokemon) ? <Loading /> : 
                (
                <div>
                    <div className='root'>
                        <div className='imageContainer' elevation={15} style={{ backgroundColor: colors[pokemon.types[0].type.name] }}>
                            <img className='image-individual' alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["official-artwork"]["front_default"]}/>
                        </div>
                        <div className='statsContainer' elevation={8} key={pokemon.name}>
                            <p className='text'>#{pokemon.id}</p>
                            <p className='text'>{capsFirstLetter(pokemon.name)}</p>
                            {pokemon.stats.map(s => (
                                <p className='text' key={s.stat.name}>{capsFirstLetter(s.stat.name)}: {s.base_stat}</p>
                            ))}
                            {/*THIS BUTTON SHOULD ONLY EXIST IF THERE IS A USER LOGGED IN BECAUSE ONLY LOGGED USERS CAN MAKE REVIEWS.*/}
                            {user && <Button data-cy={`review-button-${pokemon.name}`} className={classes.reviewButton} onClick={() => handleReview(pokemon)}>Review</Button>}
                        </div>
                    </div>
                    <div className='root'>
                        <div className='type-text-container'>
                            <div className='typesContainer'>
                                {pokemon.types.map(t => <div className={classes.type} style={{ backgroundColor: colors[t.type.name]}}>{t.type.name.toUpperCase()}</div>)}
                            </div>
                            <div className='textContainer'>
                                <div>
                                <p className='text'>Ability: <br></br><p className='text-content'>{capsFirstLetter(pokemon.abilities[0].ability.name)}</p></p>
                                </div>
                                <div>
                                {pokemon["held_items"].length > 0 ? <p className='text'>Items: <br></br><ul>{pokemon["held_items"].map(i => <li className='text-content'>{capsFirstLetter(i.item.name)}</li>)}</ul></p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
};

export default IndividualPokemon;