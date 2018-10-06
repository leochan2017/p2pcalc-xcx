function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function numberComma(source, length = 3) {
    source = String(source).split(".")
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,")
    return source.join(".")
}

/**
 * 分享配置
 * @param  {String} title  [Title]
 * @param  {String} path   [Path]
 * @return {Object}        [Share Config]
 */
const shareConfig = (option = {}) => {
    let title = '你可能看到的是假收益'
    let path = '/pages/index/index'

    if (option.title && option.title != '') title = option.title

    if (option.path && option.path != '') path = option.path

    return {
        title: title,
        path: path
    }
}

module.exports = {
    formatTime,
    numberComma,
    shareConfig
}