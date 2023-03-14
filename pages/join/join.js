var t = require("../../common/common.js");

Page({
  data: {
    image_host: getApp().globalData.host + "/icons/",
    item: {
      // icon: "bicycle",
      // color: "D8CDB2",
      // title: "骑车",
      // executeStartTime: "00:00",
      // executeEndTime: "23:59",
      // startTime: "2023-03-07",
      // endTime: "2024-03-07",
    },
  },
  onLoad(options) {
    this.setData({
      // id: "1635284675896340481",
      id: options.id,
    });
    this.load();
  },
  load: function () {
    wx.showLoading({
      title: "获取打卡数据中",
    });
    wx.removeStorageSync("access_token");
    t.setAccessToken(this.getItem, "请求打卡信息, 加入打卡嘞~");
  },
  getItem(str) {
    if (!this.data.id) {
      wx.hideLoading();
      return;
    }
    console.log(str);
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/detail?taskId=" +
        this.data.id,
      method: "get",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          this.setData({
            item: { ...res.data.data },
          });
        }
      },
      complete() {
        wx.hideLoading();
      },
    });
  },
  join() {
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/check?id=" +
        this.data.id,
      method: "get",
      header: t.header(),
      success: (res) => {
        console.log(res);
        if (200 == res.statusCode && res.data.code == 200) {
          if (res.data.data) {
            wx.showToast({
              title: "已加入该任务~",
              icon: "none",
            });
          } else {
            wx.request({
              url:
                getApp().globalData.host +
                "/wander-daily/daily/task/join?id=" +
                this.data.id,
              method: "post",
              header: t.header(),
              success: (res) => {
                if (200 == res.statusCode && res.data.code == 200) {
                  wx.showToast({
                    title: "加入成功, 祝你在变好的路上越走越远~",
                  });
                  wx.switchTab({
                    url: "/pages/mark/mark",
                  });
                }
              },
            });
          }
        }
      },
    });
  },
  // onShareAppMessage: function () {
  //   return t.share();
  // },
});
