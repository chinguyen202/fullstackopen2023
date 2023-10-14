import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog component test', () => {
  const blog = {
    title: 'ENJOY IT',
    author: 'Elise Blaha Cripe',
    url: 'http://eliseblaha.typepad.com',
    likes: 0,
    user: {
      id: '1234',
      name: 'Superuser',
      username: 'root',
    },
  };
  let user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY1MTdlOWVmY2RlNjA5NmIwNDViMmM5MCIsImlhdCI6MTY5NzIxODcxMiwiZXhwIjoxNjk3MjIyMzEyfQ.sGwuDa6jGHC31cpEJStb9ceP7v6mls8hPfBLIYYIJOI',
    username: 'root',
    name: 'Superuser',
  };

  let container;
  let mockAddLike = jest.fn();
  let mockDelete = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateLike={mockAddLike}
        deleteBlog={mockDelete}
        logInUser={user}
      />
    ).container;
  });

  test('render only title and author', async () => {
    const div = container.querySelector('.toggableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('render all detail of blog when user click button to show', async () => {
    const button = screen.getByText('View');
    const user = userEvent.setup();
    await user.click(button);
    const div = container.querySelector('.toggableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('addLike is called twice if user click button addlike twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.dblClick(button);
    expect(mockAddLike.mock.calls).toHaveLength(2);
  });
});
