import React from 'react';
import loading from '../../img/loading-transparent.gif';
import './loading.css';

const Loading = () => {
  return(
    <div className='loading-parent'>
      <img className='loading-gif' src={loading} alt="Loading gif" data-cy="loading-gif"/>
    </div>
  );
};

export default Loading;