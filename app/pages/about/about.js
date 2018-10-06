const Util = require('../../utils/util.js')
Page({
    // 定义转发
    onShareAppMessage: Util.shareConfig,
    data: {
        isPayLeoMoney: false,
        faqList: [{
            title: '什么是损耗天数？',
            content: '指一般的理财产品的认购期，清算期，提现到帐等等。这期间的本金是不计算收益的。如没有则不填写。'
        }, {
            title: '什么是损耗金额？',
            content: '指一些的理财产品的年费，充值费，手续费，提现费，投标利息管理费等等。如没有则不填写。'
        }, {
            title: '你的计算公式正确吗？',
            content: '以下为计算器所用公式:预期年化收益率=(投资内收益/本金)/(投资天数/365)×100%。预期收益=本金×年化收益率。实际年化收益率=(投资内收益/本金)/((投资天数+损耗天数)/365)×100%。实际收益=本金×实际年化收益率×(投资天数+损耗天数)/365。非金融专业人士，如果觉得有更好的建议请联系我哦'
        }, {
            title: '为什么要做这个计算器？',
            content: '一般的理财产品大多都不是到期就还本还息。一般的理财产品都有各种XX期，而这期间的本金是不计算收益的。假设你买了某某理财10万元，号称91天的年化收益率是3.1%。假设认购期5天，到期后提现又5天，那么你实际就被占用了10天的资金所以收益就是:772.88*365/(101*10万)=2.79%。绝对收益是772.88/10万=0.7728%。如果期限较长的理财产品这些认购期，清算期这样的时间也许可以忽略不计。总的来说，年化收益率，绝对不是看他声称的数字，而要看实际的收入数字。'
        }, {
            title: '公众号关联本小程序',
            content: '欢迎关联本小程序，AppID(小程序ID): wx540226fe722e5773'
        }]
    },
    showHelp(e) {
        let index = e.currentTarget.dataset.index,
            faqList = this.data.faqList,
            item = faqList[index];

        wx.showModal({
            title: item.title,
            content: item.content,
            showCancel: false,
            confirmText: '原来如此'
        })
    },
    aboutMe() {
        wx.navigateTo({ url: '../leo/leo' })
    },
    goMore() {
        wx.navigateToMiniProgram({
            appId: 'wx18a2ac992306a5a4',
            path: 'pages/miniApps/miniApps',
            fail: err => {
                wx.showToast({ title: '失败了，别点了' })
            }
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

                that.setData({ 'isPayLeoMoney': val })
            },
            fail(err) {
                that.setData({ 'isPayLeoMoney': false })
            }
        })
    },
    onLoad() {
        wx.setNavigationBarTitle({ title: '说明' })

        this.checkBadgeDot()
    }
})
