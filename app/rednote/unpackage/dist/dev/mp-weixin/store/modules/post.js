"use strict";
const common_vendor = require("../../common/vendor.js");
const usePostStore = common_vendor.defineStore("post", {
  state: () => ({
    posts: [
      {
        id: "1",
        title: "超好吃的甜品店推荐，提拉米苏绝了！",
        content: "今天发现了一家超级好吃的甜品店，他们家的提拉米苏简直绝了！环境也很适合拍照，强烈推荐大家去打卡～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "甜点控",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-20 14:30",
        likes: 128,
        isLiked: false
      },
      {
        id: "2",
        title: "周末郊游好去处，空气清新风景美",
        content: "周末去了郊外的一个小村庄，风景真的太美了！空气清新，远离城市喧嚣，很适合放松心情。",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "旅行达人",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-19 16:45",
        likes: 256,
        isLiked: true
      },
      {
        id: "3",
        title: "春季穿搭分享，清新又舒适",
        content: "春天来了，分享一套适合春游的穿搭，清新又舒适～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "时尚博主",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-18 10:20",
        likes: 189,
        isLiked: false
      },
      {
        id: "4",
        title: "家常菜教程，新手也能轻松上手",
        content: "分享一个超级简单的家常菜做法，新手也能轻松上手！",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "美食达人",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-17 19:15",
        likes: 312,
        isLiked: false
      },
      {
        id: "5",
        title: "城市夜景打卡，太美了",
        content: "夜晚的城市真的太美了，分享一组夜景照片～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "摄影爱好者",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-16 21:30",
        likes: 167,
        isLiked: true
      },
      {
        id: "6",
        title: "手工艺品制作教程",
        content: "分享一个简单的手工艺品制作方法，适合亲子活动～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "手工达人",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-15 15:40",
        likes: 145,
        isLiked: false
      },
      {
        id: "7",
        title: "咖啡店探店日记",
        content: "发现了一家超有格调的咖啡店，环境安静，咖啡香醇～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "咖啡控",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-14 11:20",
        likes: 198,
        isLiked: false
      },
      {
        id: "8",
        title: "宠物日常分享",
        content: "记录我家小猫咪的日常，太可爱了～",
        images: [
          "/static/images/touxiang.jpg",
          "/static/images/touxiang.jpg"
        ],
        author: {
          username: "铲屎官",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-03-13 09:15",
        likes: 276,
        isLiked: true
      },
      {
        id: "9",
        title: "我的旅行vlog",
        content: "记录一次难忘的旅行，视频里有美丽的风景和有趣的故事，快来看看吧！",
        images: [],
        video: "/static/images/video.mp4",
        author: {
          username: "vlog达人",
          avatar: "/static/images/touxiang.jpg"
        },
        createTime: "2024-06-10 12:00",
        likes: 88,
        isLiked: false
      }
    ],
    comments: {
      "1": [
        {
          id: "1",
          content: "看起来好好吃啊！请问在哪里呀？",
          createTime: "2024-03-20 15:00",
          user: {
            username: "美食爱好者",
            avatar: "/static/images/touxiang.jpg"
          }
        },
        {
          id: "2",
          content: "我也去过这家店，确实不错！",
          createTime: "2024-03-20 15:30",
          user: {
            username: "甜品控",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "2": [
        {
          id: "3",
          content: "风景真美，请问具体位置在哪里？",
          createTime: "2024-03-19 17:00",
          user: {
            username: "旅行者",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "3": [
        {
          id: "4",
          content: "这套搭配好好看！请问衣服在哪里买的？",
          createTime: "2024-03-18 11:00",
          user: {
            username: "时尚达人",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "4": [
        {
          id: "5",
          content: "看起来好美味，请问具体步骤是什么？",
          createTime: "2024-03-17 20:00",
          user: {
            username: "美食新手",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "5": [
        {
          id: "6",
          content: "拍得真好看！请问用的什么相机？",
          createTime: "2024-03-16 22:00",
          user: {
            username: "摄影爱好者",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "6": [
        {
          id: "7",
          content: "好可爱的手工！请问材料在哪里买的？",
          createTime: "2024-03-15 16:00",
          user: {
            username: "手工爱好者",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "7": [
        {
          id: "8",
          content: "这家咖啡店看起来好有格调！",
          createTime: "2024-03-14 12:00",
          user: {
            username: "咖啡爱好者",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ],
      "8": [
        {
          id: "9",
          content: "好可爱的小猫咪！",
          createTime: "2024-03-13 10:00",
          user: {
            username: "猫咪控",
            avatar: "/static/images/touxiang.jpg"
          }
        }
      ]
    }
  }),
  actions: {
    // 获取帖子详情
    getPostDetail(id) {
      return this.posts.find((post) => post.id === id);
    },
    // 添加新帖子
    addPost(post) {
      this.posts.unshift(post);
    },
    // 获取帖子评论
    getPostComments(postId) {
      return this.comments[postId] || [];
    },
    // 添加评论
    addComment(postId, comment) {
      if (!this.comments[postId]) {
        this.comments[postId] = [];
      }
      this.comments[postId].unshift(comment);
    },
    // 点赞/取消点赞
    toggleLike(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    }
  }
});
exports.usePostStore = usePostStore;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/post.js.map
