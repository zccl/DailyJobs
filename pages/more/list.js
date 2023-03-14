var t = require("../../common/common.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeList: [],
    showActionSheet: false,
    taskId: 0,
    typeIndex: 0,
    list: [],
    current: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTypeList();
    wx.startPullDownRefresh();
  },

  getTypeList() {
    wx.startPullDownRefresh();
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/punch/record/allUserTask",
      method: "get",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          const arr = res.data.data.map((item) => {
            return {
              text: item.title,
              value: item.id,
            };
          });
          arr.unshift({
            value: 0,
            text: "全部",
            type: "warn",
          });
          this.setData({
            typeList: arr,
          });
        }
      },
      complete: () => {
        wx.stopPullDownRefresh();
      },
    });
  },

  getList(current = 1) {
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/punch/record/page?size=10&current=" +
        current +
        (this.data.taskId ? "&taskId=" + this.data.taskId : ""),
      method: "get",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.stopPullDownRefresh();
          if (current == 1) {
            this.setData({
              list: [...res.data.data.records],
              current,
            });
          } else {
            this.setData({
              list: [...this.data.list, ...res.data.data.records],
              current,
            });
          }
        }
      },
      fail: (e) => {
        console.log(e);
      },
    });
  },

  onPullDownRefresh() {
    this.getList();
  },
  onReachBottom() {
    this.getList(++this.data.current);
  },

  openActionSheet() {
    this.setData({
      showActionSheet: true,
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
      taskId: e.detail.value,
      typeIndex: e.detail.index,
    });
    wx.startPullDownRefresh();
    this.closeDialog();
  },
});
