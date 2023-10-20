import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from './reducers/userReducer';

import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer.js';
import Home from './components/Home';
import blogService from './services/blogs';
import Toggable from './components/Toggable';
import LoginForm from './components/LoginForm';
import User from './components/User';
import Blog from './components/Blog';
import UserList from './components/UserList';
import loginService from './services/login';
import { handleNotification } from './reducers/notificationReducer.js';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
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

  const logout = () => {
    window.localStorage.removeItem('appUser');
    dispatch(removeUser());
  };

  const loginForm = () => (
    <Toggable buttonLabel="login" id="login" ref={loginFormRef}>
      <LoginForm login={login} />
    </Toggable>
  );

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
  }, [dispatch, user]);

  return (
    <Router>
      <Notification />
      {user && (
        <div>
          <a href="/" style={{ marginRight: '10px' }}>
            blogs
          </a>
          <a href="/users" style={{ marginRight: '10px' }}>
            users
          </a>
          <span>
            {user.name} logged in <button onClick={logout}>Log out</button>
          </span>
        </div>
      )}
      {!user && <>{loginForm()}</>}

      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
