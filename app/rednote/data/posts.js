// 用户数据
export const users = [
  {
    id: 1,
    username: '张三',
    avatar: 'https://picsum.photos/200',
    isFollowing: true
  },
  {
    id: 2,
    username: '李四',
    avatar: 'https://picsum.photos/201',
    isFollowing: true
  },
  {
    id: 3,
    username: '王五',
    avatar: 'https://picsum.photos/202',
    isFollowing: false
  },
  {
    id: 4,
    username: '赵六',
    avatar: 'https://picsum.photos/203',
    isFollowing: true
  }
]

// 帖子数据
export const initialPosts = [
  {
    id: 1,
    authorId: 1,
    title: '美丽的风景照',
    cover: 'https://picsum.photos/400/600',
    author: '张三',
    avatar: 'https://picsum.photos/200',
    likes: 120,
    isLiked: false,
    time: '2小时前'
  },
  {
    id: 2,
    authorId: 2,
    title: '新相机试拍',
    cover: 'https://picsum.photos/401/600',
    author: '李四',
    avatar: 'https://picsum.photos/201',
    likes: 85,
    isLiked: true,
    time: '3小时前'
  },
  {
    id: 3,
    authorId: 3,
    title: '城市夜景',
    cover: 'https://picsum.photos/402/600',
    author: '王五',
    avatar: 'https://picsum.photos/202',
    likes: 200,
    isLiked: false,
    time: '5小时前'
  },
  {
    id: 4,
    authorId: 4,
    title: '周末爬山记',
    cover: 'https://picsum.photos/403/600',
    author: '赵六',
    avatar: 'https://picsum.photos/203',
    likes: 150,
    isLiked: false,
    time: '1天前'
  },
  {
    id: 5,
    authorId: 1,
    title: '美食分享',
    cover: 'https://picsum.photos/404/600',
    author: '张三',
    avatar: 'https://picsum.photos/200',
    likes: 95,
    isLiked: true,
    time: '1天前'
  },
  {
    id: 6,
    authorId: 2,
    title: '旅行日记',
    cover: 'https://picsum.photos/405/600',
    author: '李四',
    avatar: 'https://picsum.photos/201',
    likes: 180,
    isLiked: false,
    time: '2天前'
  }
]

// 获取关注用户的帖子
export const getFollowedPosts = () => {
  const followedUserIds = users.filter(user => user.isFollowing).map(user => user.id)
  return initialPosts.filter(post => followedUserIds.includes(post.authorId))
}

// 获取发现页面的帖子
export const getDiscoverPosts = () => {
  return initialPosts
} 