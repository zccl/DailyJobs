Page({
  data: {
    id: 0,
  },
  onLoad: function (o) {
    this.setData({
      id: o.target_id,
    });
  },
  onReady: function () {},
});
