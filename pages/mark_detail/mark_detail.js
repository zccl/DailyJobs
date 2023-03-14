var t = require("../../common/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    mention: "打卡~",
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    });
  },
  afterRead(e) {
    e.detail.file.forEach((i) => {
      this.doUpload(i.url);
    });
  },
  doUpload(filePath) {
    wx.uploadFile({
      url: getApp().globalData.host + "/wander-resource/oss/endpoint/put-file", //仅为示例，非真实的接口地址
      filePath,
      name: "file",
      header: t.header(),
      success: (res) => {
        // console.log("res", res); //经自己服务器存储后，将地址返回到客户端。
        if (res.statusCode != 200) {
          return;
        }
        res = JSON.parse(res.data);
        if (res.code != 200) {
          return;
        }
        const fileList = [...this.data.fileList];
        fileList.push({
          url: res.data.link,
        });
        this.setData({
          fileList,
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
  deleteImg(e) {
    const fileList = [...this.data.fileList];
    fileList.splice(e.detail.index, 1);
    this.setData({
      fileList,
    });
  },
  changeMention: function (t) {
    this.setData({
      mention: t.detail.value,
    });
  },
  markTarget() {
    if (this.data.mention.length < 1) t.showToast("请输入打卡内容再打卡~");
    var o = this,
      r = t.header();
    const picture = o.data.fileList.map((i) => {
      return i.url;
    });
    "" !== r &&
      (wx.showLoading(),
      wx.request({
        url:
          getApp().globalData.host +
          "/wander-daily/daily/punch/record/punch?id=" +
          o.data.id +
          "&mention=" +
          o.data.mention +
          "&picture=" +
          picture.join(","),
        method: "post",
        header: r,
        success: function (e) {
          200 == e.statusCode && e.data.code > 200
            ? t.showToast(e.data.msg)
            : 200 != e.statusCode || 200 != e.data.code
            ? (t.showToast("获取数据失败,请稍后重试"),
              a.warn("打卡失败", e.statusCode))
            : (wx.switchTab({
                url: "/pages/mark/mark",
              }),
              wx.vibrateShort({
                type: "light",
              }));
        },
        fail: function (e) {
          t.showToast("网络异常,请稍后重试"), a.warn("网络请求失败", e);
        },
        complete: () => {
          wx.hideLoading();
        },
      }));
  },
  addPic() {
    wx.showToast({
      icon: "none",
      title: "开发中...",
    });
  },
});
