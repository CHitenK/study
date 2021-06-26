import { parseTime } from '@/utils/time.js'
/* 竞价倒计时相关 */
export default {
  data() {
    return {
      timeId: null,
      timeWorker: null
      // now: Date.now()
    }
  },
  computed: {
    /* 含有倒计时的dom*/
    timeDom() {
      let remainTime = 0 // 相差的时间
      // 状态为未开始的场次
      if (this.corporeData.status === 1 || this.corporeData.status === 6) {
        remainTime = this.corporeData.beginTime - this.now
        if (remainTime <= 0) { // 开始时间 <= 当前时间
          // if (this.corporeData.bidType === 1) { // 限时竞价
          // this.corporeData.status = 2 // 状态： 未开始=》已开始
          // }
        }
      }
      // 状态为进行中的场次
      if (this.corporeData.status === 2) {
        if (this.corporeData.endTime === null) {
          return '--'
        }
        remainTime = this.corporeData.endTime - this.now
        if (remainTime <= 0) { // 结束时间 <= 当前时间
          if (this.corporeData.bidType === 1) { // 限时竞价
            // this.corporeData.status = 3 // 状态： 拍卖中=》已结束
            this.stopTimer()
          }
        }
      }
      return this.getTimeDom(remainTime)
    }
  },
  created() {
    // this.startTimer()
  },
  methods: {
    /* 格式化时间*/
    formatTime(time, isOnlyTime = false) {
      if (time === null) {
        return '--'
      }
      if (isOnlyTime) {
        return parseTime(time, '{h}:{i}:{s}')
      }
      return parseTime(time, '{m}-{d} {h}:{i}')
    },
    /* 获取的倒计时的dom */
    getTimeDom(remainTime) {
      if (remainTime < 0) {
        remainTime = '--'
      }
      remainTime = parseInt(remainTime / 1000)
      // const d = parseInt(remainTime / (24 * 60 * 60), 10)
      // remainTime -= d * 24 * 60 * 60
      const h = parseInt(remainTime / (60 * 60), 10)
      remainTime -= h * 60 * 60
      const i = parseInt(remainTime / 60)
      remainTime -= i * 60
      const s = remainTime
      let dom = ''
      /* if (d > 0) {
        dom = `<span>${d}</span>天<span>${h}</span>时<span>${i}</span>分<span>${s}</span>秒`
      } else*/
      if (h > 0) {
        dom = `<span>${h}</span>时<span>${i}</span>分<span>${s}</span>秒`
      } else if (i > 0) {
        dom = `<span>${i}</span>分<span>${s}</span>秒`
      } else {
        dom = `<span>${s}</span>秒`
      }
      return dom
    },
    /* 根据竞价状态开始倒计时*/
    startTimer() {
      if (!this.corporeData || this.corporeData.status === undefined) {
        return
      }
      if ((this.corporeData.status === 1 || this.corporeData.status === 6) ||
        (this.corporeData.status === 2 && this.corporeData.bidType === 1)) { // 未开始||(进行中&&限时竞价)
        this.stopTimer()
        if (typeof (Worker) !== 'undefined') {
          this.timeWorker = new Worker('/js/timeWorker.js')
          this.timeWorker.postMessage(this.now)
          this.timeWorker.onmessage = (event) => {
            this.now = event.data
          }
        } else {
          // 起到倒计时
          this.timeId = setInterval(() => {
            this.now += 1000
          }, 1000)
        }
      }
    },
    /* 停止倒计时 */
    stopTimer() {
      if (typeof (Worker) !== 'undefined' && this.timeWorker) {
        this.timeWorker.terminate()
      } else {
        this.timeId && clearInterval(this.timeId)
      }
    }
  },
  beforeDestroy() {
    this.stopTimer()
  }
}
