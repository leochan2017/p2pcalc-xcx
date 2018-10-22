function numberComma(source, length = 3) {
    source = String(source).split('.')
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
    return source.join('.')
}

/**
 * 分享配置
 * @param  {String} title  [Title]
 * @param  {String} path   [Path]
 * @return {Object}        [Share Config]
 */
const shareConfig = (option = {}) => {
    let title = '别再被忽悠了，快来算算你的真实收益！'
    let path = '/pages/index/index'
    const imageUrl = '../../images/share.png'

    if (option.title && option.title != '') title = option.title

    if (option.path && option.path != '') path = option.path

    return {
        title: title,
        path: path,
        imageUrl: imageUrl
    }
}

module.exports = {
    numberComma,
    shareConfig
}