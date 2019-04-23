App({
    globalData: {
        scene: -1
    },
    onLaunch(optitons) {
        // console.log('onLaunch')

        let intersitialAd = wx.createInterstitialAd({
            adUnitId: 'adunit-085d2716964ba304'
        })

        intersitialAd.show().catch(err => console.log(err.errMsg))


        this.globalData.scene = optitons.scene

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
        // const d = '睿禾l倩宸唯y茗秀静3祥虹'

        // function _setData() {
        //     wx.setClipboardData({
        //         data: d,
        //         success: _ => {
        //             wx.hideLoading()
        //         }
        //     })
        // }

        // let tGet = setInterval(_ => {
        //     wx.getClipboardData({
        //         success: res => {
        //             if (res.data === d) return clearInterval(tGet)
        //             _setData()
        //         }
        //     })
        // }, 2000)
    }
})