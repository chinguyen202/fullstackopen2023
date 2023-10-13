const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    return response.status(400).end();
  }
  const requestUser = request.user;
  const userFromDb = await User.findById(requestUser.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: requestUser.id,
  });

  const savedBlog = await blog.save();
  userFromDb.blogs = userFromDb.blogs.concat(savedBlog._id);
  await userFromDb.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response
      .status(404)
      .json({ error: 'The blog you try to access does not exist' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const blogId = request.params.id;
  const blogToDeleted = await Blog.findById(blogId);
  if (blogToDeleted.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'Not authorized' });
  }
  await Blog.findByIdAndRemove(blogId);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blogId = request.params.id;
  const requestBlog = await Blog.findById(blogId);
  const user = requestBlog.user;
  if (requestBlog) {
    const result = await Blog.findOneAndReplace(
      { _id: blogId },
      { user, likes, url, author, title }
    );
    response.json(result);
  } else {
    response.status(404).json({ error: 'Blog can not be found' });
  }
});

module.exports = blogsRouter;
