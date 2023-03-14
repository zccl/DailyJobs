var t = require("../../common/common.js");

Page({
  data: {
    image_host: getApp().globalData.host + "/icons/",
    targets: [],
    showDialog: !1,
    groups: [
      {
        text: "修改目标",
        value: 1,
      },
      {
        text: "删除目标",
        type: "warn",
        value: 2,
      },
    ],
    current_target_id: 0,
  },
  onLoad: function (t) {},
  onReady: function () {},
  onShow: function () {
    this.requestTargetList();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.requestTargetList();
  },
  onReachBottom: function () {
    this.requestTargetList();
  },
  // onShareAppMessage: function () {
  //   return t.share();
  // },
  requestTargetList: function () {
    var e = this,
      a = t.header();
    "" !== a &&
      wx.request({
        url: getApp().globalData.host + "/mark/target/list",
        method: "get",
        header: a,
        success: function (a) {
          wx.stopPullDownRefresh(),
            200 == a.statusCode && a.data.error_code > 1e5
              ? t.showToast(a.data.error_msg)
              : 200 == a.statusCode && 0 == a.data.error_code
              ? JSON.stringify(a.data.data) != JSON.stringify(e.data.targets) &&
                (e.setData({
                  targets: a.data.data,
                }),
                console.log("页面数据已更新"))
              : t.showToast("获取数据失败,请稍后重试");
        },
      });
  },
  openDialog: function (t) {
    this.setData({
      showDialog: !0,
      current_target_id: t.currentTarget.dataset.id,
    });
  },
  closeDialog: function () {
    this.setData({
      showDialog: !1,
      current_target_id: 0,
    });
  },
  btnClick: function (e) {
    var a = e.detail.value;
    if (1 == a)
      wx.navigateTo({
        url:
          "/pages/target/add_target?target_id=" + this.data.current_target_id,
      });
    else if (2 == a) {
      var r = this,
        o = t.header();
      if ("" === o) return;
      wx.request({
        url: getApp().globalData.host + "/mark/target/delete",
        method: "post",
        data: {
          target_id: this.data.current_target_id,
        },
        header: o,
        success: function (e) {
          200 == e.statusCode && e.data.error_code > 1e5
            ? t.showToast(e.data.error_msg)
            : 200 == e.statusCode && 0 == e.data.error_code
            ? r.requestTargetList()
            : t.showToast("操作失败,请稍后重试");
        },
      });
    }
    this.closeDialog();
  },
});
