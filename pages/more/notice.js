var t = require("../../common/common.js");

Page({
    data: {
        notices: [],
        lastIndex: 0,
        end: !1
    },
    onLoad: function(t) {
        this.getList(), wx.setStorageSync("new_notice_count", 0);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getList();
    },
    // onShareAppMessage: function() {
    //     return t.share();
    // },
    getList: function() {
        if (!this.data.end) {
            var a = this, e = t.header();
            "" !== e && wx.request({
                url: getApp().globalData.host + "/mark/notice/list?index=" + a.data.lastIndex,
                method: "get",
                header: e,
                success: function(e) {
                    if (200 == e.statusCode && e.data.error_code > 1e5) t.showToast(e.data.error_msg); else if (200 == e.statusCode && 0 == e.data.error_code) {
                        var n = a.data.lastIndex;
                        e.data.data.forEach(function(t) {
                            (t.id < n || 0 == n) && (n = t.id);
                        });
                        var o = a.data.notices;
                        e.data.data.forEach(function(t) {
                            o.push(t);
                        }), a.setData({
                            notices: o,
                            lastIndex: n
                        }), e.data.data.length < 10 && a.setData({
                            end: !0
                        });
                    } else t.showToast("网络异常,请稍后重试");
                }
            });
        }
    }
});