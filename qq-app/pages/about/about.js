import Dialog from '../../lib/vant-weapp/dialog/dialog'
const Util = require('../../utils/util.js')
Page({
  // 定义转发
  onShareAppMessage: Util.shareConfig,
  data: {
    tabbarActive: 1,
    isPayLeoMoney: false,
    faqList: [
      {
        id: 0,
        icon: 'question',
        title: '什么是损耗天数？',
        content: '指一般的理财产品的认购期，清算期，提现到帐等等。这期间的本金是不计算收益的。如没有则不填写。'
      },
      {
        id: 1,
        icon: 'question',
        title: '什么是损耗金额？',
        content: '指一些的理财产品的年费，充值费，手续费，提现费，投标利息管理费等等。如没有则不填写。'
      },
      {
        id: 2,
        icon: 'gold-coin',
        title: '你的计算公式正确吗？',
        content:
          '以下为计算器所用公式:\n\n预期年化收益率=(投资内收益/本金)/(投资天数/365)×100%。\n\n预期收益=本金×年化收益率。\n\n实际年化收益率=(投资内收益/本金)/((投资天数+损耗天数)/365)×100%。\n\n实际收益=本金×实际年化收益率×(投资天数+损耗天数)/365。\n\n非金融行业程序猿一枚，如果觉得有更好的建议请联系我哦。'
      },
      {
        id: 3,
        icon: 'chat',
        title: '这个计算器有什么用？',
        content:
          '一般的理财产品大多都不是到期就还本还息。一般的理财产品都有各种XX期，而这期间的本金是不计算收益的。\n\n假设你买了某某理财10万元，号称91天的年化收益率是3.1%。假设认购期5天，到期后提现又5天，那么你实际就被占用了10天的资金所以收益就是:772.88*365/(101*10万)=2.79%。绝对收益是772.88/10万=0.7728%。如果期限较长的理财产品这些认购期，清算期这样的时间也许可以忽略不计。\n\n总的来说，年化收益率，绝对不是看他声称的数字，而要看实际的收入数字。'
      }
    ]
    //     , {
    //     id: 4,
    //     icon: 'exchange-record',
    //     title: '我的公众号如何关联这个小程序？',
    //     content: '哎呀老铁，你真有眼光！\n\n1.登录微信公众平台\n\n2.进入“小程序管理”\n\n3.点击“添加”按钮\n\n4.选择“关联小程序”\n\n5.扫码验证身份\n\n6.输入AppID: wx540226fe722e5773\n\n7.发送关联邀请\n\n8.等待我方通过邀请'
    // }
  },
  showHelp(e) {
    const index = e.currentTarget.dataset.index
    const faqList = this.data.faqList
    const item = faqList[index]
    Dialog.alert({
      title: item.title,
      message: item.content,
      closeOnClickOverlay: true,
      confirmButtonText: '原来如此'
    })
      .then(() => {})
      .catch(() => {})
  },
  aboutMe() {
    wx.navigateTo({
      url: '../leo/leo'
    })
  },
  goMore() {
    wx.navigateTo({
      url: '../recommend/recommend'
    })
  },
  // 检查是否需要出现红点
  checkBadgeDot() {
    let that = this

    wx.getStorage({
      key: 'isPayLeoMoney',
      success(res) {
        let val = false

        if (res.data) {
          val = true
        }

        that.setData({
          isPayLeoMoney: val
        })
      },
      fail(err) {
        that.setData({
          isPayLeoMoney: false
        })
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '说明'
    })

    this.checkBadgeDot()
  },
  onTabbarChange(event) {
    // console.log(event.detail)
    if (event.detail === 0) {
      // wx.navigateBack()
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },
  onShareBtnClick() {
    let share = wx.getStorageSync('share') || 1
    share = share + 1
    wx.setStorage({
      key: 'share',
      data: share
    })
  },
  // 打赏作者
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
        wx.previewImage({ urls: ['http://www.leojs.com/pay-me-money.jpg'] })
      }
    })
  }
})
