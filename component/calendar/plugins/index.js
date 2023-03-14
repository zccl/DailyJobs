var e = require("../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = {
    installed: require("../../../@babel/runtime/helpers/toConsumableArray")(e(require("./preset/index")).default),
    use: function(e) {
        if ("function" == typeof e) {
            var t = e() || {}, r = t.name;
            return r && "methods" !== r && !this.installed.some(function(e) {
                return e[0] === r;
            }) && this.installed.unshift([ r, t ]), this;
        }
    }
};

exports.default = t;