// src/api/like.js
import http from '../utils/request.js'

// 点赞帖子或视频
export const like = (data) => {
  return http.post('/likes', data);
};

// 取消点赞
export const unlike = (data) => {
  return http.delete('/likes', { data });
};
