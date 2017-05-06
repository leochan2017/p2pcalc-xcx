//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        money: 0,
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
    goAbout() {
        wx.navigateTo({
            url: '../about/about'
        });
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
            case 'money':
                obj = {
                    money: val
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
        let money = this.data.money,
            falseRate = this.data.falseRate,
            dateLong = this.data.dateLong, // 投入时长，默认计算单位：天
            xxMoney1 = this.data.xxMoney1,
            xxDay = this.data.xxDay,
            dayType = this.data.dayType,
            minusDay = 0, // 各种要减的天
            minusMoney = 0; // 各种要减的钱

        if (money == 0 || falseRate == 0 || dateLong == 0 || isNaN(dateLong)) {
            this.setData({
                falseIncome: 0,
                trueIncome: 0,
                trueRate: 0
            });
            return;
        }

        if (dayType == '月') {
            dateLong = dateLong * 30;
        }

        if (dayType == '年') {
            dateLong = dateLong * 365;
        }

        if (xxMoney1 > 0) {
            minusMoney = xxMoney1;
        }

        if (xxDay > 0) {
            minusDay = xxDay;
        }

        // 预期收益
        let falseIncome = (money * falseRate * 0.01 * (dateLong / 365)).toFixed(2);

        // 真实收益(预期收益减去损耗费用)
        let trueIncome = (falseIncome - minusMoney).toFixed(2);

        // 真实利率
        let trueRate = ((trueIncome / ((dateLong + minusDay) / 365)) / money * 1000).toFixed(2);

        this.setData({
            falseIncome: falseIncome,
            trueIncome: trueIncome,
            trueRate: trueRate
        });
    },
    onLoad() {
        console.log('onLoad');
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
