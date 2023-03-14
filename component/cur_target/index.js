var t = require("../../common/common.js"),
  a = require("../../common/data.js"),
  e = wx.getRealtimeLogManager(),
  r = [
    [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
    ],
    [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
    ],
  ],
  s = [10, 0, 21, 59],
  n = r[0][s[0]] + ":" + r[1][s[1]],
  c = r[2][s[2]] + ":" + r[3][s[3]];

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    edit_target_id: String,
  },
  data: {
    image_host: getApp().globalData.host + "/icons/",
    target_name: "",
    icon_colors: a.icon_colors(),
    icons: a.icons(),
    pick_icon: {},
    pick_color: "",
    start_date: "2023-01-20",
    end_date: "2024-01-20",
    time_pick_list: r,
    time_select: s,
    start_time: n,
    end_time: c,
  },
  lifetimes: {
    ready: function () {
      this.initComp();
    },
  },
  methods: {
    initComp() {
      var r = this;
      var s = {
        class_name: a.icons()[0].class_name,
        color: a.icon_colors()[5].color,
      };
      r.setData({
        pick_icon: s,
        pick_color: a.icon_colors()[5].color,
        start_date: t.todayDate(),
        begain_date: t.lastDayDate(),
        end_date: t.nextTodayDate(),
      }),
        r.setTargetSelect(r.data.edit_target_id);
    },
    setTargetSelect: function (a) {
      var e = "添加目标";
      if (0 != this.data.edit_target_id) {
        e = "修改目标";
        var i = this,
          o = t.header();
        if ("" === o) return;
        wx.startPullDownRefresh();
        wx.request({
          url:
            getApp().globalData.host +
            "/wander-daily/daily/task/detail?taskId=" +
            this.data.edit_target_id,
          method: "get",
          header: o,
          success: function (a) {
            if (200 == a.statusCode && a.data.code > 200)
              t.showToast(a.data.error_msg);
            else if (200 == a.statusCode && 200 == a.data.code) {
              var e = {
                class_name: a.data.data.icon,
                color: a.data.data.color,
              };
              for (
                var n = i.data.icons, c = i.data.icon_colors, _ = 0;
                _ < n.length;
                _++
              )
                (n[_].pick = !1),
                  n[_].icon == a.data.data.icon && (n[_].pick = !0);
              for (var l = 0; l < c.length; l++)
                (c[l].pick = !1),
                  c[l].color == a.data.data.color && (c[l].pick = !0);
              i.setData({
                target_name: a.data.data.title,
                pick_icon: e,
                start_date: a.data.data.start_time,
                end_date: a.data.data.end_time,
                start_time: a.data.data.executeStartTime,
                end_time: a.data.data.executeEndTime,
                // start_date: t.dateAddLine(a.data.data.start_date),
                // end_date: t.dateAddLine(a.data.data.end_date),
                start_date: a.data.data.startTime,
                end_date: a.data.data.endTime,
                pick_color: a.data.data.color,
                icons: n,
                icon_colors: c,
                // begain_date: t.dateAddLine(a.data.data.start_date),
              });
            } else t.showToast("网络异常,请稍后重试");
          },
          complete: () => {
            wx.stopPullDownRefresh();
          },
        });
      }
      wx.setNavigationBarTitle({
        title: e,
      });
    },
    submitTarget: function () {
      if ("" != this.data.target_name)
        if (this.data.target_name.length > 8)
          t.showToast("目标名称不能超过8个字符");
        else {
          var d = {
            id: this.data.edit_target_id || "",
            createUser: t.uid(),
            title: this.data.target_name,
            color: this.data.pick_color,
            icon: this.data.pick_icon.class_name,
            startTime: this.data.start_date,
            endTime: this.data.end_date,
            executeStartTime: this.data.start_time,
            executeEndTime: this.data.end_time,
          };
          r = t.header();
          "" !== r &&
            (wx.startPullDownRefresh(),
            wx.request({
              url: getApp().globalData.host + "/wander-daily/daily/task/create",
              method: "post",
              data: d,
              header: r,
              success: (a) => {
                if (!(200 == a.statusCode && a.data.code > 200))
                  return 200 != a.statusCode || 200 != a.data.code
                    ? (t.showToast("网络异常,请稍后重试"),
                      void e.warn("创建打卡任务失败", a.statusCode, d))
                    : void wx.navigateTo({
                        url:
                          "/pages/more/create?id=" + this.data.edit_target_id,
                      });
                t.showToast(a.data.msg);
              },
              fail: function (a) {
                t.showToast("网络异常,请稍后重试"),
                  e.warn("创建打卡任务失败", a, d);
              },
              complete: () => {
                wx.stopPullDownRefresh();
              },
            }));
        }
      else t.showToast("请输入目标名称");
    },
    changeTargetName: function (t) {
      this.setData({
        target_name: t.detail.value,
      });
    },
    pickColor: function (t) {
      const i = this.data.icon_colors;
      for (var a = 0; a < i.length; a++) i[a].pick = !1;
      i[t.target.dataset.id].pick = !0;
      var e = this.data.pick_icon;
      (e.color = i[t.target.dataset.id].color),
        this.setData({
          icon_colors: i,
          pick_icon: e,
          pick_color: i[t.target.dataset.id].color,
        });
    },
    pickIcon: function (t) {
      const o = this.data.icons;
      for (var a = 0; a < o.length; a++) o[a].pick = !1;
      o[t.target.dataset.id].pick = !0;
      var e = this.data.pick_icon;
      (e.class_name = o[t.target.dataset.id].class_name),
        this.setData({
          icons: o,
          pick_icon: e,
        });
    },
    pickDay: function (t) {
      console.log(t);
      d[t.target.dataset.id].pick = !d[t.target.dataset.id].pick;
      for (var a = "每天", e = 7, i = 0; i < d.length; i++)
        0 == d[i].pick && ((a = "每周"), e--);
      if (0 == e)
        return (
          wx.showToast({
            title: "不能全部取消哦!",
            icon: "none",
            duration: 1e3,
          }),
          void (d[t.target.dataset.id].pick = !d[t.target.dataset.id].pick)
        );
    },
    startDateChange: function (t) {
      t.detail.value >= this.data.end_date
        ? wx.showToast({
            title: "开始日期必须小于结束日期",
            icon: "none",
            duration: 1e3,
          })
        : this.setData({
            start_date: t.detail.value,
          });
    },
    endDateChange: function (t) {
      t.detail.value <= this.data.start_date
        ? wx.showToast({
            title: "结束日期必须大于开始日期",
            icon: "none",
            duration: 1e3,
          })
        : this.setData({
            end_date: t.detail.value,
          });
    },
    timeChange: function (t) {
      var a = t.detail.value;
      if (a[0] > a[2] || (a[0] == a[2] && a[1] >= a[3]))
        wx.showToast({
          title: "结束时间必须大于开始时间",
          icon: "none",
          duration: 1e3,
        });
      else {
        var e = r[0][a[0]] + ":" + r[1][a[1]],
          i = r[2][a[2]] + ":" + r[3][a[3]];
        this.setData({
          start_time: e,
          end_time: i,
        });
      }
    },
  },
});
