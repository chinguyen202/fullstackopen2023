const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload;
    default:
      return state;
  }
};

export const filterQuote = (keyword) => {
  return {
    type: 'FILTER',
    payload: keyword,
  };
};

export default filterReducer;
