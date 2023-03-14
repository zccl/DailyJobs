var e = require("../../@babel/runtime/helpers/interopRequireDefault"),
  t = require("../../@babel/runtime/helpers/defineProperty"),
  a = require("../../@babel/runtime/helpers/slicedToArray"),
  r = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  i = require("../../@babel/runtime/helpers/objectSpread2"),
  n = e(require("./plugins/index")),
  l = require("./core"),
  o = require("./render"),
  s = require("./helper"),
  d = require("./utils/index");

Component({
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0,
  },
  properties: {
    config: {
      type: Object,
      value: {},
    },
  },
  lifetimes: {
    attached: function () {
      this.initComp();
    },
  },
  methods: {
    initComp: function () {
      var e = this.setDefaultDisableDate();
      this.setConfig(e);
    },
    setDefaultDisableDate: function () {
      var e = this.properties.config || {};
      return (
        e.disableMode &&
          !e.disableMode.date &&
          (e.disableMode.date = d.dateUtil.toTimeStr(d.dateUtil.todayFMD())),
        e
      );
    },
    initCalendar: function (e) {
      var t = e.defaultDate,
        a = d.dateUtil.todayFMD();
      if (t && "string" == typeof t) {
        var r = t.split("-");
        if (r.length < 3)
          return d.logger.warn(
            "defaultDate配置格式应为: 2018-4-2 或 2018-04-02"
          );
        a = {
          year: +r[0],
          month: +r[1],
          date: +r[2],
        };
      }
      var n = (0, l.calcJumpData)({
          dateInfo: a,
          config: e,
        }),
        o = d.dateUtil.todayTimestamp();
      if (e.autoChoosedWhenJump) {
        var s = n.dates.filter(function (e) {
          return d.dateUtil.toTimeStr(e) === d.dateUtil.toTimeStr(a);
        });
        s &&
          s.length &&
          (n.selectedDates
            ? n.selectedDates.push(s[0])
            : (n.selectedDates = s));
      }
      return i(
        i({}, n),
        {},
        {
          todayTimestamp: o,
          weeksCh: d.dateUtil.getWeekHeader(e.firstDayOfWeek),
        }
      );
    },
    setConfig: function (e) {
      var t = this;
      e.markToday && "string" == typeof e.markToday && (e.highlightToday = !0),
        (e.theme = e.theme || "default"),
        this.setData(
          {
            config: e,
          },
          function () {
            var i,
              l = r(n.default.installed);
            try {
              for (l.s(); !(i = l.n()).done; ) {
                var s = i.value,
                  d = a(s, 2)[1];
                if (
                  ("function" == typeof d.install && d.install(t),
                  "function" == typeof d.methods)
                ) {
                  var c = d.methods(t);
                  for (var h in c)
                    if (!h.startsWith("__")) {
                      var u = c[h];
                      "function" == typeof u &&
                        (t.calendar || (t.calendar = {}), (t.calendar[h] = u));
                    }
                }
              }
            } catch (e) {
              e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(
                e
              );
              l.e(e);
            } finally {
              l.f();
            }
            var f = t.initCalendar(e);
            o.renderCalendar.call(t, f, e);
          }
        );
    },
    tapDate: function (e) {
      var t = this,
        i = e.currentTarget.dataset.info,
        l = i || {},
        s = l.date;
      if (!l.disable && s) {
        var d = this.data,
          c = d.calendar,
          h = d.config,
          u = c,
          f = h;
        if (h.takeoverTap) return this.triggerEvent("takeoverTap", i);
        var p,
          g = r(n.default.installed);
        try {
          for (g.s(); !(p = g.n()).done; ) {
            var v = p.value,
              m = a(v, 2)[1];
            if ("function" == typeof m.onTapDate) {
              var y = m.onTapDate(i, u, f),
                D = y.calendarData,
                C = y.calendarConfig;
              (u = D), (f = C);
            }
          }
        } catch (e) {
          e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(
            e
          );
          g.e(e);
        } finally {
          g.f();
        }
        o.renderCalendar.call(this, u, f).then(function () {
          t.triggerEvent("afterTapDate", i);
        });
      }
    },
    calendarTouchstart: function (e) {
      var t = e.touches[0],
        a = t.clientX,
        r = t.clientY;
      (this.swipeLock = !0),
        this.setData({
          "gesture.startX": a,
          "gesture.startY": r,
        });
    },
    calendarTouchmove: function (e) {
      var t = this.data.gesture,
        a = this.properties.config.preventSwipe;
      this.swipeLock &&
        !a &&
        (d.calendarGesture.isLeft(t, e.touches[0]) &&
          (this.handleSwipe("left"), (this.swipeLock = !1)),
        d.calendarGesture.isRight(t, e.touches[0]) &&
          (this.handleSwipe("right"), (this.swipeLock = !1)));
    },
    calendarTouchend: function (e) {
      this.setData({
        "calendar.leftSwipe": 0,
        "calendar.rightSwipe": 0,
      });
    },
    handleSwipe: function (e) {
      var a = "calendar.leftSwipe";
      "right" === e && (a = "calendar.rightSwipe"), this.setData(t({}, a, 1));
      var r = this.data.calendar,
        i = r.curYear,
        n = r.curMonth,
        l = (0, (0, s.calcTargetYMInfo)()[e])({
          year: +i,
          month: +n,
        });
      (l.direction = e), this.renderCalendar(l);
    },
    changeDate: function (e) {
      var t = e.currentTarget.dataset.type,
        a = this.data.calendar,
        r = a.curYear,
        i = a.curMonth,
        n = (0, (0, s.calcTargetYMInfo)()[t])({
          year: +r,
          month: +i,
        });
      (n.direction = t), this.renderCalendar(n);
    },
    renderCalendar: function (e) {
      var t,
        i = this,
        l = this.data,
        s = l.calendar,
        d = l.config,
        c = s || {},
        h = c.curYear,
        u = c.curMonth,
        f = r(n.default.installed);
      try {
        for (f.s(); !(t = f.n()).done; ) {
          var p = t.value,
            g = a(p, 2)[1];
          "function" == typeof g.onSwitchCalendar &&
            (s = g.onSwitchCalendar(e, s, this));
        }
      } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(
          e
        );
        f.e(e);
      } finally {
        f.f();
      }
      return o.renderCalendar.call(this, s, d).then(function () {
        var t = "whenChangeMonth";
        d.weekMode && (t = "whenChangeWeek"),
          i.triggerEvent(t, {
            current: {
              year: +h,
              month: +u,
            },
            next: e,
          }),
          i.triggerEvent("onSwipe", {
            current: {
              year: +h,
              month: +u,
            },
            next: e,
            type: t,
          });
      });
    },
    doubleClickJumpToToday: function () {
      var e = this.calendar.getCalendarConfig() || {},
        t = e.multi,
        a = e.weekMode;
      if (!t && !a)
        if (
          (void 0 === this.count ? (this.count = 1) : (this.count += 1),
          this.lastClick)
        ) {
          if (
            new Date().getTime() - this.lastClick < 500 &&
            this.count >= 2 &&
            "function" == typeof this.calendar.jump
          ) {
            var r = d.dateUtil.todayFMD();
            this.calendar.jump(r);
          }
          (this.count = void 0), (this.lastClick = void 0);
        } else this.lastClick = new Date().getTime();
    },
  },
});
