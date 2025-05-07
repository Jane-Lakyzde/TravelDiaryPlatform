// src/api/comment.js
import http from '../axios.js'

// 发表评论
export const addComment = (data) => {
  return http.post('/comments', data);
};

// 获取评论（帖子或视频）
export const getComments = (params) => {
  return http.get('/comments', { params });
};
