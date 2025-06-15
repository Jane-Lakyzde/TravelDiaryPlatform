// src/api/follow.js
import http from '../utils/request.js'

// 关注某人
export const followUser = (targetUserId) => {
  return http.post('/follow', { targetUserId });
};

// 取消关注
export const unfollowUser = (targetUserId) => {
  return http.delete(`/follow/${targetUserId}`);
};

// 获取粉丝列表
export const getFollowers = (userId) => {
  return http.get(`/follow/followers/${userId}`);
};

// 获取关注列表
export const getFollowings = (userId) => {
  return http.get(`/follow/followings/${userId}`);
};
