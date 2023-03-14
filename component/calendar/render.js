var e = require("../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.renderCalendar = function (e, d) {
    var l = this;
    return new Promise(function (f) {
      var o = l;
      void 0 === o.firstRender ? (o.firstRender = !0) : (o.firstRender = !1);
      var s,
        u = o.data.calendar || {},
        c = a(t.default.installed);
      try {
        for (c.s(); !(s = c.n()).done; ) {
          var b = s.value,
            p = n(b, 2)[1];
          if ("function" == typeof p.beforeRender) {
            var v = p.beforeRender(
                r(r({}, u), e),
                d || (0, i.getCalendarConfig)(o),
                o
              ),
              R = v.calendarData,
              g = v.calendarConfig;
            (e = R), (d = g);
          }
        }
      } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(
          e
        );
        c.e(e);
      } finally {
        c.f();
      }
      o.setData(
        {
          config: d,
          calendar: e,
        },
        function () {
          var r = {
            calendar: e,
            config: d,
            firstRender: o.firstRender,
          };
          f(r),
            o.firstRender &&
              (o.triggerEvent("afterCalendarRender", r), (o.firstRender = !1));
        }
      );
    });
  });

var r = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/slicedToArray"),
  a = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  t = e(require("./plugins/index")),
  i = require("./utils/index");
