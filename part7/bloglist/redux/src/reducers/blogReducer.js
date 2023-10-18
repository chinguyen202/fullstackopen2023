import { createSlice } from '@reduxjs/toolkit';
import blogs from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      const id = action.payload;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((i) => i.id !== id);
    },
  },
});

export const { createBlog, appendBlog, setBlogs, addLike, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initBlogs = await blogs.getAll();
    dispatch(setBlogs(initBlogs));
  };
};

export const addNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogs.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogToChange = await blogs.getById(id);
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    await blogs.update(changedBlog, id);
    dispatch(addLike(id));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogs.remove(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
