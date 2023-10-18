import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { handleNotification } from '../reducers/notificationReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const logInUser = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const showButton = blog.user.username === logInUser.username ? true : false;

  const updateLike = async (id) => {
    try {
      dispatch(likeBlog(id));
    } catch (error) {
      dispatch(
        handleNotification({
          message: error,
          error: true,
        }),
        5000
      );
    }
  };

  const deleteBlog = async (id) => {
    try {
      if (
        window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`) === true
      )
        dispatch(removeBlog(id));
    } catch (error) {
      console.log(error);
      dispatch(
        handleNotification({
          message: error.response,
          error: true,
        }),
        5000
      );
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
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
          <button onClick={() => updateLike(blog.id)} id="like-button">
            like
          </button>
        </p>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
        {showButton && (
          <button onClick={() => deleteBlog(blog.id)}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
