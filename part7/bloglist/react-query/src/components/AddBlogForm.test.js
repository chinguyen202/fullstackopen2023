import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddBlogForm from './AddBlogForm';

describe('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  test('add Form is working', async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<AddBlogForm createBlog={addBlog} />);

    const title = container.querySelector('#title');
    const author = container.querySelector('#author');
    const url = container.querySelector('#url');
    const sendButton = screen.getByText('Create');
    await user.type(title, 'testing title');
    await user.type(author, 'testing author');
    await user.type(url, 'testing url');
    await user.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe('testing title');
    expect(addBlog.mock.calls[0][0].author).toBe('testing author');
    expect(addBlog.mock.calls[0][0].url).toBe('testing url');
  });
});
