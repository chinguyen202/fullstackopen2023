import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { initializeUsers } from '../reducers/usersReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch, users]);
  if (user === null || users === null) return null;
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>{}</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
