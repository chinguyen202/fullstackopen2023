import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(initializeUsers()), [];
  });
  if (users === null) return null;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{}</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
