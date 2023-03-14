Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.calcJumpData = function(a) {
    var n = a.dateInfo, o = a.config, i = a.component, f = n = n || t.dateUtil.todayFMD(), u = f.year, d = f.month, s = f.date, l = o || (0, 
    t.getCalendarConfig)(i), h = function(r, a, n) {
        var o = function(r, a, n) {
            var o = [], i = t.dateUtil.getDatesCountOfMonth(r, a - 1), f = t.dateUtil.firstDayOfWeek(r, a);
            "Mon" === n.firstDayOfWeek && (0 === f ? f = 6 : f -= 1);
            if (f > 0) {
                for (var u = i - f, d = n.onlyShowCurrentMonth, s = t.dateUtil.getPrevMonthInfo({
                    year: r,
                    month: a
                }), l = i; l > u; l--) if (d) o.push(""); else {
                    var h = t.dateUtil.getDayOfWeek(+r, +a, l);
                    o.push(e(e({}, s), {}, {
                        date: l,
                        week: h
                    }));
                }
                o.reverse();
            }
            return o;
        }(r, a, n), i = function(r, a, n) {
            var o = [], i = t.dateUtil.getDatesCountOfMonth(r, a), f = t.dateUtil.getDayOfWeek(r, a, i);
            "Mon" === n.firstDayOfWeek && (0 === f ? f = 6 : f -= 1);
            var u = 7 - (f + 1), d = n.onlyShowCurrentMonth;
            d || (u += function(e, r, a) {
                var n = 0;
                if (2 == +r) {
                    n += 7;
                    var o = t.dateUtil.getDayOfWeek(e, r, 1);
                    "Mon" === a.firstDayOfWeek ? 1 == +o && (n += 7) : 0 == +o && (n += 7);
                } else {
                    var i = t.dateUtil.getDayOfWeek(e, r, 1);
                    "Mon" === a.firstDayOfWeek ? 0 !== i && i < 6 && (n += 7) : i <= 5 && (n += 7);
                }
                return n;
            }(r, a, n));
            for (var s = t.dateUtil.getNextMonthInfo({
                year: r,
                month: a
            }), l = 1; l <= u; l++) {
                var h = t.dateUtil.getDayOfWeek(+r, +a, l);
                d ? o.push("") : o.push(e(e({
                    id: l - 1
                }, s), {}, {
                    date: l,
                    week: h || 7
                }));
            }
            return o;
        }(r, a, n);
        return {
            prevMonthGrids: o,
            nextMonthGrids: i
        };
    }(u, d, l);
    return e({
        curYear: u,
        curMonth: d,
        curDate: s,
        dates: r(u, d)
    }, h);
};

var e = require("../../@babel/runtime/helpers/objectSpread2"), t = require("./utils/index");

function r(e, r) {
    return t.dateUtil.calcDates(e, r);
}