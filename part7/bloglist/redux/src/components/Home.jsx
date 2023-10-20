import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBlogForm from './AddBlogForm';
import Toggable from './Toggable';

const Home = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormRef = useRef();

  const blogForm = () => (
    <Toggable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlogForm />
    </Toggable>
  );
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <div>{blogForm()}</div>
      {blogs.map((blog) => (
        <p style={blogStyle} key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  );
};

export default Home;
