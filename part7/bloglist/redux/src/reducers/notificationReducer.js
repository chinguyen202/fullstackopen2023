import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  error: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    removeNotification: (state, action) => {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const handleNotification = ({ message, error }, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, error }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
