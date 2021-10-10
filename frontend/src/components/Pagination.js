import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DOTS, usePagination } from '../hooks/usePagination';
import { useSelector, useDispatch } from 'react-redux';
import { setOffset } from '../reducers/offsetReducer';
import { setLimit } from '../reducers/limitReducer';
import { pageSelection } from '../reducers/currentPageReducer';

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

const Pagination = ({ totalCount, siblingCount = 1, pageSize }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

    let optionsArray = [];

    for(let i = 1; i <= 45; i++){
        optionsArray.push(i);
    };

    const onPageChange = (pageNumber) => {
        console.log(pageNumber);
        /*if(pageNumber === 45){
>>>>>>> Stashed changes:src/components/Pagination.js
          dispatch(setLimit(18));
        };
        if(pageNumber !== 45){
          dispatch(setLimit(20))
        };*/
        dispatch(setOffset(pageNumber));
        dispatch(pageSelection(pageNumber));
    };
    
    const onNext = () => {
        const page = currentPage + 1;
        dispatch(setOffset(page));
        dispatch({ type: 'INCREMENT' });
    };
    
    const onPrevious = () => {
        const page = currentPage - 1;
        dispatch(setOffset(page));
        dispatch({ type: 'DECREMENT' });
    };
    
    const handleSelect = (event) => {
        const page = event.target.value;
        console.log(page);
        dispatch(setOffset(page));
        dispatch(pageSelection(page));
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