var t = require("../../common/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    targets: [],
    actionList: [
      // {
      //   text: "邀请好友加入",
      //   value: 0,
      // },
      {
        text: "退出任务",
        type: "warn",
        value: 2,
      },
    ],
    action: 0,
    showActionSheet: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.getList();
  },

  getList() {
    const that = this;
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/my-list-join?current=1&size=10",
      method: "get",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.stopPullDownRefresh();
          that.setData({
            targets: res.data.data.records,
          });
        }
      },
    });
  },

  openActionSheet(e) {
    this.setData({
      showActionSheet: true,
      cur_id: e.currentTarget.dataset.id,
    });
  },
  closeDialog: function () {
    this.setData({
      showActionSheet: false,
      // current_target_id: 0,
    });
  },
  bindChange: function (e) {
    this.setData({
      action: e.detail.value,
    });
    if (e.detail.value == 2) {
      this.exit();
    }
    this.closeDialog();
  },
  exit() {
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/exit?id=" +
        this.data.cur_id,
      method: "post",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.showToast({
            title: "退出完成~",
          });
          wx.startPullDownRefresh();
        }
      },
    });
  },
});
