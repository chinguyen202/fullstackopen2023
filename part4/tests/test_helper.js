const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const testUser = {
  username: 'root',
  password: 'salainen',
};

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const generateToken = async () => {
  const user = await User.findOne({ username: testUser.username });
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  // token expires in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  return token;
};

module.exports = {
  initBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  testUser,
  generateToken,
};
