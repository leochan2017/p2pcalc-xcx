App({
  globalData: {
    scene: -1,
    // 是否大于204版本
    isMore204: true
  },
  onLaunch(optitons) {
    try {
      const sysInfo = wx.getSystemInfoSync()
      if (sysInfo.SDKVersion > '2.0.4') {
        this.globalData.isMore204 = true
      } else {
        this.globalData.isMore204 = false
      }
    } catch (e) {}

    // console.log('onLaunch')
    setTimeout(this.showAdJili, 800)

    this.showAdChaPin()

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
  },
  /** 展示激励式广告 */
  showAdJili() {
    if (this.globalData.isMore204 && typeof wx.createRewardedVideoAd === 'function') {
      let videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-3286cb6e78dee865'
      })

      if (typeof videoAd.load === 'function') {
        videoAd
          .load()
          .then(() => videoAd.show())
          .catch(err => console.log(err.errMsg))
      }
    }
  },
  /** 展示插屏广告 */
  showAdChaPin() {
    if (wx.createInterstitialAd) {
      let intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-085d2716964ba304'
      })

      intersitialAd.show().catch(err => console.log(err.errMsg))
    }
  }
  /** 复制神秘代码 */
  // initCopyCode() {
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
  // }
})
