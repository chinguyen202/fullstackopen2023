import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { handleNotification } from '../reducers/notificationReducer';
import blogs from '../services/blogs';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs);
  const blog = allBlogs.find((blog) => blog.id === id);
  const logInUser = useSelector((state) => state.user);

  if (!blog) return null;

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

  const postComment = async (event) => {
    event.preventDefault();
    const comment = event.target[0].value;
    try {
      await blogs.addComment(comment, blog.id);
      dispatch(
        handleNotification(
          {
            message: 'Successfully added comment',
            error: false,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        handleNotification(
          handleNotification({
            message: error.response,
            error: true,
          }),
          5000
        )
      );
      console.error('error adding a comment', error);
    }
  };

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} - {blog.author}
          {showButton && (
            <button onClick={() => deleteBlog(blog.id)}>Remove</button>
          )}
        </h2>
        <p>
          {blog.likes} likes
          <button onClick={() => updateLike(blog.id)} id="like-button">
            like
          </button>
        </p>
        <a href={blog.url}>{blog.url}</a>
        <p>added by {blog.user.name}</p>
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={postComment}>
          <input type="text" />
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={blog.id}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
