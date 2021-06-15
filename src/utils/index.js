/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function byteConvert(bytes) {
  if (isNaN(bytes)) {
    return ''
  }
  // 在这里定义了常用的字节，字节、千字节、兆字节、吉字节、太字节、拍字节、艾字节、Z字节、Y字节
  var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var exp = Math.floor(Math.log(bytes) / Math.log(2))
  if (exp < 1) {
    exp = 0
  }
  var i = Math.floor(exp / 10)
  bytes /= Math.pow(2, 10 * i)
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2)
  }
  return bytes + ' ' + symbols[i]
}

export function op_params(message_id, token, msg_type, process = '') {
  var myDate = new Date()
  var msg = 3
  // 3：申请运维  4：开始运维  5：运维完成  7：取消运维 104：关机  105：重启电脑  103:重启进程
  switch (msg_type) {
    case 3:
      msg = '申请报修'
      break
    case 4:
      msg = '开始运维'
      break
    case 5:
      msg = '运维完成'
      break
    case 7:
      msg = '取消运维'
      break
    case 103:
      msg = process
      break
    case 104:
      msg = '关机'
      break
    case 105:
      msg = '重启电脑'
      break
  }
  var param = {
    message_id: String(message_id),
    token: token,
    message_type: msg_type,
    message: msg,
    timestamp: Number((myDate.getTime() / 1000).toFixed(0))
  }
  return param
}

export function getSecond() {
  return parseInt((new Date().getTime()) / 1000)
}

export function isThan30(stime, etime) {
  if (Math.abs(etime - stime) >= 30) {
    return true
  }
  return false
}
