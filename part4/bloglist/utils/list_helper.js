const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes){
        favorite = blog
    }
  });

  return favorite.title
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
