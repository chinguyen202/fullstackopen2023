var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  for (let i = 0; i < blogs.length; i++) {
    sum += blogs[i].likes;
  }
  return sum;
};

const favoriteBlog = (blogs) => {
  let maxLikes = blogs[0].likes;
  let favoriteBlog = null;
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      favoriteBlog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const targetAuthor = _.maxBy(
    Object.keys(blogsByAuthor),
    (author) => blogsByAuthor[author].length
  );
  const blogsByTargetAuthor = blogsByAuthor[targetAuthor];
  return {
    author: targetAuthor,
    blogs: blogsByTargetAuthor.length,
  };
};

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const targetAuthor = _.maxBy(Object.keys(blogsByAuthor), (author) => {
    return _.sumBy(blogsByAuthor[author], 'likes');
  });
  const totalLikes = _.sumBy(blogsByAuthor[targetAuthor], 'likes');
  return {
    author: targetAuthor,
    likes: totalLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
