import React from 'react';
import Pagination from './Pagination';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backGroundColor: '#222222'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    image: {
        width: 100,
        height: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    gridItem : {
        textDecoration: 'none',
        justifyContent: 'center'
    },
    color: {
        backgroundColor: '#E5709B',
    },
    p: {
        textAlign: 'center',
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold'
    }
}));

const PokemonsDisplay = ({ pokemons, CapsFirstLetter, onNext, onPrevious, currentPage, totalCount, pageSize, onPageChange, handleSelect }) => {
    const classes = useStyles();
    console.log(pokemons);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {pokemons && pokemons.map(p => (
                    <Grid item xs={3} key={p.name} className={classes.gridItem} component={Link} to={`/pokemons/${p.name}`} data-cy={`pokemon-button-${p.name}`}>
                            <Paper className={classes.paper && classes.color} elevation={10}>
                                <p className={classes.p}>#{p.id}</p>
                                <p className={classes.p}>{CapsFirstLetter(p.name)}</p>
                                {p.sprites.other["dream_world"]["front_default"] !== null ? 
                                <img className={classes.image} alt={`${p.name}'s sprite`} src={p.sprites.other["dream_world"]["front_default"]}/> : 
                                <img className={classes.image} alt={`${p.name}'s sprite`} src={p.sprites.other["official-artwork"]["front_default"]}/>}
                            </Paper>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                onNext={onNext}
                currentPage={currentPage}
                totalCount={totalCount} 
                pageSize={pageSize} 
                onPrevious={onPrevious}
                onPageChange={onPageChange}
                handleSelect={handleSelect}
            />
        </div>
    );
};

export default PokemonsDisplay;