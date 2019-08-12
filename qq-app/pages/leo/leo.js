const Util = require('../../utils/util.js')
Page({
    // 定义转发
    onShareAppMessage: Util.shareConfig,
    data: {
        canUseSetClipboardData: wx.canIUse('setClipboardData')
    },
    payMeMoney() {
        wx.navigateToMiniProgram({
            appId: 'wx18a2ac992306a5a4',
            path: 'pages/apps/largess/detail?id=cII2eMPUxog%3D',
            success: succ => {
                wx.setStorage({
                    key: 'isPayLeoMoney',
                    data: true
                })
            },
            fail: err => {
                wx.previewImage({ urls: ['https://github.com/leochan2017/zgjm/blob/master/%E7%B4%A0%E6%9D%90/pay-me-money.jpg?raw=true'] })
            }
        })
    },
    onLoad() {
        wx.setNavigationBarTitle({ title: '关于作者' })
    },
    // payMeBtc() {
    //     wx.setClipboardData({
    //         data: '1PQg7wJNMVa3wZxtrMJiFmcHrQicsDtpsG',
    //         success: res => {
    //             wx.showModal({
    //                 title: '感谢您的支持!',
    //                 content: 'BTC钱包收款地址已经复制至您的手机剪切板',
    //                 showCancel: false,
    //                 confirmText: '好的'
    //             })

    //             wx.setStorage({
    //                 key: 'isPayLeoMoney',
    //                 data: true
    //             })
    //         },
    //         fail: err => {
    //             wx.showToast({ title: '复制失败，请重试' })
    //         }
    //     })
    // },
    // payMeEth() {
    //     wx.setClipboardData({
    //         data: '0xd7EAe8051D4309686c27D96cdE3C41A0ba91c43f',
    //         success: res => {
    //             wx.showModal({
    //                 title: '感谢您的支持!',
    //                 content: 'imtoken钱包收款地址已经复制至您的手机剪切板',
    //                 showCancel: false,
    //                 confirmText: '好的'
    //             })

    //             wx.setStorage({
    //                 key: 'isPayLeoMoney',
    //                 data: true
    //             })
    //         },
    //         fail: err => {
    //             wx.showToast({ title: '复制失败，请重试' })
    //         }
    //     })
    // },
    onShareBtnClick() {
        let share = wx.getStorageSync('share') || 1
        share = share + 1
        wx.setStorage({
            key: 'share',
            data: share
        })
    }
})