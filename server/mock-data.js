export const getAllPosts = () =>
  Promise.resolve([{ title: 'post one', text: 'i am the first post', id: 1 }])

export const getPost = (id) =>
  Promise.resolve({
    id: Number(id),
    title: 'i am the post you wanted',
    body: 'totally a real post',
  })

export const savePost = (body) =>
  Promise.resolve(`totally saved post ${body.title}`)
