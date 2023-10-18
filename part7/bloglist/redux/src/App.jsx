import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import { initializeBlogs, likeBlog } from './reducers/blogReducer.js';
import { handleNotification } from './reducers/notificationReducer.js';
import { setUser, removeUser } from './reducers/userReducer';
import Users from './components/Users';
import { initializeUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  const login = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem('appUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        handleNotification({
          message: error.response.data.message,
          error: true,
        }),
        5000
      );
    }
  };

  const loginForm = () => (
    <Toggable buttonLabel="login" id="login" ref={loginFormRef}>
      <LoginForm login={login} />
    </Toggable>
  );

  const blogForm = () => (
    <Toggable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlogForm />
    </Toggable>
  );

  const logout = () => {
    window.localStorage.removeItem('appUser');
    dispatch(removeUser());
  };

  useEffect(() => {
    if (user === null) {
      const loggedUserJSON = window.localStorage.getItem('appUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
        blogService.setToken(user.token);
        dispatch(initializeBlogs());
      }
    } else {
      blogService.setToken(user.token);
      dispatch(initializeBlogs());
    }
  }, []);

  return (
    <>
      <Notification />
      <h2>blogs</h2>
      {!user && <>{loginForm()}</>}

      {user && (
        <div>
          <p>
            User logged in {user.name} <button onClick={logout}>Log out</button>
          </p>
          {blogForm()}
        </div>
      )}
      <Users />

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

export default App;
