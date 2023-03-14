var t = require("../../common/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    targets: [],
    cur_id: 0,
    cur_title: "",
    actionList: [
      {
        name: "邀请好友加入",
        openType: "share",
        value: 0,
      },
      {
        name: "修改任务",
        value: 1,
      },
      {
        name: "删除任务",
        color: "#ee0a24",
        value: 2,
      },
    ],
    showActionSheet: false,
    current: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.startPullDownRefresh();
  },
  onShareAppMessage() {
    return this.share();
  },
  share() {
    return {
      title: this.data.cur_title + ",一起自律起来吧",
      path: "pages/join/join?id=" + this.data.cur_id,
      imageUrl: "/images/share.png",
    };
  },
  getList(current = 1) {
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/my-list-create?current=1&size=10",
      method: "get",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.stopPullDownRefresh();
          this.setData({
            targets: res.data.data.records,
            current,
          });
        }
      },
    });
  },

  onPullDownRefresh() {
    this.getList();
  },
  onReachBottom() {
    this.getList(++this.data.current);
  },

  openActionSheet(e) {
    this.setData({
      showActionSheet: true,
      cur_id: e.currentTarget.dataset.id,
      cur_title: e.currentTarget.dataset.title,
    });
  },
  onClose() {
    this.setData({ showActionSheet: false });
  },
  onSelect(e) {
    switch (e.detail.value) {
      case 0:
        console.log("点击分享");
        break;
      case 1:
        this.edit();
        break;
      case 2:
        this.delete();
        break;
    }
  },
  edit() {
    wx.navigateTo({
      url: "/pages/target/edit_target?target_id=" + this.data.cur_id,
    });
  },
  delete() {
    // /wander-daily/daily/task/remove
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/remove?id=" +
        this.data.cur_id,
      method: "post",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.showToast({
            title: "删除完成~",
          });
          wx.startPullDownRefresh();
        }
      },
    });
  },
});
