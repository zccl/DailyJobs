Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0, require("../../../@babel/runtime/helpers/Arrayincludes");

var e = require("../../../@babel/runtime/helpers/objectSpread2"), t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"), r = require("../../../@babel/runtime/helpers/toConsumableArray"), o = require("../utils/index"), a = require("../render");

function n(e, a, n) {
    var d, l = r(a), i = t(e);
    try {
        var s = function() {
            var e = d.value, t = l.findIndex(function(t) {
                return o.dateUtil.toTimeStr(t) === o.dateUtil.toTimeStr(e);
            }), r = l[t];
            if (!r) return "continue";
            r.showTodoLabel = !!n || !r.choosed, r.showTodoLabel && (r.todoText = e.todoText), 
            r.color = e.color;
        };
        for (i.s(); !(d = i.n()).done; ) s();
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        i.e(e);
    } finally {
        i.f();
    }
    return l;
}

exports.default = function() {
    return {
        name: "todo",
        beforeRender: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = t.todos, a = void 0 === o ? [] : o, d = t.dates, l = void 0 === d ? [] : d, i = t.showLabelAlways, s = n(a, l, i);
            return {
                calendarData: e(e({}, t), {}, {
                    dates: s
                }),
                calendarConfig: r
            };
        },
        methods: function(t) {
            return {
                setTodos: function() {
                    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = (0, 
                    o.getCalendarData)("calendar", t);
                    if (!n || !n.dates) return Promise.reject("请等待日历初始化完成后再调用该方法");
                    var d = r.circle, l = r.dotColor, i = void 0 === l ? "" : l, s = r.pos, u = void 0 === s ? "bottom" : s, c = r.showLabelAlways, f = r.dates, h = void 0 === f ? [] : f, b = n.todos, v = void 0 === b ? [] : b, m = h.map(function(e) {
                        return o.dateUtil.tranformStr2NumOfDate(e);
                    }), T = {
                        dates: n.dates,
                        todos: o.dateUtil.uniqueArrayByDate(v.concat(m))
                    };
                    d || (T.todoLabelPos = u, T.todoLabelColor = i), T.todoLabelCircle = d || !1, T.showLabelAlways = c || !1;
                    var p = (0, o.getCalendarData)("calendar", t);
                    return a.renderCalendar.call(t, e(e({}, p), T));
                },
                deleteTodos: function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    if (!(n instanceof Array && n.length)) return Promise.reject("deleteTodos()应为入参为非空数组");
                    var d = (0, o.getCalendarData)("calendar", t), l = d.todos || [], i = n.map(function(e) {
                        return o.dateUtil.toTimeStr(e);
                    }), s = l.filter(function(e) {
                        return !i.includes(o.dateUtil.toTimeStr(e));
                    }), u = d.dates, c = d.curYear, f = d.curMonth, h = r(u), b = o.dateUtil.filterDatesByYM({
                        year: c,
                        month: f
                    }, s);
                    return h.forEach(function(e) {
                        e.showTodoLabel = !1;
                    }), b.forEach(function(e) {
                        h[e.date - 1].showTodoLabel = !h[e.date - 1].choosed;
                    }), a.renderCalendar.call(t, e(e({}, d), {}, {
                        dates: h,
                        todos: s
                    }));
                },
                clearTodos: function() {
                    var n = (0, o.getCalendarData)("calendar", t), d = r(n.dates);
                    return d.forEach(function(e) {
                        e.showTodoLabel = !1;
                    }), a.renderCalendar.call(t, e(e({}, n), {}, {
                        dates: d,
                        todos: []
                    }));
                },
                getTodos: function() {
                    return (0, o.getCalendarData)("calendar.todos", t) || [];
                }
            };
        }
    };
};