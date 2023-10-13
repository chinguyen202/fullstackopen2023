import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [updateBlogs, setUpdateBlogs] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('false');
  const [message, setMessage] = useState('');
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const hideFormWhenVisible = {
    display: addBlogVisible ? 'none' : '',
  };
  const showFormWhenVisible = { display: addBlogVisible ? '' : 'none' };
  const hideWhenVisible = {
    display: loginVisible ? 'none' : '',
  };
  const showWhenVisible = { display: loginVisible ? '' : 'none' };

  const login = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem('appUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setLoginVisible(false);
    } catch (error) {
      setMessage('Wrong credentials');
      setError(true);
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    try {
      blogService.create(blogObject).then((returnBlog) => {
        setMessage(
          `a new blog ${returnBlog.title} by ${returnBlog.author} added!`
        );
        setUpdateBlogs(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setAddBlogVisible(false);
      });
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const updateLike = async (blogObject, id) => {
    try {
      await blogService.update(blogObject, id);
      setUpdateBlogs(true);
    } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setUpdateBlogs(true);
    } catch (error) {
      setError(true);
      setMessage('Error in deleting the blog');
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('appUser');
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    }),
      [updateBlogs];
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      {message && <Notification message={message} error={error} />}
      <h2>blogs</h2>
      {user == null && (
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
      )}
      <div style={showWhenVisible}>
        <LoginForm login={login} message={message} error={error} />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      {user != null && (
        <p>
          User logged in {user.name} <button onClick={logout}>Log out</button>
        </p>
      )}

      <div style={showFormWhenVisible}>
        <AddBlogForm createBlog={addBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      <div style={hideFormWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>add blog</button>
      </div>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLike={updateLike}
          deleteBlog={deleteBlog}
          logInUser={user}
        />
      ))}
    </>
  );
};

export default App;
