"use strict";
const common_vendor = require("../../common/vendor.js");
const data_posts = require("../../data/posts.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const leftPosts = common_vendor.ref([]);
    const rightPosts = common_vendor.ref([]);
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at pages/user/home.vue:123", "搜索内容:", searchText.value);
    };
    const handleLike = (post) => {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    };
    const handleComment = (post) => {
      common_vendor.index.__f__("log", "at pages/user/home.vue:135", "评论帖子:", post.id);
    };
    const handleShare = (post) => {
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        title: post.content,
        success: function(res) {
          common_vendor.index.__f__("log", "at pages/user/home.vue:147", "分享成功:", res);
        },
        fail: function(err) {
          common_vendor.index.__f__("log", "at pages/user/home.vue:150", "分享失败:", err);
        }
      });
    };
    const handleCreatePost = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/post"
      });
    };
    const previewImage = (images, current) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[current]
      });
    };
    common_vendor.onMounted(() => {
      const allPosts = data_posts.initialPosts;
      const midIndex = Math.ceil(allPosts.length / 2);
      leftPosts.value = allPosts.slice(0, midIndex);
      rightPosts.value = allPosts.slice(midIndex);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: searchText.value,
        c: common_vendor.o(($event) => searchText.value = $event.detail.value),
        d: common_vendor.o(handleCreatePost),
        e: common_vendor.f(leftPosts.value, (post, k0, i0) => {
          return {
            a: post.avatar,
            b: common_vendor.t(post.username),
            c: common_vendor.t(post.time),
            d: common_vendor.t(post.content),
            e: common_vendor.f(post.images, (image, index, i1) => {
              return {
                a: index,
                b: image,
                c: common_vendor.o(($event) => previewImage(post.images, index), index)
              };
            }),
            f: common_vendor.t(post.likes),
            g: common_vendor.n(post.isLiked ? "active" : ""),
            h: common_vendor.o(($event) => handleLike(post), post.id),
            i: common_vendor.t(post.comments),
            j: common_vendor.o(($event) => handleComment(post), post.id),
            k: common_vendor.o(($event) => handleShare(post), post.id),
            l: post.id
          };
        }),
        f: common_vendor.f(rightPosts.value, (post, k0, i0) => {
          return {
            a: post.avatar,
            b: common_vendor.t(post.username),
            c: common_vendor.t(post.time),
            d: common_vendor.t(post.content),
            e: common_vendor.f(post.images, (image, index, i1) => {
              return {
                a: index,
                b: image,
                c: common_vendor.o(($event) => previewImage(post.images, index), index)
              };
            }),
            f: common_vendor.t(post.likes),
            g: common_vendor.n(post.isLiked ? "active" : ""),
            h: common_vendor.o(($event) => handleLike(post), post.id),
            i: common_vendor.t(post.comments),
            j: common_vendor.o(($event) => handleComment(post), post.id),
            k: common_vendor.o(($event) => handleShare(post), post.id),
            l: post.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/home.js.map
