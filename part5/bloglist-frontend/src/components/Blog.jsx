import { useState } from 'react';

const Blog = ({ blog, updateLike }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateLike(blogUpdate, blog.id);
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
          {blog.title} <button onClick={toggleVisibility}>View</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
          {blog.title} <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>{blog.author}</p>
        <p>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
