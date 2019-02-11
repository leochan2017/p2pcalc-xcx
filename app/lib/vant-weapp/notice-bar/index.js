import { VantComponent } from '../common/component';
var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';

const APP = getApp()
// 是否强制显示 这个优先级必须最高。用于控制上面的show是否显示
let _isClickClose = false

VantComponent({
  props: {
    text: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    }
  },
  data: {
    show: true,
    hasRightIcon: false,
    width: undefined,
    wrapWidth: undefined,
    elapse: undefined,
    animation: null,
    resetAnimation: null,
    timer: null
  },
  watch: {
    text: function text() {
      this.setData({}, this.init);
    }
  },
  created: function created() {
    if (this.data.mode) {
      this.setData({
        hasRightIcon: true
      });
    }
    this.checkShow()
  },
  destroyed: function destroyed() {
    var timer = this.data.timer;
    timer && clearTimeout(timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      this.getRect('.van-notice-bar__content').then(function (rect) {
        if (!rect || !rect.width) {
          return;
        }

        _this.setData({
          width: rect.width
        });

        _this.getRect('.van-notice-bar__content-wrap').then(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _this$data = _this.data,
            width = _this$data.width,
            speed = _this$data.speed,
            scrollable = _this$data.scrollable,
            delay = _this$data.delay;

          if (scrollable && wrapWidth < width) {
            var elapse = width / speed * 1000;
            var animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay: delay
            });
            var resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            _this.setData({
              elapse: elapse,
              wrapWidth: wrapWidth,
              animation: animation,
              resetAnimation: resetAnimation
            }, function () {
              _this.scroll();
            });
          }
        });
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      var _this$data2 = this.data,
        animation = _this$data2.animation,
        resetAnimation = _this$data2.resetAnimation,
        wrapWidth = _this$data2.wrapWidth,
        elapse = _this$data2.elapse,
        speed = _this$data2.speed;
      resetAnimation.translateX(wrapWidth).step();
      var animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(function () {
        _this2.setData({
          animationData: animationData.export()
        });
      }, 100);
      var timer = setTimeout(function () {
        _this2.scroll();
      }, elapse);
      this.setData({
        timer: timer
      });
    },
    onClickIcon: function onClickIcon() {
      var timer = this.data.timer;
      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
      _isClickClose = true
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
      // console.log('click')
    },
    // 判断是否需要显示
    checkShow() {
      const scene = APP.globalData.scene
      const key = 'IS_FAVOURITE'
      let show = false

      console.log('_isClickClose', _isClickClose)
      // 如果点击了关闭，是最高优先级的
      if (_isClickClose) {
        show = false
      } else {
        console.log('scene val: ', scene)
        try {
          const IS_FAVOURITE = wx.getStorageSync(key)
          console.log('IS_FAVOURITE val:', IS_FAVOURITE)
          if (!IS_FAVOURITE) {
            if (scene === 1001 || scene === 1089) {
              wx.setStorage({ key, data: true })
            } else {
              show = true
            }
          }
        } catch (e) {
          console.log('wx.getStorageSync error:', e)
        }
      }

      // dev code
      // show = true

      this.setData({ show })
      return show
    }
  }
});