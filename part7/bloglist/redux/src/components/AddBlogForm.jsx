import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewBlog } from '../reducers/blogReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AddBlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      dispatch(addNewBlog(newBlog));
      dispatch(
        handleNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added!`,
            error: false,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        handleNotification({
          message: error.response.data.message,
          error: true,
        }),
        5000
      );
    }

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-button">
          Create
        </button>
      </form>
    </>
  );
};

export default AddBlogForm;
