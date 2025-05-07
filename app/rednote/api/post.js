// src/api/post.js
import request from '@/utils/request';

// 发布帖子
export const createPost = (data) => {
  return request.post('/posts', data);
};

// 获取所有帖子
export const getPosts = () => {
  return request.get('/posts');
};

// 获取某个用户的帖子
export const getUserPosts = (userId) => {
  return request.get(`/posts/user/${userId}`);
};
