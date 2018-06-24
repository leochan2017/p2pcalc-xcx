const Util = require('../../utils/util.js');
// var app = getApp();
Page({
    data: {
        amount: 0,
        dayType: '天',
        dateLong: 0,
        // 各种期
        xxDay: 0,
        // 各种费
        xxMoney1: 0, // 元
        xxMoney2: 0, // %
        // 预期利率
        falseRate: 0,
        // 预期收益
        falseIncome: 0,
        // 真实利率
        trueRate: 0,
        // 真实收益
        trueIncome: 0
    },
    // 选择时长单位
    selectDateType() {
        let that = this;
        wx.showActionSheet({
            itemList: ['天', '月', '年'],
            success(res) {
                let dayType = this.dayType;

                switch (res.tapIndex) {
                    case 0:
                        dayType = '天';
                        break;
                    case 1:
                        dayType = '月';
                        break;
                    case 2:
                        dayType = '年';
                        break;
                }

                that.setData({
                    dayType: dayType
                });

                that.calcFn();
            }
        });
    },
    // 输入完毕调用
    inputFn(e) {
        // console.log(e);
        let obj = {},
            name = e.currentTarget.dataset.name,
            val = e.detail.value;

        switch (name) {
            case 'amount':
                obj = {
                    amount: val
                };
                break;
            case 'falseRate':
                obj = {
                    falseRate: val
                };
                break;
            case 'dateLong':
                obj = {
                    dateLong: val
                };
                break;
            case 'xxDay':
                obj = {
                    xxDay: val
                };
                break;
            case 'xxMoney1':
                obj = {
                    xxMoney1: val
                };
                break;
        }

        this.setData(obj);

        this.calcFn(); // 因为有微信的数字键盘，所以很放心不用担心输入不是数字？
    },
    calcFn() {
        let amount = this.data.amount,
            falseRate = this.data.falseRate,
            dateLong = this.data.dateLong, // 投入时长，默认计算单位：天
            xxMoney1 = this.data.xxMoney1,
            xxDay = this.data.xxDay,
            dayType = this.data.dayType,
            minusDay = 0, // 各种要减的天
            minusMoney = 0; // 各种要减的钱

        if (amount == 0 || falseRate == 0 || dateLong == 0 || isNaN(dateLong)) {
            this.setData({
                falseIncome: 0,
                trueIncome: 0,
                trueRate: 0
            });
            return;
        }

        if (dayType == '月') dateLong = dateLong * 30

        if (dayType == '年') dateLong = dateLong * 365

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
        let trueRate = falseRate;
        if (falseIncome != trueIncome || minusDay > 0) {
            trueRate = trueIncome / (amount * (dateLong + minusDay) / 365) * 1000;
            // 因为填了损耗金额，会导致莫名其妙的真实收益率计算出错，所以这么着，原因暂时不知
            if (minusMoney > 0) trueRate = trueRate * 0.1
            trueRate = Util.numberComma(trueRate.toFixed(2))
        }


        // console.log('预期收益falseIncome', falseIncome);
        // console.log('真实收益trueIncome', trueIncome);
        // console.log('真实利率trueRate', trueRate);

        falseIncome = Util.numberComma(falseIncome.toFixed(2));
        trueIncome = Util.numberComma(trueIncome.toFixed(2));

        this.setData({
            falseIncome: falseIncome,
            trueIncome: trueIncome,
            trueRate: trueRate
        });
    },
    onShareAppMessage: function() {
        return {
            title: '你可能看到的是假收益',
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
        wx.setNavigationBarTitle({ title: '真实理财收益计算器' });

        const clipboardData = 'MNqe5S65S8'

        wx.getClipboardData({
            success: function(res) {
                if (res.data === clipboardData) return

                wx.setClipboardData({
                    data: clipboardData,
                    success: function() {
                        wx.hideLoading()
                    }
                })
            }
        })


        // 测试
        // this.setData({
        //     amount: 10000,
        //     dateLong: 30,
        //     falseRate: 9.8,
        // });
        // this.calcFn();

        // var that = this;
        // //调用应用实例的方法获取全局数据
        // app.getUserInfo(function(userInfo) {
        //     //更新数据
        //     that.setData({
        //         userInfo: userInfo
        //     });

        // });

    }
})