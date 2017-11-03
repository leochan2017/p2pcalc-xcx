Page({
    data: {
        canUseSetClipboardData: wx.canIUse('setClipboardData')
    },
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
    },
    payMeBtc() {
        wx.setClipboardData({
            data: '1PQg7wJNMVa3wZxtrMJiFmcHrQicsDtpsG',
            success: res => {
                wx.showModal({
                    title: '感谢您的支持!',
                    content: 'BTC钱包收款地址已经复制至您的手机剪切板',
                    showCancel: false,
                    confirmText: '好的'
                });

                wx.setStorage({
                    key: 'isPayLeoMoney',
                    data: true
                });
            },
            fail: err => {
                wx.showToast({
                    title: '复制失败，请重试'
                });
            }
        })
    },
    payMeEth() {
        wx.setClipboardData({
            data: '0xd7EAe8051D4309686c27D96cdE3C41A0ba91c43f',
            success: res => {
                wx.showModal({
                    title: '感谢您的支持!',
                    content: 'imtoken钱包收款地址已经复制至您的手机剪切板',
                    showCancel: false,
                    confirmText: '好的'
                });
                
                wx.setStorage({
                    key: 'isPayLeoMoney',
                    data: true
                });
            },
            fail: err => {
                wx.showToast({
                    title: '复制失败，请重试'
                });
            }
        })
    }
});