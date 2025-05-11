"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
const _sfc_main = {
  __name: "msg",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const createDialogVisible = common_vendor.ref(false);
    const searchUserText = common_vendor.ref("");
    const searchResults = common_vendor.ref([]);
    const chatList = common_vendor.ref([
      {
        id: "chat001",
        name: "张三",
        avatar: "https://placeholder.com/80x80",
        lastMessage: "你好，最近怎么样？",
        time: "10:30",
        unread: 2
      },
      {
        id: "chat002",
        name: "李四",
        avatar: "https://placeholder.com/80x80",
        lastMessage: "周末有空一起吃饭吗？",
        time: "昨天",
        unread: 0
      },
      {
        id: "chat003",
        name: "王五",
        avatar: "https://placeholder.com/80x80",
        lastMessage: "好的，没问题！",
        time: "周一",
        unread: 0
      }
    ]);
    const handleSearch = () => {
      common_vendor.index.showToast({
        title: "搜索功能开发中",
        icon: "none"
      });
    };
    const handleCreateChat = () => {
      createDialogVisible.value = true;
    };
    const handleSearchUser = () => {
      searchResults.value = [
        {
          id: "user001",
          username: "张三",
          avatar: "https://placeholder.com/80x80"
        },
        {
          id: "user002",
          username: "李四",
          avatar: "https://placeholder.com/80x80"
        }
      ];
    };
    const handleSelectUser = (user) => {
      createDialogVisible.value = false;
      common_vendor.index.navigateTo({
        url: `/pages/chat/detail?id=${user.id}`
      });
    };
    const handleChat = (chat) => {
      common_vendor.index.navigateTo({
        url: `/pages/chat/detail?id=${chat.id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: searchText.value,
        c: common_vendor.o(($event) => searchText.value = $event.detail.value),
        d: common_vendor.o(handleCreateChat),
        e: common_vendor.f(chatList.value, (chat, k0, i0) => {
          return common_vendor.e({
            a: chat.avatar,
            b: chat.unread
          }, chat.unread ? {
            c: common_vendor.t(chat.unread)
          } : {}, {
            d: common_vendor.t(chat.name),
            e: common_vendor.t(chat.time),
            f: common_vendor.t(chat.lastMessage),
            g: chat.id,
            h: common_vendor.o(($event) => handleChat(chat), chat.id)
          });
        }),
        f: common_vendor.o(($event) => createDialogVisible.value = false),
        g: common_vendor.o([($event) => searchUserText.value = $event.detail.value, handleSearchUser]),
        h: searchUserText.value,
        i: common_vendor.f(searchResults.value, (user, k0, i0) => {
          return {
            a: user.avatar,
            b: common_vendor.t(user.username),
            c: common_vendor.t(user.id),
            d: user.id,
            e: common_vendor.o(($event) => handleSelectUser(user), user.id)
          };
        }),
        j: common_vendor.sr("createPopup", "3f033b23-0"),
        k: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/msg.js.map
