import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBlogForm from './AddBlogForm';
import Toggable from './Toggable';
import Table from 'react-bootstrap/Table';

const Home = () => {
  const { blogs, user } = useSelector((state) => state);
  const blogFormRef = useRef();

  const blogForm = () => (
    <Toggable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlogForm />
    </Toggable>
  );

  if (!user) return null;

  return (
    <div className="container">
      <h2>blog app</h2>

      <div>{blogForm()}</div>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
