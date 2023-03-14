function t(t, e) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * t + 1, 10);

    case 2:
      return parseInt(Math.random() * (e - t + 1) + t, 10);

    default:
      return 0;
  }
}

function e(t) {
  wx.showToast({
    title: t,
    icon: "none",
    duration: 1e3,
  });
}

function n() {
  try {
    var t = wx.getStorageSync("access_token");
    if (t) return t;
  } catch (t) {
    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
    e("获取数据异常");
  }
  return "";
}

function o(e) {
  // wx.clearStorageSync();
  // setTimeout(function () {
  //   wx.reLaunch({
  //     url: "/pages/mark/mark",
  //   });
  // }, 1500),
  //   console.log("relaunch"),
  //   wx.showToast({
  //     title: "数据获取异常,将重新加载",
  //     icon: "none",
  //     duration: 1500,
  //   });
}

module.exports = {
  randomNum: t,
  randomColor: function () {
    for (var e = "", n = 0; n < 3; n++) {
      e += t(50, 200).toString(16);
    }
    return e;
  },
  todayDate: function () {
    var t = new Date(),
      e = t.getFullYear(),
      n = t.getMonth() + 1;
    n < 10 && (n = "0" + n);
    var o = t.getDate();
    return o < 10 && (o = "0" + o), e + "-" + n + "-" + o;
  },
  nextTodayDate: function () {
    var t = new Date(),
      e = t.getFullYear() + 1,
      n = t.getMonth() + 1;
    n < 10 && (n = "0" + n);
    var o = t.getDate();
    return o < 10 && (o = "0" + o), e + "-" + n + "-" + o;
  },
  lastDayDate: function () {
    var t = new Date();
    t.setTime(t.getTime() - 864e5);
    var e = t.getFullYear(),
      n = t.getMonth() + 1;
    n < 10 && (n = "0" + n);
    var o = t.getDate();
    return o < 10 && (o = "0" + o), e + "-" + n + "-" + o;
  },
  setAccessToken: function (t, e) {
    "" == n()
      ? wx.login({
          timeout: 3e3,
          success: function (n) {
            wx.request({
              url:
                getApp().globalData.host +
                "/wander-auth/oauth/token?code=" +
                n.code +
                "&grant_type=mini_app&scope=all",
              // &avatarUrl=" +res.data.avatarUrl +"&wxNickname=" +res.data.nickName
              method: "post",
              header: {
                "content-type": "application/json",
                Authorization:
                  "Basic d2FuZGVyX21pbmlfYXBwOndhbmRlcl9taW5pX2FwcF9zZWNyZXQ=",
                "Tenant-Id": "000000",
              },
              success: function (n) {
                wx.setStorage({
                  key: "access_token",
                  data: n.data.token_type + " " + n.data.access_token,
                  success: function () {
                    console.log("store access_token success"), t(e);
                  },
                });
                wx.setStorage({
                  key: "uid",
                  data: n.data.user_id,
                  success: function () {
                    console.log("store uid success");
                  },
                });
              },
              fail: function (t) {
                console.log("login failed", t);
                wx.showToast({
                  title: "获取数据失败,请稍后重试",
                  icon: "none",
                  duration: 1e3,
                });
              },
            });
            // wx.getStorage({
            //   //异步获取缓存
            //   key: "userInfo", //本地缓存中指定的 key
            //   success: (res) => {
            //     console.log("获取缓存成功", res.data);
            //     wx.request({
            //       url:
            //         getApp().globalData.host +
            //         "/wander-auth/oauth/token?code=" +
            //         n.code +
            //         "&grant_type=mini_app&scope=all&avatarUrl=" +
            //         res.data.avatarUrl +
            //         "&wxNickname=" +
            //         res.data.nickName,
            //       method: "post",
            //       header: {
            //         "content-type": "application/json",
            //         Authorization:
            //           "Basic d2FuZGVyX21pbmlfYXBwOndhbmRlcl9taW5pX2FwcF9zZWNyZXQ=",
            //         "Tenant-Id": "000000",
            //       },
            //       success: function (n) {
            //         // 200 == n.statusCode && 200 == n.data.error_code
            //         wx.setStorage({
            //           key: "access_token",
            //           data: n.data.token_type + " " + n.data.access_token,
            //           success: function () {
            //             console.log("store access_token success"), t(e);
            //           },
            //         });
            //         wx.setStorage({
            //           key: "uid",
            //           data: n.data.user_id,
            //           success: function () {
            //             console.log("store uid success");
            //           },
            //         });
            //         // : wx.showToast({
            //         //     title: "获取数据失败,请稍后重试",
            //         //     icon: "none",
            //         //     duration: 1e3,
            //         //   });
            //       },
            //       fail: function (t) {
            //         console.log("login failed", t);
            //       },
            //     });
            //   },
            //   fail(res) {
            //     console.log(res);
            //   },
            // });
          },
          fail: function (t) {
            console.log("获取code失败", t);
          },
        })
      : t(e);
  },
  getOpenId: n,
  showToast: e,
  relaunch: o,
  header: function () {
    var t = n();
    return t
      ? {
          Authorization:
            "Basic d2FuZGVyX21pbmlfYXBwOndhbmRlcl9taW5pX2FwcF9zZWNyZXQ=",
          "Tenant-Id": "000000",
          "Wander-Auth": t,
          "X-VERSION": getApp().globalData.version,
        }
      : (o(), "");
  },
  uid: function () {
    var t = wx.getStorageSync("uid");
    return t || (o(), "");
  },
  share: function () {
    return {
      title: "日常打卡,跟我一起自律起来吧",
      path: "pages/mark/mark",
      imageUrl: "/images/share.jpeg",
    };
  },
  dateAddLine: function (t) {
    return 8 != t.length
      ? t
      : t.substr(0, 4) + "-" + t.substr(4, 2) + "-" + t.substr(6, 2);
  },
};
