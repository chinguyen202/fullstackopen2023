import { useState } from 'react';

const Blog = ({ blog, updateLike, deleteBlog, logInUser }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const showButton = blog.user.username === logInUser.username ? true : false;

  const addLike = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateLike(blogUpdate, blog.id);
  };

  const removeBlog = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`) === true
    )
      deleteBlog(blog.id);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>View</button>
        </p>
      </div>
      <div style={showWhenVisible} className="toggableContent">
        <p>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
        {showButton && <button onClick={removeBlog}>Remove</button>}
      </div>
    </div>
  );
};

export default Blog;
