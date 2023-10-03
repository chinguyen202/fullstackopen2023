import React from 'react';

const AddBlogForm = ({
  title,
  setTitle,
  addBlog,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default AddBlogForm;
