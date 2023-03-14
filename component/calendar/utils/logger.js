Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/classCallCheck"), o = require("../../../@babel/runtime/helpers/createClass"), l = function() {
    function l() {
        e(this, l);
    }
    return o(l, [ {
        key: "info",
        value: function(e) {
            console.log("%cInfo: %c" + e, "color:#FF0080;font-weight:bold", "color: #FF509B");
        }
    }, {
        key: "warn",
        value: function(e) {
            console.log("%cWarn: %c" + e, "color:#FF6600;font-weight:bold", "color: #FF9933");
        }
    }, {
        key: "tips",
        value: function(e) {
            console.log("%cTips: %c" + e, "color:#00B200;font-weight:bold", "color: #00CC33");
        }
    } ]), l;
}();

exports.default = l;