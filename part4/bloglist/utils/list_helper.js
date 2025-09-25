const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const count = {}
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + 1
  })

  let topAuthor = null
  let maxBlogs = 0
  for (author in count) {
    if (count[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = count[author]
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  const likeCounts = {}
  blogs.forEach(blog => {
    likeCounts[blog.author] = (likeCounts[blog.author] || 0) + blog.likes
  })

  let topAuthor = null
  let maxLikes = 0
  for (const author in likeCounts) {
    if (likeCounts[author] > maxLikes) {
      topAuthor = author
      maxLikes = likeCounts[author]
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
