import { createSlice } from '@reduxjs/toolkit';
import users from '../services/users';

const initialState = null;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    removeUsers: (state, action) => {
      return initialState;
    },
  },
});

export const { setUsers, removeUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const initUsers = await users.getAll();
    dispatch(setUsers(initUsers));
  };
};

export default usersSlice.reducer;
