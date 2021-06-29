import { parseTime } from '@/utils/time.js'
/* 场次倒计时相关 */
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
      if (!this.sceneData || this.sceneData.endTime === null) {
        return '--'
      }
      let remainTime = 0 // 相差的时间
      // 状态为未开始的场次
      if (this.sceneData.status === 0) {
        remainTime = this.sceneData.beginTime - this.now
        if (remainTime <= 0) { // 开始时间 <= 当前时间
          // if (this.sceneData.bidType === 1) { // 限时竞价
          this.sceneData.status = 1 // 状态： 未开始=》已开始
          // }
        }
      }
      // 状态为进行中的场次
      if (this.sceneData.status === 1) {
        remainTime = this.sceneData.endTime - this.now
        if (remainTime <= 0) { // 结束时间 <= 当前时间
          if (this.sceneData.bidType === 1) { // 限时竞价
            this.sceneData.status = 2 // 状态： 拍卖中=》已结束
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
      const d = parseInt(remainTime / (24 * 60 * 60), 10)
      remainTime -= d * 24 * 60 * 60
      const h = parseInt(remainTime / (60 * 60), 10)
      remainTime -= h * 60 * 60
      const i = parseInt(remainTime / 60)
      remainTime -= i * 60
      const s = remainTime
      let dom = ''
      if (d > 0) {
        dom = `<span>${d}</span>天<span>${h}</span>小时<span>${i}</span>分<span>${s}</span>秒`
      } else if (h > 0) {
        dom = `<span>${h}</span>小时<span>${i}</span>分<span>${s}</span>秒`
      } else if (i > 0) {
        dom = `<span>${i}</span>分<span>${s}</span>秒`
      } else {
        dom = `<span>${s}</span>秒`
      }
      return dom
    },
    /* 根据场次状态开始倒计时*/
    startTimer(ignoreStatus = false) {
      if (!ignoreStatus && (!this.sceneData || this.sceneData.status === undefined)) {
        return
      }
      if (ignoreStatus || (this.sceneData.status === 0 ||
        (this.sceneData.status === 1 && this.sceneData.bidType === 1))) { // 未开始||(进行中&&限时竞价)
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
