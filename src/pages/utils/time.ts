// 补0
function setZero(s) {
  return s < 10 ? '0' + s : s
}
export function formatTime(time) {
  time = new Date(time).getTime() // 将time先转成时间戳,13位
  if (('' + time).length === 10) {
    // 安卓ios默认是十位，所以要乘以1000
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  // 粒度较小
  // 超过一天的都统一按日期处理,如果有传入格式option则按格式转换
  let nows = new Date()
  // 处理年，如果是当年的信息就只显示【月日时分】
  let nowYear = nows.getFullYear()
  let dYear = d.getFullYear()
  let endYear = nowYear != dYear ? d.getFullYear() + '-' : null
  // 处理日，如果是当天的消息就显示【时分】，否则就显示日期
  let dMonth = setZero(d.getMonth() + 1)
  let dDate = setZero(d.getDate())
  let nowMonth = setZero(nows.getMonth() + 1)
  let nowDate = setZero(nows.getDate())
  let endDate = null
  if (dMonth == nowMonth && dDate == nowDate) {
    // 当天
    endDate = '今天'
  } else if (dMonth == nowMonth && dDate == nowDate - 1) {
    //昨天
    endDate = '昨天'
  } else {
    endDate = dMonth + '-' + dDate + ' '
  }
  return (
    (endYear ? endYear : '') +
    (endDate ? endDate : '') +
    setZero(d.getHours()) +
    ':' +
    setZero(d.getMinutes())
  )
}
