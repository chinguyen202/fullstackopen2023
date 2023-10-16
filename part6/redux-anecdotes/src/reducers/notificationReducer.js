import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log('NOTIFICATION', action.payload);
      return action.payload;
    },
    removeNotification: (state, action) => {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const handleNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
