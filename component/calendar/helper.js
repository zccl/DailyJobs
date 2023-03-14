Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.calcTargetYMInfo = function() {
    return {
        right: e.dateUtil.getPrevMonthInfo,
        left: e.dateUtil.getNextMonthInfo,
        prev_month: e.dateUtil.getPrevMonthInfo,
        next_month: e.dateUtil.getNextMonthInfo,
        prev_year: e.dateUtil.getPrevYearInfo,
        next_year: e.dateUtil.getNextYearInfo
    };
};

var e = require("./utils/index");