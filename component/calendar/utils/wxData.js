Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/typeof");

require("../../../@babel/runtime/helpers/Arrayincludes");

var t = require("../../../@babel/runtime/helpers/classCallCheck"), r = require("../../../@babel/runtime/helpers/createClass"), n = function() {
    function n(e) {
        t(this, n), this.Component = e;
    }
    return r(n, [ {
        key: "getData",
        value: function(e) {
            var t = this.Component.data;
            return e ? e.includes(".") ? e.split(".").reduce(function(e, t) {
                return e[t];
            }, t) : this.Component.data[e] : t;
        }
    }, {
        key: "setData",
        value: function(t) {
            var r = this;
            return new Promise(function(n, a) {
                if (!t) return a("no data to set");
                "object" === e(t) && r.Component.setData(t, function() {
                    n(t);
                });
            });
        }
    } ]), n;
}();

exports.default = n;