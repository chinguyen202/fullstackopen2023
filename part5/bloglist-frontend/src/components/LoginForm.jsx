import React from 'react';
import Notification from './Notifcation';

const LoginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
  message,
  error,
}) => {
  return (
    <>
      <h3>Log in to application</h3>
      {message && <Notification message={message} error={error} />}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
