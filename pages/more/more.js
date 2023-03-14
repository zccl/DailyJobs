var n = require("../../common/common");

Page({
  data: {
    menus: [
      {
        icon: "list.png",
        name: "打卡记录",
        url: "/pages/more/list",
      },
      {
        icon: "calendar.png",
        name: "打卡日历",
        url: "/pages/more/calendar",
      },
      {
        icon: "about.png",
        name: "关于",
        url: "/pages/more/about",
      },
      // {
      //   icon: "feedback.png",
      //   name: "意见反馈",
      //   url: "/pages/more/feedback",
      // },
      // {
      //   icon: "notice.png",
      //   name: "我的消息",
      //   url: "/pages/more/notice",
      // },
    ],
    uid: "",
    nickName: "",
    input_nickName: "",
    avatar: "",
    version: "0.0.0",
    editing: false,
  },
  onLoad: function (n) {
    this.setData({
      uid: wx.getStorageSync("uid") || "",
      nickName:
        wx.getStorageSync("userInfo").wxNickname ||
        "微信用户" + wx.getStorageSync("uid"),
      avatar:
        wx.getStorageSync("userInfo").avatarUrl || "/images/avatar-common.png",
    }),
      this.setData({
        version: getApp().globalData.version,
      });
  },
  onReady: function () {},
  onShow: function () {
    if ("" != n.uid()) {
      var e = wx.getStorageSync("new_notice_count");
      "number" != typeof e && (e = 0),
        wx.hideTabBarRedDot({
          index: 2,
        });
    }
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {},
  // onShareAppMessage: function () {
  //   return n.share();
  // },
  tabMore: function (n) {
    var e = n.currentTarget.dataset.url;
    wx.navigateTo({
      url: e,
    });
  },
  handleEdit() {
    this.setData({
      editing: true,
      input_nickName: this.data.nickName,
    });
  },
  inputNickname(e) {
    const val = e.detail.value.trim();
    if (!val) {
      return;
    }
    this.setData({
      input_nickName: val,
    });
  },
  onSaveAvatarNickname() {
    if (this.data.input_nickName) {
      // 设置昵称
      wx.login({
        timeout: 3e3,
        success: (n) => {
          wx.request({
            url:
              getApp().globalData.host +
              "/wander-auth/oauth/token?code=" +
              n.code +
              "&grant_type=mini_app&scope=all&wxNickname=" +
              this.data.input_nickName,
            // &avatarUrl=" +res.data.avatarUrl +"&wxNickname=" +res.data.nickName
            method: "post",
            header: {
              "content-type": "application/json",
              Authorization:
                "Basic d2FuZGVyX21pbmlfYXBwOndhbmRlcl9taW5pX2FwcF9zZWNyZXQ=",
              "Tenant-Id": "000000",
            },
            success: (n) => {
              wx.setStorage({
                key: "access_token",
                data: n.data.token_type + " " + n.data.access_token,
                success: function () {
                  console.log("store access_token success");
                },
              });
              wx.setStorage({
                key: "uid",
                data: n.data.user_id,
                success: function () {
                  console.log("store uid success");
                },
              });
              this.setData({
                nickName: this.data.input_nickName,
                input_nickName: "",
              });
            },
            fail: function (t) {
              wx.showToast({
                title: "请求失败,请稍后重试",
                icon: "none",
                duration: 1e3,
              });
            },
          });
        },
        fail: function (t) {
          console.log("获取code失败", t);
        },
        complete: () => {
          this.setData({
            editing: false,
          });
        },
      });
    } else {
      this.setData({
        editing: false,
      });
    }
  },
  onChooseAvatar(e) {
    wx.startPullDownRefresh();
    wx.uploadFile({
      url: getApp().globalData.host + "/wander-resource/oss/endpoint/put-file", //仅为示例，非真实的接口地址
      filePath: e.detail.avatarUrl,
      name: "file",
      header: n.header(),
      success: (res) => {
        // console.log("res", res); //经自己服务器存储后，将地址返回到客户端。
        res = JSON.parse(res.data);
        if (res.code != 200) {
          return;
        }
        wx.login({
          timeout: 3e3,
          success: (n) => {
            wx.request({
              url:
                getApp().globalData.host +
                "/wander-auth/oauth/token?code=" +
                n.code +
                "&grant_type=mini_app&scope=all&avatarUrl=" +
                res.data.link,
              // &avatarUrl=" +res.data.avatarUrl +"&wxNickname=" +res.data.nickName
              method: "post",
              header: {
                "content-type": "application/json",
                Authorization:
                  "Basic d2FuZGVyX21pbmlfYXBwOndhbmRlcl9taW5pX2FwcF9zZWNyZXQ=",
                "Tenant-Id": "000000",
              },
              success: (n) => {
                wx.setStorage({
                  key: "access_token",
                  data: n.data.token_type + " " + n.data.access_token,
                  success: function () {
                    console.log("store access_token success");
                  },
                });
                wx.setStorage({
                  key: "uid",
                  data: n.data.user_id,
                  success: function () {
                    console.log("store uid success");
                  },
                });
                this.setData({
                  avatar: res.data.link,
                });
              },
              fail: function (t) {
                wx.showToast({
                  title: "请求失败,请稍后重试",
                  icon: "none",
                  duration: 1e3,
                });
              },
            });
          },
          fail: function (t) {
            console.log("获取code失败", t);
          },
        });
      },
      fail(err) {
        console.log("err", err);
      },
      complete: () => {
        wx.stopPullDownRefresh();
      },
    });
  },
});
