import Dialog from '../../lib/vant-weapp/dialog/dialog'
import Notify from '../../lib/vant-weapp/notify/notify'
const Util = require('../../utils/util.js')
Page({
    // 定义转发
    onShareAppMessage: Util.shareConfig,
    data: {
        tabbarActive: 0,
        errorMessage: {
            amount: '',
            falseRate: '',
            dateLong: ''
        },
        popupResultShow: false, // 结果页浮层
        use: 0, // 使用次数
        popupShareShow: false, // 分享页浮层
        amount: '',
        dayType: '天',
        dateLong: '',
        xxDay: '', // 各种期
        xxMoney1: '', // 各种费(元)
        xxMoney2: 0, // %
        falseRate: '', // 预期利率
        falseIncome: 0, // 预期收益
        trueRate: 0, // 真实利率
        trueIncome: 0 // 真实收益
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '网贷收益计算器'
        })

        // dev code
        // this.setData({
        //     amount: 100000,
        //     dateLong: 30,
        //     falseRate: 9.8
        // })
        // this.calcFn()
    },
    // 选择时长单位
    // selectDateType() {
    //     console.log('来了')
    //     wx.showActionSheet({
    //         itemList: ['天', '月', '年'],
    //         success: res => {
    //             console.log(res)
    //             let dayType = this.dayType

    //             switch (res.tapIndex) {
    //                 case 0:
    //                     dayType = '天'
    //                     break
    //                 case 1:
    //                     dayType = '月'
    //                     break
    //                 case 2:
    //                     dayType = '年'
    //                     break
    //             }

    //             this.setData({
    //                 dayType
    //             })

    //             // that.calcFn()
    //         }
    //     })
    // },
    // 输入完毕调用
    inputFn(e) {
        // console.log(e)
        const name = e.currentTarget.dataset.name
        const val = e.detail || ''
        this.setData({
            [name]: val
        })
    },
    // 检查还有没有机会
    checkChance() {
        let use = wx.getStorageSync('use') || 0 // 已用次数
        let share = wx.getStorageSync('share') || 1 // 分享次数

        this.setData({
            use
        })

        // 每分享一次，增加10次机会
        if (use >= (share * 10)) {
            this.setData({
                popupShareShow: true
            })
            return false
        }

        use = use + 1

        wx.setStorage({
            key: 'use',
            data: use
        })


        return true
    },
    checkData() {
        const data = this.data
        const amount = data.amount
        const falseRate = data.falseRate
        const dateLong = data.dateLong
        const paramAmount = 'errorMessage.amount'
        const paramFalseRate = 'errorMessage.falseRate'
        const paramDateLong = 'errorMessage.dateLong'
        let flag = true

        if (!amount || amount < 1) {
            this.setData({
                [paramAmount]: true
            })
            flag = false
        } else {
            this.setData({
                [paramAmount]: false
            })
        }

        if (!falseRate || falseRate < 1) {
            this.setData({
                [paramFalseRate]: true
            })
            flag = false
        } else {
            this.setData({
                [paramFalseRate]: false
            })
        }

        if (!dateLong || dateLong < 1) {
            this.setData({
                [paramDateLong]: true
            })
            flag = false
        } else {
            this.setData({
                [paramDateLong]: false
            })
        }

        return flag
    },
    calcFn() {
        if (!this.checkData()) {
            Notify('信息输入有误，请检查')
            return
        }

        if (!this.checkChance()) {
            return
        }

        const amount = this.data.amount
        const falseRate = this.data.falseRate
        let dateLong = this.data.dateLong // 投入时长，默认计算单位：天
        const xxMoney1 = this.data.xxMoney1
        const xxDay = this.data.xxDay
        const dayType = this.data.dayType
        let minusDay = 0 // 各种要减的天
        let minusMoney = 0 // 各种要减的钱

        if (amount == 0 || falseRate == 0 || dateLong == 0 || isNaN(dateLong)) {
            this.setData({
                falseIncome: 0,
                trueIncome: 0,
                trueRate: 0
            })
            return
        }

        if (dayType === '月') dateLong = dateLong * 30

        if (dayType === '年') dateLong = dateLong * 365

        if (xxMoney1 > 0) minusMoney = xxMoney1

        if (xxDay > 0) minusDay = xxDay

        // 预期收益
        let falseIncome = amount * falseRate * 0.01 * (dateLong / 365)

        dateLong = parseInt(dateLong)

        minusMoney = parseFloat(minusMoney)

        falseIncome = parseFloat(falseIncome)

        // 真实收益(预期收益减去损耗费用)
        let trueIncome = falseIncome - minusMoney

        // 真实利率
        // 如果没有各种扣扣扣，为了不让计算真实利率的公式出错。直接等于预期利率
        let trueRate = falseRate
        if (falseIncome != trueIncome || minusDay > 0) {
            trueRate = trueIncome / (amount * (dateLong + minusDay) / 365) * 1000
                // 因为填了损耗金额，会导致莫名其妙的真实收益率计算出错，所以这么着，原因暂时不知
            if (minusMoney > 0) trueRate = trueRate * 0.1
            trueRate = Util.numberComma(trueRate.toFixed(2))
        }
        // console.log('预期收益falseIncome', falseIncome)
        // console.log('真实收益trueIncome', trueIncome)
        // console.log('真实利率trueRate', trueRate)
        falseIncome = Util.numberComma(falseIncome.toFixed(2))
        trueIncome = Util.numberComma(trueIncome.toFixed(2))

        this.setData({
            falseIncome: falseIncome,
            trueIncome: trueIncome,
            trueRate: trueRate,
            popupResultShow: true
        })
    },
    showTips(e) {
        const name = e.currentTarget.dataset.name
        if (!name) return
        let title = ''
        let message = ''
        switch (name) {
            case 'xxDay':
                title = '什么是损耗天数？'
                message = '指一般的理财产品的认购期，清算期，提现到帐等等。这期间的本金是不计算收益的。如没有则不填写。'
                break
            case 'xxMoney1':
                title = '什么是损耗金额？'
                message = '指一些的理财产品的年费，充值费，手续费，提现费，投标利息管理费等等。如没有则不填写。'
                break
        }
        Dialog.alert({
            title, message
        }).then(() => {})
    },
    onTabbarChange(event) {
        // console.log(event.detail)
        if (event.detail === 1) {
            wx.redirectTo({
                url: '../about/about'
            })
        }
    },
    onPopupClose() {
        this.setData({
            popupResultShow: false,
            popupShareShow: false
        })
    },
    onShareBtnClick() {
        let share = wx.getStorageSync('share') || 1
        share = share + 1

        setTimeout(_ => {
            wx.setStorage({
                key: 'share',
                data: share
            })
            this.setData({
                popupShareShow: false
            })
        }, 2000)
    }
})
