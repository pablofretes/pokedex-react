import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loading from '../loading/Loading';
import { capsFirstLetter, isEmpty } from '../../utils/functions';
import './individual.css'

const useStyles = makeStyles((theme) => ({
  reviewButton: {
    backgroundColor: '#D3D3D3',
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
    steel: '#787887',
    dark: '#705746'
  };

  return (
    <div className='root-rootie'>
      {isEmpty(pokemon) ? <Loading /> : 
        (
        <div className='individual-root' >
						<div className='individual-container'>
							<div className='image-container' >
								<img className='image-individual' alt={`${pokemon.name}'s sprite`} src={pokemon.sprites.other["official-artwork"]["front_default"]}/>
							</div>
							<div className='types-container'>
								{pokemon.types.map(t => <div className='type' style={{ backgroundColor: colors[t.type.name]}}>{t.type.name.toUpperCase()}</div>)}
							</div>
							{/*THIS BUTTON SHOULD ONLY EXIST IF THERE IS A USER LOGGED IN BECAUSE ONLY LOGGED USERS CAN MAKE REVIEWS.*/}
							<div className='button-container'>{user && <Button data-cy={`review-button-${pokemon.name}`} className={classes.reviewButton} onClick={() => handleReview(pokemon)}>Review</Button>}</div>
						</div>
						<div className='text-indiv-container'>
							<p className='text-info-id'>#{pokemon.id}</p>
							<p className='text-info'>{capsFirstLetter(pokemon.name)}</p>
							<div className='stats-indiv'>
								{pokemon.stats.map(s => (
									<div>
										<p className='text-info-stats-name' key={s.stat.name}>{capsFirstLetter(s.stat.name)}:</p>
										<p className='text-info-stats'>{s.base_stat}</p>
									</div>
								))}
							</div>
							<div className='text-container-individual'>
								<p className='text-ability'>Ability:</p>
								<p className='text-content'>{capsFirstLetter(pokemon.abilities[0].ability.name)}</p>
							</div>
						</div>
        </div>
        )}
    </div>
  );
};

export default IndividualPokemon;