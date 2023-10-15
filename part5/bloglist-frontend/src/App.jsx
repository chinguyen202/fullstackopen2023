import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';

const App = () => {
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [updateBlogs, setUpdateBlogs] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('false');
  const [message, setMessage] = useState('');

  const login = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem('appUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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
        setError(false);
        setUpdateBlogs(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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

  const loginForm = () => (
    <Toggable buttonLabel="login" id="login" ref={loginFormRef}>
      <LoginForm login={login} />
    </Toggable>
  );

  const blogForm = () => (
    <Toggable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlogForm createBlog={addBlog} />
    </Toggable>
  );

  const logout = () => {
    window.localStorage.removeItem('appUser');
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      });
    }
  }, [updateBlogs]);

  return (
    <>
      {message && <Notification message={message} error={error} />}
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

      {user &&
        blogs.map((blog) => (
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
