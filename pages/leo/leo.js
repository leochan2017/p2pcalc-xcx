Page({
    data: {},
    payMeMoney() {
        wx.previewImage({
            urls: ['http://www.leojs.com/pay-me-money.jpg']
        });

        wx.setStorage({
            key: 'isPayLeoMoney',
            data: true
        });
    },
    onShareAppMessage: function() {
        return {
            title: '真实理财收益计算器',
            path: '/pages/index/index',
            success: function(res) {
                wx.showToast({
                    title: '感谢分享',
                    icon: 'success'
                });
            },
            fail: function(res) {
                wx.showToast({
                    title: '分享失败，请重试'
                });
            }
        }
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '关于'
        });
    }
});