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

export const handleNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
export const { setNotification, removeNotification } =
  notificationSlice.actions;
