import r2 from 'r2'

export const getPost = (id) => r2.get(`/posts/${id}`).json

export const getPosts = () => r2.get('/posts').json

export const postPost = (body) =>
  r2.post('/posts', {
    json: body
  }).json
