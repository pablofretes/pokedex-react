import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DOTS, usePagination } from '../hooks/usePagination';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    },
    button: {
        width: 20,
        borderRadius: 50,
        height: 30,
        backgroundColor: '#E5709B',
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        paddingLeft: 3,
        paddingRight: 3
    },
    active: {
        width: 20,
        borderRadius: 50,
        height: 30,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        paddingLeft: 6,
        paddingRight: 6
    },
    nextPrevious: {
        width: 20,
        borderRadius: 33,
        height: 30,
        backgroundColor: '#E5709B',
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        paddingLeft: 3,
        paddingRight: 3
    },
}));

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, onPrevious, onNext, handleSelect }) => {
    const classes = useStyles();

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

    let optionsArray = [];

    for(let i = 1; i <= 45; i++){
        optionsArray.push(i);
    };

    return (
        <div className={classes.root}>
            {currentPage === 1 ? null : (
                <Button className={classes.nextPrevious} onClick={onPrevious} data-cy='previous-button'>&lt;</Button>
            )}
            {paginationRange.map(pageNumber => {
                if(pageNumber === DOTS){
                    return <div>&#8230;</div>
                }

                return(
                    <div>
                        {pageNumber === currentPage ? (
                            <Button key={currentPage} className={classes.active} data-cy={`pagination-button-${pageNumber}`} onClick={() => onPageChange(pageNumber)} >{pageNumber}</Button>) : (
                            <Button key={pageNumber} className={classes.button} data-cy={`pagination-button-${pageNumber}`} onClick={() => onPageChange(pageNumber)} >{pageNumber}</Button>
                        )}
                    </div>
                );
            })};
            {currentPage === 45 ? null : (
                <Button className={classes.nextPrevious} onClick={onNext} data-cy='next-button'>&gt;</Button>
            )}
            <select onChange={handleSelect} style={{ marginLeft: 10 }}>
                {optionsArray.map(pageNumber => {
                    return <option value={pageNumber} >{pageNumber}</option>
                })}
            </select>
        </div>
    );
};

export default Pagination;