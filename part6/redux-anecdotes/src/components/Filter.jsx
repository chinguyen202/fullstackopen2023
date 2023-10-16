import React from 'react';
import store from '../store';
import { filterQuote } from '../reducers/filterReducer';

const Filter = () => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault();
    store.dispatch(filterQuote(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
