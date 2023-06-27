export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let currentTime: any = new Date()
  return function (...args) {
    if (Date.now() - currentTime > delay) {
      func.call(this, ...args)
      currentTime = Date.now()
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: any = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      func.call(this, ...args)
    }, wait)
  }
}
