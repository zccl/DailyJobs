var e = require("../../@babel/runtime/helpers/interopRequireDefault"),
  t = e(require("../../component/calendar/plugins/todo")),
  a = e(require("../../component/calendar/plugins/index")),
  l = require("../../component/calendar/core"),
  o = require("../../common/common.js");

Page({
  data: {
    image_host: getApp().globalData.host + "/icons/",
    calendarConfig: {
      theme: "mark",
      weekMode: !1,
      markToday: "今",
      emphasisWeek: !0,
      hideHeader: !1,
      firstDayOfWeek: "Sun",
      onlyShowCurrentMonth: !0,
      highlightToday: !0,
      defaultDate: "",
      preventSwipe: !1,
      autoChoosedWhenJump: !0,
    },
    year: "",
    month: "",
    day: "",
    records: [],
    targets: [],
    dot_month: "",
  },
  onLoad: function (e) {
    a.default.use(t.default);
    this.mappingDate(o.todayDate());
    this.getRecords(o.todayDate());
  },
  mappingDate(date) {
    if (o.todayDate()) {
      const dateStrArr = date.split("-");
      this.setData({
        year: dateStrArr[0],
        month: dateStrArr[1],
        day: dateStrArr[2],
      });
    }
  },
  onShow: function () {
    this.getMonthData(o.todayDate().slice(0, 7));
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  afterCalendarRender: function (e) {
    this.setTodo(e.detail.calendar.curYear, e.detail.calendar.curMonth);
  },
  takeoverTap: function (e) {
    console.log("takeoverTap", e.detail);
  },
  afterTapDate: function (e) {
    var t = e.detail.year,
      a = e.detail.month,
      o = e.detail.date;
    a < 10 && (a = "0" + a),
      o < 10 && (o = "0" + o),
      this.mappingDate(t + "-" + a + "-" + o),
      this.getRecords(t + "-" + a + "-" + o);
  },
  onSwipe: function (e) {
    console.log("onSwipe", e.detail);
  },
  whenChangeWeek: function (e) {
    console.log("whenChangeWeek", e.detail);
  },
  whenChangeMonth(e) {
    let dateMonth = "" + e.detail.next.year + "-" + e.detail.next.month;
    if (e.detail.next.month < 10) {
      dateMonth = "" + e.detail.next.year + "-0" + e.detail.next.month;
    }
    this.getMonthData(dateMonth);
  },
  getMonthData(month) {
    wx.startPullDownRefresh();
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/punch/record/calendar?date=" +
        month,
      method: "get",
      header: o.header(),
      success: (res) => {
        if (200 == res.statusCode && res.data.code == 200) {
          wx.stopPullDownRefresh();
          var n = (0, l.calcJumpData)({
            dateInfo: {
              date: "13",
              month: "03",
              year: "2023",
            },
            config: this.data.calendarConfig,
          });
          const dates = n.dates.filter((i) => {
            const item = res.data.data.find((j) => {
              return j.taskDate.slice(8) == i.date;
            });
            if (item && item.isFinish == 0) {
              i.color = "#f56c6c";
            } else if (item && item.isFinish == 1) {
              i.color = "#07c160";
            }
            return i.color;
          });
          this.selectComponent(".calendar").calendar.setTodos({
            pos: "bottom",
            dotColor: "purple",
            circle: !1,
            showLabelAlways: !0,
            dates,
          });
          // this.setData({
          //   targets: res.data.data.records,
          // });
        }
      },
    });
    // if (!(o.todayDate().replaceAll("-", "") < e)) {
    //   var t = this,
    //     a = o.header();
    //   "" !== a &&
    //     (wx.request({
    //       url:
    //         getApp().globalData.host + "/mark/record/list/date?mark_date=" + e,
    //       method: "get",
    //       header: a,
    //       success: function (a) {
    //         200 == a.statusCode && a.data.error_code > 1e5
    //           ? o.showToast(a.data.error_msg)
    //           : 200 == a.statusCode && 0 == a.data.error_code
    //           ? t.setData({
    //               year: e.substr(0, 4),
    //               month: e.substr(4, 2),
    //               day: e.substr(6, 2),
    //               current_date: e,
    //               records: a.data.data,
    //             })
    //           : o.showToast("网络异常,请稍后重试");
    //       },
    //     }),
    //     o.todayDate().replaceAll("-", "") <= e ||
    //       wx.request({
    //         url: getApp().globalData.host + "/mark/target/list/date?date=" + e,
    //         method: "get",
    //         header: a,
    //         success: function (e) {
    //           if (200 == e.statusCode && e.data.error_code > 1e5)
    //             o.showToast(e.data.error_msg);
    //           else {
    //             if (200 != e.statusCode || 0 != e.data.error_code)
    //               return (
    //                 o.showToast("获取数据失败,请稍后重试"),
    //                 void log.warn("获取打卡任务列表失败", e.statusCode)
    //               );
    //             for (var a = 0; a < e.data.data.length; a++)
    //               if (!e.data.data[a].marked) {
    //                 !1;
    //                 break;
    //               }
    //             t.setData({
    //               targets: e.data.data,
    //             });
    //           }
    //         },
    //       }));
    // }
  },
  // getTargetList: function (e) {
  //   var date_str = e + "";
  //   var date =
  //     date_str.slice(0, 4) +
  //     "-" +
  //     date_str.slice(4, 6) +
  //     "-" +
  //     date_str.slice(6, 8);
  //   var o = this,
  //     r = t.header();
  //   if ("" !== r) {
  //     var s = 0;
  //     wx.startPullDownRefresh();
  //     wx.request({
  //       url:
  //         getApp().globalData.host +
  //         "/wander-daily/daily/task/my-list-date?date=" +
  //         date,
  //       method: "get",
  //       header: r,
  //       success: function (e) {
  //         // if (200 == e.statusCode && e.data.code > 200) {
  //         //   o.setData({
  //         //     targets: e.data.data,
  //         //     finish_all: r,
  //         //   })
  //         // }
  //         // return;
  //         if (200 == e.statusCode && e.data.code > 200) t.showToast(e.data.msg);
  //         else {
  //           if (200 != e.statusCode || 200 != e.data.code)
  //             return (
  //               t.showToast("获取数据失败,请稍后重试"),
  //               void a.warn("获取打卡任务列表失败", e.statusCode)
  //             );
  //           for (var r = !0, n = 0; n < e.data.data.length; n++)
  //             if (!e.data.data[n].punchStatus) {
  //               r = !1;
  //               break;
  //             }
  //           wx.hideLoading({
  //             success: function (t) {},
  //           });
  //           // var d = new Date(1e3 * s),
  //           //   i = new Date();
  //           // d.toDateString() != i.toDateString() &&
  //           //   (o.setData({
  //           //     modal_show: !0,
  //           //   }),
  //           //   wx.showModal({
  //           //     title: "异常提示",
  //           //     content: "系统时间错误,请更正后再打卡",
  //           //     showCancel: !1,
  //           //     complete: function () {
  //           //       o.setData({
  //           //         modal_show: !1,
  //           //       }),
  //           //         o.onShow();
  //           //     },
  //           //   })),
  //           (JSON.stringify(e.data.data) == JSON.stringify(o.data.targets) &&
  //             r == o.data.finish_all) ||
  //             (o.setData({
  //               targets: e.data.data,
  //               finish_all: r,
  //             }),
  //             console.log("页面数据已更新"));
  //         }
  //       },
  //       complete: () => {
  //         setTimeout(() => {
  //           wx.stopPullDownRefresh();
  //         }, 300);
  //       },
  //     });
  //     // wx.getStorageSync("new_notice_count") > 0 ||
  //     //   wx.request({
  //     //     url: getApp().globalData.host + "/mark/common/configs",
  //     //     method: "get",
  //     //     header: r,
  //     //     success: function (e) {
  //     //       200 == e.statusCode && e.data.code > 200
  //     //         ? t.showToast(e.data.msg)
  //     //         : 200 == e.statusCode && 0 == e.data.code
  //     //         ? e.data.data.new_notice_count > 0 &&
  //     //           (wx.showTabBarRedDot({
  //     //             index: 2,
  //     //           }),
  //     //           wx.setStorageSync(
  //     //             "new_notice_count",
  //     //             e.data.data.new_notice_count
  //     //           ))
  //     //         : a.warn("获取配置失败", e.statusCode);
  //     //     },
  //     //   });
  //   }
  // },
  getRecords(e) {
    wx.request({
      url:
        getApp().globalData.host +
        "/wander-daily/daily/task/my-list-date?date=" +
        e,
      method: "get",
      header: o.header(),
      success: (e) => {
        if (200 == e.statusCode && e.data.code == 200) {
          console.log(e.data.data);
          this.setData({
            records: [...e.data.data],
          });
        }
      },
    });
  },
  setTodo: function (e, t) {
    console.log("setTodo");
    return;
    if ((t < 10 && (t = "0" + t), (t = e + "" + t), this.data.dot_month != t)) {
      var a = this,
        r = o.header();
      "" !== r &&
        wx.request({
          url: getApp().globalData.host + "/mark/record/todo/month?month=" + t,
          method: "get",
          header: r,
          success: function (e) {
            if (200 == e.statusCode && e.data.error_code > 1e5)
              o.showToast(e.data.error_msg);
            else if (200 == e.statusCode && 0 == e.data.error_code) {
              for (var r = [], s = 0; s < e.data.data.length; s++) {
                var d = e.data.data[s],
                  n = "#67C23A";
                "red" == d.status
                  ? (n = "#F56C6C")
                  : "yellow" == d.status && (n = "#E6A23C"),
                  r.push({
                    year: d.date.substr(0, 4),
                    month: d.date.substr(4, 2),
                    date: d.date.substr(6, 2),
                    color: n,
                  });
              }
              a.selectComponent(".calendar").calendar.setTodos({
                pos: "bottom",
                dotColor: "purple",
                circle: !1,
                showLabelAlways: !0,
                dates: r,
              }),
                a.setData({
                  dot_month: t,
                });
            } else o.showToast("网络异常,请稍后重试");
          },
        });
    }
  },
  cancelRecord: function (e) {
    var t = e.target.dataset.id,
      a = this;
    wx.showModal({
      content: "撤销打卡后,记录将被删除!",
      confirmText: "确定",
      success: function (e) {
        if (e.confirm) a.cancelRecordConfirm(t);
        else if (e.cancel) return;
      },
    });
  },
  cancelRecordConfirm: function (e) {
    var t = this,
      a = o.header();
    "" !== a &&
      wx.request({
        url: getApp().globalData.host + "/mark/record/cancel?id=" + e,
        method: "post",
        header: a,
        success: function (e) {
          200 == e.statusCode && e.data.error_code > 1e5
            ? o.showToast(e.data.error_msg)
            : 200 == e.statusCode && 0 == e.data.error_code
            ? t.getRecords(t.data.year + "" + t.data.month + t.data.day)
            : o.showToast("网络异常,请稍后重试");
        },
      });
  },
});
