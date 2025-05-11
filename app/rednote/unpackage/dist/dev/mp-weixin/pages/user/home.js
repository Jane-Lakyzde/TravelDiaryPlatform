"use strict";
const common_vendor = require("../../common/vendor.js");
const data_posts = require("../../data/posts.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    common_vendor.ref("");
    const leftPosts = common_vendor.ref([]);
    const rightPosts = common_vendor.ref([]);
    const showSidebar = common_vendor.ref(false);
    const activeTab = common_vendor.ref("discover");
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    };
    const closeSidebar = () => {
      showSidebar.value = false;
    };
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const goToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/index"
      });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
      closeSidebar();
    };
    const getPostTypeIcon = (post) => {
      if (post.video)
        return "icon-video";
      if (post.images && post.images.length > 0) {
        return post.images.length > 1 ? "icon-gallery" : "icon-image";
      }
      return "";
    };
    const getPostContentClass = (post) => {
      if (post.video)
        return "content-with-video";
      if (post.images && post.images.length > 0) {
        return post.images.length > 1 ? "content-with-gallery" : "content-with-image";
      }
      return "";
    };
    const handleLike = (post) => {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    };
    const handleComment = (post) => {
      common_vendor.index.__f__("log", "at pages/user/home.vue:301", "评论帖子:", post.id);
    };
    const handleShare = (post) => {
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        title: post.content,
        success: function(res) {
          common_vendor.index.__f__("log", "at pages/user/home.vue:313", "分享成功:", res);
        },
        fail: function(err) {
          common_vendor.index.__f__("log", "at pages/user/home.vue:316", "分享失败:", err);
        }
      });
    };
    const previewImage = (images, current) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[current]
      });
    };
    const playVideo = (video) => {
      common_vendor.index.navigateTo({
        url: `/pages/video/player?url=${encodeURIComponent(video.url)}`
      });
    };
    common_vendor.onMounted(() => {
      const allPosts = data_posts.initialPosts;
      const midIndex = Math.ceil(allPosts.length / 2);
      leftPosts.value = allPosts.slice(0, midIndex);
      rightPosts.value = allPosts.slice(midIndex);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => navigateTo("/pages/sidebar/discover-friends/index")),
        b: common_vendor.o(($event) => navigateTo("/pages/sidebar/creator-center/index")),
        c: common_vendor.o(($event) => navigateTo("/pages/sidebar/drafts/index")),
        d: common_vendor.o(($event) => navigateTo("/pages/sidebar/comments/index")),
        e: common_vendor.o(($event) => navigateTo("/pages/sidebar/history/index")),
        f: common_vendor.o(($event) => navigateTo("/pages/sidebar/orders/index")),
        g: common_vendor.o(($event) => navigateTo("/pages/sidebar/cart/index")),
        h: common_vendor.o(($event) => navigateTo("/pages/sidebar/wallet/index")),
        i: common_vendor.o(($event) => navigateTo("/pages/sidebar/miniapp/index")),
        j: common_vendor.o(($event) => navigateTo("/pages/sidebar/community-guidelines/index")),
        k: common_vendor.o(($event) => navigateTo("/pages/sidebar/scan/index")),
        l: common_vendor.o(($event) => navigateTo("/pages/sidebar/support/index")),
        m: common_vendor.o(($event) => navigateTo("/pages/sidebar/settings/index")),
        n: common_vendor.o(() => {
        }),
        o: showSidebar.value ? 1 : "",
        p: common_vendor.o(closeSidebar),
        q: showSidebar.value
      }, showSidebar.value ? {
        r: common_vendor.o(closeSidebar)
      } : {}, {
        s: common_vendor.o(toggleSidebar),
        t: activeTab.value === "discover" ? 1 : "",
        v: common_vendor.o(($event) => switchTab("discover")),
        w: activeTab.value === "follow" ? 1 : "",
        x: common_vendor.o(($event) => switchTab("follow")),
        y: common_vendor.o(goToSearch),
        z: activeTab.value === "discover"
      }, activeTab.value === "discover" ? {
        A: common_vendor.f(leftPosts.value, (post, k0, i0) => {
          return common_vendor.e({
            a: post.avatar,
            b: common_vendor.t(post.username),
            c: common_vendor.t(post.time),
            d: common_vendor.n(getPostTypeIcon(post)),
            e: common_vendor.t(post.content),
            f: post.images && post.images.length > 0
          }, post.images && post.images.length > 0 ? common_vendor.e({
            g: post.images[0],
            h: common_vendor.o(($event) => previewImage(post.images, 0), post.id),
            i: post.images.length > 1
          }, post.images.length > 1 ? {
            j: common_vendor.t(post.images.length)
          } : {}) : {}, {
            k: post.video
          }, post.video ? {
            l: post.video.cover,
            m: common_vendor.o(($event) => playVideo(post.video), post.id)
          } : {}, {
            n: common_vendor.n(getPostContentClass(post)),
            o: common_vendor.t(post.likes),
            p: common_vendor.n(post.isLiked ? "active" : ""),
            q: common_vendor.o(($event) => handleLike(post), post.id),
            r: common_vendor.t(post.comments),
            s: common_vendor.o(($event) => handleComment(post), post.id),
            t: common_vendor.o(($event) => handleShare(post), post.id),
            v: post.id
          });
        }),
        B: common_vendor.f(rightPosts.value, (post, k0, i0) => {
          return common_vendor.e({
            a: post.avatar,
            b: common_vendor.t(post.username),
            c: common_vendor.t(post.time),
            d: common_vendor.n(getPostTypeIcon(post)),
            e: common_vendor.t(post.content),
            f: post.images && post.images.length > 0
          }, post.images && post.images.length > 0 ? common_vendor.e({
            g: post.images[0],
            h: common_vendor.o(($event) => previewImage(post.images, 0), post.id),
            i: post.images.length > 1
          }, post.images.length > 1 ? {
            j: common_vendor.t(post.images.length)
          } : {}) : {}, {
            k: post.video
          }, post.video ? {
            l: post.video.cover,
            m: common_vendor.o(($event) => playVideo(post.video), post.id)
          } : {}, {
            n: common_vendor.n(getPostContentClass(post)),
            o: common_vendor.t(post.likes),
            p: common_vendor.n(post.isLiked ? "active" : ""),
            q: common_vendor.o(($event) => handleLike(post), post.id),
            r: common_vendor.t(post.comments),
            s: common_vendor.o(($event) => handleComment(post), post.id),
            t: common_vendor.o(($event) => handleShare(post), post.id),
            v: post.id
          });
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/home.js.map
