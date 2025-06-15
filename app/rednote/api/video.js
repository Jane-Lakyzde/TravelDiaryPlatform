// src/api/video.js
import http from '../utils/request.js'

// 上传视频
export const uploadVideo = (data) => {
  return http.post('/videos', data);
};

// 获取视频列表
export const getVideos = () => {
  return http.get('/videos');
};

// 获取用户视频
export const getUserVideos = (userId) => {
  return http.get(`/videos/user/${userId}`);
};
