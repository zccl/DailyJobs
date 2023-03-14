var t = require("../../common/common.js"),
  a = wx.getRealtimeLogManager(),
  e = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");

Page({
  data: {
    image_host: getApp().globalData.host + "/icons/",
    date_time: [],
    pick_real_date: "",
    targets: [],
    finish_all: !1,
    modal_show: !1,
    nickName: "",
    avatarUrl: "",
  },
  onLoad(options) {
    this.getUserInfo();
    // this.load();
    // let that = this;
    // wx.getStorage({
    //   //异步获取缓存
    //   key: "userInfo", //本地缓存中指定的 key
    //   success: (res) => {
    //     console.log("获取缓存成功", res.data);
    //     this.setData({
    //       nickName: res.data.nickName, //将得到的缓存给key
    //       avatarUrl: res.data.avatarUrl,
    //     });
    //     this.load();
    //   },
    //   fail(res) {
    //     console.log(res);
    //     wx.showModal({
    //       title: "感谢您使用！",
    //       content: "请允许小程序可以使用您的头像昵称！",
    //       success(res) {
    //         if (res.confirm) {
    //           console.log("用户点击确定");
    //           that.getUserProfile();
    //         } else if (res.cancel) {
    //           console.log("用户点击取消");
    //         }
    //       },
    //     });
    //   },
    // });
  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: "用于保存用户的昵称", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log("getUserProfile", res);
  //       // this.setData({
  //       //   userInfo: res.userInfo,
  //       // });
  //       wx.setStorage({
  //         key: "userInfo", //本地缓存中指定的 key(类型：string)
  //         data: res.userInfo, //需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象(类型:any)
  //         success: (s) => {
  //           this.setData({
  //             avatarUrl: res.userInfo.avatarUrl,
  //             nickName: res.userInfo.nickName,
  //           });
  //           this.load();
  //         },
  //         fail: (f) => {
  //           //  console.log('存储缓存失败====',f);
  //         },
  //       });
  //     },
  //   });
  // },
  onShow: function () {
    this.load();
  },
  load: function () {
    if (!this.data.modal_show) {
      for (var a = [], o = -2; o <= 2; o++) {
        var r = new Date();
        r.setTime(r.getTime() + 24 * o * 3600 * 1e3);
        var s = r.getFullYear(),
          n = r.getMonth() + 1,
          d = r.getDate(),
          i = e[r.getDay()];
        0 === o && (i = "今天"),
          d < 10 && (d = "0" + d),
          n < 10 && (n = "0" + n);
        var c = {
          i: o + 2,
          week: i,
          date: d,
          mark: 0 === o,
          real_date: s + "" + n + d,
        };
        a.push(c);
      }
      this.setData({
        date_time: a,
        pick_real_date: a[2].real_date,
      }),
        t.setAccessToken(this.getTargetList, a[2].real_date);
    }
  },
  getUserInfo() {
    wx.request({
      url: getApp().globalData.host + "/wander-daily/daily/user/user-info",
      method: "GET",
      header: t.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.setStorage({
            key: "userInfo",
            data: res.data.data,
            success: function () {
              console.log("store userInfo success");
            },
          });
        }
      },
    });
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  clickDateTime: function (t) {
    for (var a = this.data.date_time, e = 0; e < 5; e++)
      (a[e].mark = !1), e === t.currentTarget.dataset.index && (a[e].mark = !0);
    this.setData({
      date_time: a,
      pick_real_date: a[t.currentTarget.dataset.index].real_date,
    }),
      this.getTargetList(t.currentTarget.dataset.date);
  },
  clickTargetShort: function (t) {
    this.clickTarget(t);
  },
  clickTarget: function (e) {
    if (this.data.pick_real_date > this.data.date_time[2].real_date)
      return (
        t.showToast("该任务还没有开始哦!"), void a.info("该任务还没有开始哦")
      );
    if (this.data.pick_real_date < this.data.date_time[2].real_date)
      return (
        t.showToast("该任务已经结束了哦!"), void a.info("该任务已经结束了哦")
      );
    this.markTargetBefore(e);
    // {
    //   var o = this,
    //     r = t.header();
    //   if ("" === r) return;
    //   wx.request({
    //     url: getApp().globalData.host + "/mark/user/make-up-count",
    //     method: "get",
    //     header: r,
    //     success: function (r) {
    //       if (200 == r.statusCode && r.data.code > 200) t.showToast(r.data.msg);
    //       else if (200 != r.statusCode || 0 != r.data.code)
    //         t.showToast("获取数据失败,请稍后重试"),
    //           a.warn("/mark/user/make-up-count获取数据失败", r.statusCode);
    //       else if (r.data.data.month_count < 0) o.markTargetBefore(e);
    //       else if (0 == r.data.data.remain_count)
    //         t.showToast("本月补卡次数已使用完毕!"), a.info("补卡次数已用完");
    //       else {
    //         var s =
    //           "每月赠送您" +
    //           r.data.data.month_count +
    //           "次补卡机会,剩余" +
    //           r.data.data.remain_count +
    //           "次,下次记得及时打卡哦^_^";
    //         o.setData({
    //           modal_show: !0,
    //         }),
    //           wx.showModal({
    //             title: "补卡提示",
    //             content: s,
    //             confirmText: "补卡",
    //             success: function (t) {
    //               if (t.confirm) o.markTargetBefore(e);
    //               else if (t.cancel) return void a.info("取消补卡弹窗");
    //             },
    //             complete: function () {
    //               o.setData({
    //                 modal_show: !1,
    //               });
    //             },
    //           });
    //       }
    //     },
    //   });
    // }
  },
  markTargetBefore: function (t) {
    if (t.currentTarget.dataset.punchstatus) {
      wx.showToast({
        title: "这个任务已经打卡了哦~",
        icon: "none",
      });
      return;
    }
    wx.navigateTo({
      url: "/pages/mark_detail/mark_detail?id=" + t.currentTarget.dataset.rid,
    });
    return;
    for (var a = this.data.targets, e = [], o = 0; o < a.length; o++)
      o !== t.currentTarget.dataset.index && e.push(a[o]);
    var r = "#card_" + t.currentTarget.dataset.index;
    console.log(r);
    this.animate(
      r,
      [
        {
          opacity: 1,
          rotate: 0,
        },
        {
          opacity: 0,
          rotate: 0,
          offset: 0.9,
        },
      ],
      150,
      function () {
        this.setData({
          targets: [],
        }),
          this.markTarget(t.currentTarget.dataset.tid);
      }.bind(this)
    );
  },
  getTargetList: function (e) {
    var date_str = e + "";
    var date =
      date_str.slice(0, 4) +
      "-" +
      date_str.slice(4, 6) +
      "-" +
      date_str.slice(6, 8);
    var o = this,
      r = t.header();
    if ("" !== r) {
      var s = 0;
      wx.startPullDownRefresh();
      wx.request({
        url:
          getApp().globalData.host +
          "/wander-daily/daily/task/my-list-date?date=" +
          date,
        method: "get",
        header: r,
        success: function (e) {
          // if (200 == e.statusCode && e.data.code > 200) {
          //   o.setData({
          //     targets: e.data.data,
          //     finish_all: r,
          //   })
          // }
          // return;
          if (200 == e.statusCode && e.data.code > 200) t.showToast(e.data.msg);
          else {
            if (200 != e.statusCode || 200 != e.data.code)
              return (
                t.showToast("获取数据失败,请稍后重试"),
                void a.warn("获取打卡任务列表失败", e.statusCode)
              );
            for (var r = !0, n = 0; n < e.data.data.length; n++)
              if (!e.data.data[n].punchStatus) {
                r = !1;
                break;
              }
            wx.hideLoading({
              success: function (t) {},
            });
            // var d = new Date(1e3 * s),
            //   i = new Date();
            // d.toDateString() != i.toDateString() &&
            //   (o.setData({
            //     modal_show: !0,
            //   }),
            //   wx.showModal({
            //     title: "异常提示",
            //     content: "系统时间错误,请更正后再打卡",
            //     showCancel: !1,
            //     complete: function () {
            //       o.setData({
            //         modal_show: !1,
            //       }),
            //         o.onShow();
            //     },
            //   })),
            (JSON.stringify(e.data.data) == JSON.stringify(o.data.targets) &&
              r == o.data.finish_all) ||
              (o.setData({
                targets: e.data.data,
                finish_all: r,
              }),
              console.log("页面数据已更新"));
          }
        },
        complete: () => {
          setTimeout(() => {
            wx.stopPullDownRefresh();
          }, 300);
        },
      });
      // wx.getStorageSync("new_notice_count") > 0 ||
      //   wx.request({
      //     url: getApp().globalData.host + "/mark/common/configs",
      //     method: "get",
      //     header: r,
      //     success: function (e) {
      //       200 == e.statusCode && e.data.code > 200
      //         ? t.showToast(e.data.msg)
      //         : 200 == e.statusCode && 0 == e.data.code
      //         ? e.data.data.new_notice_count > 0 &&
      //           (wx.showTabBarRedDot({
      //             index: 2,
      //           }),
      //           wx.setStorageSync(
      //             "new_notice_count",
      //             e.data.data.new_notice_count
      //           ))
      //         : a.warn("获取配置失败", e.statusCode);
      //     },
      //   });
    }
  },
});
