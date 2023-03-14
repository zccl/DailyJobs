Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../../@babel/runtime/helpers/objectSpread2"), r = require("../../utils/index");

function a() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0, n = JSON.parse(JSON.stringify(r)).map(function(r) {
        return e(e({}, r), {}, {
            lunar: a(r)
        });
    });
    return n;
}

exports.default = function() {
    return {
        name: "getData",
        methods: function(e) {
            return {
                getCurrentYM: function() {
                    var a = (0, r.getCalendarData)("calendar", e);
                    return {
                        year: a.curYear,
                        month: a.curMonth
                    };
                },
                getSelectedDates: function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = (0, 
                    r.getCalendarData)("calendar.selectedDates", e) || [], o = (0, r.getCalendarConfig)(e) || {};
                    if (!n.lunar || o.showLunar) return t;
                    var u = e.calendar || {};
                    if ("function" == typeof u.convertSolarLunar) return a(t, u.convertSolarLunar);
                    r.logger.warn("获取农历信息需引入农历插件");
                },
                getCalendarDates: function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = (0, 
                    r.getCalendarConfig)(e) || {}, o = (0, r.getCalendarData)("calendar.dates", e);
                    if (!n.lunar || t.showLunar) return o;
                    var u = e.calendar || {};
                    if ("function" == typeof u.convertSolarLunar) return a(o, u.convertSolarLunar);
                    r.logger.warn("获取农历信息需引入农历插件");
                },
                getCalendarAllData: function() {
                    return {
                        data: (0, r.getCalendarData)("calendar", e) || {},
                        config: (0, r.getCalendarConfig)(e) || {}
                    };
                }
            };
        }
    };
};