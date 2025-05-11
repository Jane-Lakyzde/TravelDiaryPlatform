// src/api/post.js
import http from '../axios.js'

// 发布帖子
export const createPost = (data) => {
  return http.post('/posts', data);
};

// 获取所有帖子
export const getPosts = () => {
  return http.get('/posts');
};

// 获取某个用户的帖子
export const getUserPosts = (userId) => {
  return http.get(`/posts/user/${userId}`);
};
