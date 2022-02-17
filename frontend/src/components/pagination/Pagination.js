import React from 'react';
import { DOTS, usePagination } from '../../hooks/usePagination';
import { useSelector, useDispatch } from 'react-redux';
import { setOffset } from '../../reducers/offsetReducer';
import { pageSelection } from '../../reducers/currentPageReducer';
import './pagination.css';

const Pagination = ({ totalCount, siblingCount = 1, pageSize }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);
  const pagesTotal = Math.ceil(totalCount / pageSize);
  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

  let optionsArray = [];

  //JUST AN ARRAY TO BE ABLE TO SELECT ANY PAGE INSTEAD OF CLICKING MANY TIMES TO GO TO A SPECIFIC PAGE
  for(let i = 1; i <= pagesTotal; i++){
    optionsArray.push(i);
  };

  const onPageChange = (pageNumber) => {
    dispatch(setOffset(pageNumber));
    dispatch(pageSelection(pageNumber));
  };
  
  const onNext = () => {
    const page = Number(currentPage + 1);
    dispatch(setOffset(page));
    dispatch({ type: 'INCREMENT' });
  };
  
  const onPrevious = () => {
    const page = Number(currentPage - 1);
    dispatch(setOffset(page));
    dispatch({ type: 'DECREMENT' });
  };
  
  const handleSelect = (event) => {
    const page = Number(event.target.value);
    dispatch(setOffset(page));
    dispatch(pageSelection(page));
  };

  return (
    <div className='pagination-wrapper'>
      {currentPage === 1 ? null : (
        <button className='pagination-next-previous' onClick={onPrevious} data-cy='previous-button'>&lt;</button>
      )}
      {paginationRange.map(pageNumber => {
        if(pageNumber === DOTS){
          return <div>&#8230;</div>
        }

        return(
          <div>
            {pageNumber === currentPage ? (
              <button key={currentPage} className='pagination-button-active' data-cy={`pagination-button-${pageNumber}`} onClick={() => onPageChange(pageNumber)} >{pageNumber}</button>) : (
              <button key={pageNumber} className='pagination-button' data-cy={`pagination-button-${pageNumber}`} onClick={() => onPageChange(pageNumber)} >{pageNumber}</button>
            )}
          </div>
        );
      })};
      {currentPage === 45 ? null : (
        <button className='pagination-next-previous' onClick={onNext} data-cy='next-button'>&gt;</button>
      )}
      <select data-cy="select-page" onChange={handleSelect} style={{ marginLeft: 10 }}>
        {optionsArray.map((pageNumber, i) => {
          return <option data-cy={`select-page-${pageNumber}`} value={pageNumber} key={i}>{pageNumber}</option>
        })}
      </select>
    </div>
  );
};

export default Pagination;