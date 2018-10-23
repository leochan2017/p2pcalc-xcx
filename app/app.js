App({
    onLaunch: function() {
        // 初始化分享次数（用于获取机会）
        function _initShare() {
            wx.getStorage({
                key: 'share',
                fail: err => {
                    wx.setStorage({
                        key: 'share',
                        data: 1
                    })
                }
            })
        }

        _initShare()

        // return
        const d = '睿禾l倩宸唯y茗秀静3祥虹'

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
    }
})
