Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0, require("../../../../@babel/runtime/helpers/Arrayincludes");

var e = require("../../../../@babel/runtime/helpers/objectSpread2"), t = require("../../../../@babel/runtime/helpers/toConsumableArray"), a = require("../../core"), r = require("../../render"), n = require("../../utils/index");

exports.default = function() {
    return {
        name: "base",
        beforeRender: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0, o = a, d = o.selectedDates, i = void 0 === d ? [] : d, l = o.dates, s = t(l);
            if (i.length) {
                var c = i.map(function(e) {
                    return n.dateUtil.toTimeStr(e);
                });
                s.forEach(function(e) {
                    var t = n.dateUtil.toTimeStr(e);
                    c.includes(t) && (e.choosed = !0);
                });
            }
            return {
                calendarData: e(e({}, a), {}, {
                    dates: s
                }),
                calendarConfig: r
            };
        },
        onTapDate: function(a) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, d = e({}, r), i = n.dateUtil.findDateIndexInArray(a, r.dates), l = o.multi, s = o.inverse, c = t(d.dates), u = d.selectedDates, f = void 0 === u ? [] : u;
            if (l) c[i] = e(e({}, c[i]), {}, {
                choosed: !c[i].choosed
            }), d.selectedDates || (d.selectedDates = []), c[i].choosed ? d.selectedDates.push(c[i]) : d.selectedDates = d.selectedDates.filter(function(e) {
                return n.dateUtil.toTimeStr(e) !== n.dateUtil.toTimeStr(c[i]);
            }); else {
                var h = {};
                f.length && (h = t(f).pop() || {});
                var v = n.dateUtil.toTimeStr;
                if (!s && v(h) === v(a)) return d;
                var m = e(e({}, a), {}, {
                    choosed: !a.choosed
                });
                if (c[i] = m, h.date) {
                    var D = n.dateUtil.findDateIndexInArray(h, c), g = c[D];
                    g && (g.choosed = !1);
                }
                c[i].choosed ? d.selectedDates = [ c[i] ] : d.selectedDates = [];
            }
            return {
                calendarData: e(e({}, d), {}, {
                    dates: c
                }),
                calendarConfig: o
            };
        },
        onSwitchCalendar: function(t) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 ? arguments[2] : void 0, d = (0, 
            n.getCalendarConfig)(o);
            if (d.weekMode) return r;
            var i = (0, a.calcJumpData)({
                dateInfo: t,
                config: d
            });
            return e(e({}, r), i);
        },
        methods: function(o) {
            return {
                jump: function(t) {
                    if ("[object Object]" === Object.prototype.toString.call(t)) {
                        var d = (0, a.calcJumpData)({
                            dateInfo: t,
                            component: o
                        }), i = (0, n.getCalendarData)("calendar", o);
                        if ((0, n.getCalendarConfig)(o).autoChoosedWhenJump) {
                            var l = d.dates[t.date - 1];
                            d.selectedDates ? d.selectedDates.push(l) : d.selectedDates = [ l ];
                        }
                        return r.renderCalendar.call(o, e(e({}, i), d));
                    }
                },
                getCalendarConfig: function() {
                    return (0, n.getCalendarConfig)(o);
                },
                setCalendarConfig: function(t) {
                    return new Promise(function(a, r) {
                        if (o && o.data.config) {
                            var d = e(e({}, o.config), t);
                            o.config = d, (0, n.setCalendarData)({
                                config: d
                            }, o).then(a).catch(r);
                        } else r("异常：未找到组件配置信息");
                    });
                },
                cancelSelectedDates: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = (0, 
                    n.getCalendarData)("calendar", o) || {}, d = a.dates, i = void 0 === d ? [] : d, l = a.selectedDates, s = void 0 === l ? [] : l, c = {}, u = (0, 
                    n.getCalendarConfig)(o), f = {};
                    if (u.chooseAreaMode && (f = {
                        chooseAreaTimestamp: [],
                        tempChooseAreaTimestamp: []
                    }), t.length) {
                        var h = t.map(function(e) {
                            return n.dateUtil.toTimeStr(e);
                        }), v = s.filter(function(e) {
                            return !h.includes(n.dateUtil.toTimeStr(e));
                        });
                        i.forEach(function(e) {
                            h.includes(n.dateUtil.toTimeStr(e)) && (e.choosed = !1);
                        }), c = {
                            dates: i,
                            selectedDates: v
                        };
                    } else i.forEach(function(e) {
                        e.choosed = !1;
                    }), c = {
                        dates: i,
                        selectedDates: []
                    };
                    return r.renderCalendar.call(o, e(e(e({}, a), c), f));
                },
                setSelectedDates: function(t) {
                    var a = (0, n.getCalendarData)("calendar", o), d = a || {}, i = d.dates, l = d.selectedDates, s = void 0 === l ? [] : l, c = [], u = i;
                    if (t) {
                        if (t && t.length) {
                            var f = n.dateUtil.uniqueArrayByDate(s.concat(t)).map(function(e) {
                                return n.dateUtil.toTimeStr(e);
                            });
                            u = i.map(function(t) {
                                var r = e({}, t);
                                return f.includes(n.dateUtil.toTimeStr(r)) && (r.choosed = !0, c.push(r)), a.showLabelAlways && r.showTodoLabel ? r.showTodoLabel = !0 : r.showTodoLabel = !1, 
                                r;
                            });
                        }
                    } else u = i.map(function(t) {
                        var r = e({}, t);
                        return r.choosed = !0, a.showLabelAlways && r.showTodoLabel ? r.showTodoLabel = !0 : r.showTodoLabel = !1, 
                        r;
                    }), c = i;
                    return r.renderCalendar.call(o, e(e({}, a), {}, {
                        dates: u,
                        selectedDates: c
                    }));
                },
                setDateStyle: function(a) {
                    if (!Array.isArray(a)) return Promise.reject();
                    var d = (0, n.getCalendarData)("calendar", o), i = d || {}, l = i.dates, s = void 0 === l ? [] : l, c = i.specialStyleDates;
                    Array.isArray(c) && (a = n.dateUtil.uniqueArrayByDate([].concat(t(c), t(a))));
                    var u = a.map(function(e) {
                        return n.dateUtil.toTimeStr(e);
                    }), f = s.map(function(t) {
                        var r = u.indexOf(n.dateUtil.toTimeStr(t));
                        return r > -1 ? e(e({}, t), {}, {
                            class: a[r].class
                        }) : t;
                    });
                    return r.renderCalendar.call(o, e(e({}, d), {}, {
                        dates: f,
                        specialStyleDates: a
                    }));
                }
            };
        }
    };
};