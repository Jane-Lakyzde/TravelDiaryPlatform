"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_post = require("../../store/modules/post.js");
const store_modules_user = require("../../store/modules/user.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const postStore = store_modules_post.usePostStore();
    const userStore = store_modules_user.useUserStore();
    const post = common_vendor.ref(null);
    const comments = common_vendor.ref([]);
    const commentText = common_vendor.ref("");
    const isLiked = common_vendor.ref(false);
    const isFollowed = common_vendor.ref(false);
    const getPostDetail = (id) => {
      const postDetail = postStore.getPostDetail(id);
      if (postDetail) {
        post.value = postDetail;
        isLiked.value = postDetail.isLiked;
        isFollowed.value = !!postDetail.isFollowed;
      }
    };
    const getComments = (postId) => {
      comments.value = postStore.getPostComments(postId);
    };
    const sendComment = () => {
      if (!commentText.value.trim()) {
        common_vendor.index.showToast({ title: "请输入评论内容", icon: "none" });
        return;
      }
      const newComment = {
        id: Date.now().toString(),
        content: commentText.value,
        createTime: (/* @__PURE__ */ new Date()).toLocaleString(),
        user: {
          username: userStore.getUserInfo.username,
          avatar: userStore.getUserInfo.avatar
        }
      };
      postStore.addComment(post.value.id, newComment);
      comments.value = postStore.getPostComments(post.value.id);
      commentText.value = "";
      common_vendor.index.showToast({ title: "评论成功", icon: "success" });
    };
    const handleLike = () => {
      postStore.toggleLike(post.value.id);
      isLiked.value = post.value.isLiked;
    };
    const toggleFollow = () => {
      isFollowed.value = !isFollowed.value;
      post.value.isFollowed = isFollowed.value;
      if (isFollowed.value) {
        userStore.userInfo.following = (userStore.userInfo.following || 0) + 1;
      } else {
        userStore.userInfo.following = Math.max((userStore.userInfo.following || 1) - 1, 0);
      }
    };
    const handleShare = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        urls: post.value.images,
        current: index
      });
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const postId = currentPage.options.id;
      getPostDetail(postId);
      getComments(postId);
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: ((_b = (_a = post.value) == null ? void 0 : _a.author) == null ? void 0 : _b.avatar) || "/static/images/touxiang.jpg",
        c: common_vendor.t((_d = (_c = post.value) == null ? void 0 : _c.author) == null ? void 0 : _d.username),
        d: common_vendor.t(isFollowed.value ? "已关注" : "关注"),
        e: isFollowed.value ? 1 : "",
        f: common_vendor.o(toggleFollow),
        g: common_vendor.o(handleShare),
        h: (_e = post.value) == null ? void 0 : _e.video
      }, ((_f = post.value) == null ? void 0 : _f.video) ? {
        i: post.value.video
      } : common_vendor.e({
        j: (_h = (_g = post.value) == null ? void 0 : _g.images) == null ? void 0 : _h.length
      }, ((_j = (_i = post.value) == null ? void 0 : _i.images) == null ? void 0 : _j.length) ? {
        k: common_vendor.f(post.value.images, (img, idx, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => previewImage(idx), idx),
            c: idx
          };
        }),
        l: post.value.images.length > 1
      } : {}), {
        m: common_vendor.t((_k = post.value) == null ? void 0 : _k.title),
        n: common_vendor.t((_l = post.value) == null ? void 0 : _l.content),
        o: (_m = post.value) == null ? void 0 : _m.location
      }, ((_n = post.value) == null ? void 0 : _n.location) ? {
        p: common_vendor.t(post.value.location)
      } : {}, {
        q: common_vendor.t(comments.value.length),
        r: common_vendor.f(comments.value, (comment, k0, i0) => {
          return {
            a: comment.user.avatar || "/static/images/touxiang.jpg",
            b: common_vendor.t(comment.user.username),
            c: common_vendor.t(comment.createTime),
            d: common_vendor.t(comment.content),
            e: comment.id
          };
        }),
        s: common_vendor.o(sendComment),
        t: commentText.value,
        v: common_vendor.o(($event) => commentText.value = $event.detail.value),
        w: isLiked.value ? 1 : "",
        x: common_vendor.o(handleLike),
        y: common_vendor.t((_o = post.value) == null ? void 0 : _o.likes),
        z: common_vendor.t(((_p = post.value) == null ? void 0 : _p.stars) || 0),
        A: common_vendor.t(comments.value.length)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/post/detail.js.map
