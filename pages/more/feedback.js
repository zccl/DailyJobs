var t = require("../../common/common.js"), e = [ {
    name: "功能异常",
    type: 1,
    select: !1
}, {
    name: "产品建议",
    type: 2,
    select: !1
}, {
    name: "其他反馈",
    type: 3,
    select: !1
} ];

Page({
    data: {
        feedback_type: [],
        feedback_type_select: 0,
        content: "",
        contact: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        for (var t = 0; t < e.length; t++) e[t].select = !1;
        this.setData({
            feedback_type: e,
            feedback_type_select: 0,
            content: "",
            contact: ""
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    // onShareAppMessage: function() {
    //     return t.share();
    // },
    changeType: function(t) {
        for (var a = 0; a < e.length; a++) e[a].select = !1;
        e[t.currentTarget.dataset.id].select = !0, this.setData({
            feedback_type: e,
            feedback_type_select: e[t.currentTarget.dataset.id].type
        });
    },
    changeContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    changeContact: function(t) {
        this.setData({
            contact: t.detail.value
        });
    },
    submit: function() {
        if (0 !== this.data.feedback_type_select) if (0 !== this.data.content.length) if ("" == this.data.contact || 11 == this.data.contact.length) {
            var e = {
                type: this.data.feedback_type_select,
                content: this.data.content,
                contact: this.data.contact
            }, a = t.header();
            "" !== a && wx.request({
                url: getApp().globalData.host + "/mark/common/feedback",
                method: "post",
                data: e,
                header: a,
                success: function(e) {
                    200 == e.statusCode && e.data.error_code > 1e5 ? t.showToast(e.data.error_msg) : 200 == e.statusCode && 0 == e.data.error_code ? (setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3), t.showToast("感谢您的反馈!")) : t.showToast("网络异常,请稍后重试");
                }
            });
        } else t.showToast("请输入正确的手机号"); else t.showToast("请填写问题描述"); else t.showToast("请选择问题类型");
    }
});