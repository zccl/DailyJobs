var e = require("../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCalendarData = exports.getCalendarConfig = exports.dateUtil = exports.calendarGesture = void 0, 
exports.getComponentById = function(e) {
    var t = new u.default(), r = v() || {};
    if (r.selectComponent && "function" == typeof r.selectComponent) {
        if (e) return r.selectComponent(e);
        t.warn("请传入组件ID");
    } else t.warn("该基础库暂不支持多个小程序日历组件");
}, exports.getCurrentPage = v, exports.getSystemInfo = l, exports.isIos = c, exports.setCalendarData = exports.setCalendarConfig = exports.logger = void 0;

var t = require("../../../@babel/runtime/helpers/objectSpread2"), r = require("../../../@babel/runtime/helpers/slicedToArray");

require("../../../@babel/runtime/helpers/Arrayincludes");

var n, a = require("../../../@babel/runtime/helpers/classCallCheck"), o = require("../../../@babel/runtime/helpers/createClass"), u = e(require("./logger")), i = e(require("./wxData"));

function l() {
    return n || (n = wx.getSystemInfoSync());
}

function c() {
    var e = l();
    return /iphone|ios/i.test(e.platform);
}

var f = function() {
    function e() {
        a(this, e);
    }
    return o(e, [ {
        key: "isLeft",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = e.startX, n = e.startY, a = t.clientX - r, o = t.clientY - n;
            return a < -60 && o < 20 && o > -20;
        }
    }, {
        key: "isRight",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = e.startX, n = e.startY, a = t.clientX - r, o = t.clientY - n;
            return a > 60 && o < 20 && o > -20;
        }
    } ]), e;
}(), s = function() {
    function e() {
        a(this, e);
    }
    return o(e, [ {
        key: "newDate",
        value: function(e, t, r) {
            var n = "".concat(+e, "-").concat(+t, "-").concat(+r);
            return c() && (n = "".concat(+e, "/").concat(+t, "/").concat(+r)), new Date(n);
        }
    }, {
        key: "getTimeStamp",
        value: function(t) {
            if ("string" == typeof t && (t = this.transformDateRow2Dict(t)), "[object Object]" === Object.prototype.toString.call(t)) return new e().newDate(t.year, t.month, t.date).getTime();
        }
    }, {
        key: "getDatesCountOfMonth",
        value: function(e, t) {
            return new Date(Date.UTC(e, t, 0)).getUTCDate();
        }
    }, {
        key: "firstDayOfWeek",
        value: function(e, t) {
            return new Date(Date.UTC(e, t - 1, 1)).getUTCDay();
        }
    }, {
        key: "getDayOfWeek",
        value: function(e, t, r) {
            return new Date(Date.UTC(e, t - 1, r)).getUTCDay();
        }
    }, {
        key: "todayFMD",
        value: function() {
            var e = new Date();
            return {
                year: +e.getFullYear(),
                month: +(e.getMonth() + 1),
                date: +e.getDate()
            };
        }
    }, {
        key: "todayTimestamp",
        value: function() {
            var e = this.todayFMD(), t = e.year, r = e.month, n = e.date;
            return this.newDate(t, r, n).getTime();
        }
    }, {
        key: "toTimeStr",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return "".concat(+e.year, "-").concat(+e.month, "-").concat(+e.date);
        }
    }, {
        key: "transformDateRow2Dict",
        value: function(e) {
            if ("string" == typeof e && e.includes("-")) {
                var t = e.split("-"), n = r(t, 3), a = n[0], o = n[1], u = n[2];
                return this.tranformStr2NumOfDate({
                    year: a,
                    month: o,
                    date: u
                });
            }
            return {};
        }
    }, {
        key: "tranformStr2NumOfDate",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = t({}, e);
            return r.year = +r.year, r.month = +r.month, r.date = +r.date, r;
        }
    }, {
        key: "sortDatesByTime",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments.length > 1 ? arguments[1] : void 0;
            return t.sort(function(t, n) {
                return e.getTimeStamp(t) < e.getTimeStamp(n) && "desc" !== r ? -1 : 1;
            });
        }
    }, {
        key: "getPrevMonthInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(e.month) > 1 ? {
                year: +e.year,
                month: Number(e.month) - 1
            } : {
                year: Number(e.year) - 1,
                month: 12
            };
            return t;
        }
    }, {
        key: "getNextMonthInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(e.month) < 12 ? {
                year: +e.year,
                month: Number(e.month) + 1
            } : {
                year: Number(e.year) + 1,
                month: 1
            };
            return t;
        }
    }, {
        key: "getPrevYearInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                year: Number(e.year) - 1,
                month: +e.month
            };
        }
    }, {
        key: "getNextYearInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                year: Number(e.year) + 1,
                month: +e.month
            };
        }
    }, {
        key: "findDateIndexInArray",
        value: function(e, t) {
            return t.findIndex(function(t) {
                return g.toTimeStr(t) === g.toTimeStr(e);
            });
        }
    }, {
        key: "calcDates",
        value: function(e, t) {
            for (var r = this.getDatesCountOfMonth(e, t), n = [], a = g.todayFMD(), o = 1; o <= r; o++) {
                var u = {
                    year: +e,
                    id: o - 1,
                    month: +t,
                    date: o,
                    week: g.getDayOfWeek(+e, +t, o),
                    isToday: +a.year == +e && +a.month == +t && o === +a.date
                };
                n.push(u);
            }
            return n;
        }
    }, {
        key: "uniqueArrayByDate",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = {}, r = [];
            for (var n in e.forEach(function(e) {
                t[g.toTimeStr(e)] = e;
            }), t) r.push(t[n]);
            return r;
        }
    }, {
        key: "filterDatesByYM",
        value: function(e, t) {
            if (e) {
                var r = e.year, n = e.month;
                return t.filter(function(e) {
                    return +e.year == +r && +e.month == +n;
                });
            }
            return t;
        }
    }, {
        key: "getWeekHeader",
        value: function(e) {
            var t = [ "日", "一", "二", "三", "四", "五", "六" ];
            return "Mon" === e && (t = [ "一", "二", "三", "四", "五", "六", "日" ]), t;
        }
    } ]), e;
}();

function v() {
    var e = getCurrentPages() || [];
    return e[e.length - 1] || {};
}

var y = new u.default();

exports.logger = y;

var m = new f();

exports.calendarGesture = m;

var g = new s();

exports.dateUtil = g;

var h = function(e, t) {
    return new i.default(t).getData(e);
};

exports.getCalendarData = h;

var d = function(e, t) {
    return new i.default(t).setData(e);
};

exports.setCalendarData = d;

exports.getCalendarConfig = function(e) {
    return h("config", e);
};

exports.setCalendarConfig = function(e, t) {
    return d({
        config: e
    }, t);
};