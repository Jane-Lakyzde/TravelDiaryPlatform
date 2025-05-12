"use strict";
const common_vendor = require("../../common/vendor.js");
const data_posts = require("../../data/posts.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    common_vendor.ref("");
    const showSidebar = common_vendor.ref(false);
    const activeTab = common_vendor.ref("discover");
    const posts = common_vendor.computed(() => {
      return activeTab.value === "discover" ? data_posts.getDiscoverPosts() : data_posts.getFollowedPosts();
    });
    const leftPosts = common_vendor.computed(() => {
      const allPosts = posts.value;
      const midIndex = Math.ceil(allPosts.length / 2);
      return allPosts.slice(0, midIndex);
    });
    const rightPosts = common_vendor.computed(() => {
      const allPosts = posts.value;
      const midIndex = Math.ceil(allPosts.length / 2);
      return allPosts.slice(midIndex);
    });
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
          return {
            a: post.cover,
            b: common_vendor.t(post.title),
            c: post.avatar,
            d: common_vendor.t(post.author),
            e: common_vendor.t(post.likes),
            f: post.id
          };
        }),
        B: common_vendor.f(rightPosts.value, (post, k0, i0) => {
          return {
            a: post.cover,
            b: common_vendor.t(post.title),
            c: post.avatar,
            d: common_vendor.t(post.author),
            e: common_vendor.t(post.likes),
            f: post.id
          };
        })
      } : {
        C: common_vendor.f(leftPosts.value, (post, k0, i0) => {
          return {
            a: post.cover,
            b: common_vendor.t(post.title),
            c: post.avatar,
            d: common_vendor.t(post.author),
            e: common_vendor.t(post.likes),
            f: post.id
          };
        }),
        D: common_vendor.f(rightPosts.value, (post, k0, i0) => {
          return {
            a: post.cover,
            b: common_vendor.t(post.title),
            c: post.avatar,
            d: common_vendor.t(post.author),
            e: common_vendor.t(post.likes),
            f: post.id
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/home.js.map
