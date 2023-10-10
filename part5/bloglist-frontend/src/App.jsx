import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notifcation';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTittle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('appUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
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

  const addBlog = (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      blogService.create(newBlog).then((returnBlog) => {
        setMessage(
          `a new blog ${returnBlog.title} by ${returnBlog.author} added!`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setTittle('');
        setAuthor('');
        setUrl('');
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
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  return (
    <>
      {message && <Notification message={message} error={error} />}
      <h2>blogs</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>login</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
          password={password}
          handleLogin={handleLogin}
          message={message}
          error={error}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      {user != null && (
        <p>
          User logged in {user.name} <button onClick={logout}>Log out</button>
        </p>
      )}

      <div style={showFormWhenVisible}>
        <AddBlogForm
          title={title}
          setTitle={setTittle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          addBlog={addBlog}
        />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      <div style={hideFormWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>add blog</button>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
