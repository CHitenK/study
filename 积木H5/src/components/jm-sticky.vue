<template>
    <div class="jm-sticky">
        <slot></slot>
        <transition :name="fixedShowAni">
            <div
                    ref="fixedEle"
                    v-show="fixedShow"
                    class="jm-sticky-fixed">
                <slot name="fixed" :current="currentKey" :index="currentIndex"></slot>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  import {
    getRect,
    prefixStyle
  } from '../common/helpers/dom'

  const COMPONENT_NAME = 'jm-sticky'
  const EVENT_CHANGE = 'change'
  const EVENT_DIFF_CHANGE = 'diff-change'

  const transformStyleKey = prefixStyle('transform')

  export default {
    name: COMPONENT_NAME,
    provide() {
      return {
        JmSticky: this
      }
    },
    props: {
      pos: {
        type: Number,
        required: true
      },
      checkTop: {
        type: Boolean,
        default: true
      },
      fixedShowAni: {
        type: String,
        default() {
          return this.checkTop ? '' : 'jm-sticky-fixed-fade'
        }
      },
      offset: {
        type: Number,
        default: 0
      },
      showNav: {
        type: null,
        default: null
      }
    },
    data() {
      return {
        diff: 0,
        currentDiff: 0,
        currentIndex: -1,
        currentKey: ''
      }
    },
    computed: {
      fixedShow() {
        const targetEle = this.eles[this.currentIndex]
        let navShow = this.showNav ? this.showNav : !!targetEle
        return navShow
      }
    },
    watch: {
      diff(newVal) {
        let nVal = newVal
        if (nVal >= 0) {
          nVal = 0
        }
        nVal = Math.ceil(nVal)
        if (this._fixedTop === nVal) {
          return
        }
        this._fixedTop = nVal
        this.$refs.fixedEle.style[transformStyleKey] = `translate3d(0, ${nVal}px, 0)`
      },
      pos: 'computeCurrentSticky',
      currentIndex(newIndex, oldIndex) {
        console.log(newIndex,oldIndex,'----------------------')
        const oldEle = this.eles[oldIndex]
        const newEle = this.eles[newIndex]
        const currentKey = (newEle) ? newEle.eleKey : newIndex === -1 ? '' : newIndex
        const fixedEle = this.$refs.fixedEle
        const fixedSlot = this.$slots.fixed || this.$scopedSlots.fixed
        const len = this.positions.length
        this.$nextTick(() => {
          if (fixedSlot) {
            this.fixedEleHeight = fixedEle.offsetHeight
          } else {
            const oldChild = fixedEle.firstElementChild
            if (oldEle) {
                oldEle.$el.appendChild(oldChild)
                oldEle.refresh()
                if (oldIndex > 0 || newIndex > 0) {
                    fixedEle.appendChild(oldChild)
                    this.fixedEleHeight = fixedEle.offsetHeight
                }
            }
            if (newEle) {
                let ele = newEle.$el.firstElementChild
                if ( ele ) {
                    fixedEle.appendChild(newEle.$el.firstElementChild)
                    this.fixedEleHeight = fixedEle.offsetHeight
                } else if (oldIndex > 0 || newIndex > 0) {
                    oldEle.$el.appendChild(fixedEle.firstElementChild)
                    oldEle.refresh()
                    this.fixedEleHeight = fixedEle.offsetHeight
                }
            } else {
              this.fixedEleHeight = 0
            }
            if (len > 1 && newIndex < 0 && fixedEle.childNodes && fixedEle.childNodes.length > 1 ) {
                // console.log(newIndex,'oldChild:',oldChild,'fixedEle:',fixedEle,'currentIndex',this.currentIndex,'fixedEle.childNodes.length',fixedEle.childNodes.length,'this.eles',this.eles)
                const flagNode = fixedEle.childNodes
                this.eles[0].$el.appendChild(oldChild)
                this.eles[1].$el.appendChild(flagNode[0])
                this.eles[0].refresh()
                this.eles[1].refresh()
            }
          }
        })
        this.currentKey = currentKey
        this.$emit(EVENT_CHANGE, currentKey, newIndex)
      },
      currentDiff(newVal) {
        let nVal = newVal
        const height = this.heights[this.currentIndex] || 0
        this.$emit(EVENT_DIFF_CHANGE, nVal, height)
      },
      showNav(newVal, oldVal) {
       const fixedEle = this.$refs.fixedEle
       const len = this.positions.length
       const oldChild = fixedEle.firstElementChild
      if (!oldChild) {
          return
      }
       if (this.currentIndex > 0 && len > 1 && (fixedEle.childNodes && fixedEle.childNodes.length < len)) {
         // fixedEle.removeChild(fixedEle.firstElementChild)
         fixedEle.appendChild(this.eles[0].$el.firstElementChild)
         fixedEle.appendChild(oldChild)
         this.$emit('fixedEleHeight',fixedEle.offsetHeight)
       } else if (len > 1 && this.currentIndex < 0) {
           fixedEle.removeChild(oldChild)
           this.eles[1].$el.appendChild(oldChild)
           this.eles[1].refresh()
           this.$emit('fixedEleHeight',fixedEle.offsetHeight)
       } else if (len > 1 && this.currentIndex === 0) {
           this.diff = 0
           this.$emit('fixedEleHeight',fixedEle.offsetHeight)
           // console.log('oldChild:',oldChild,'fixedEle:',fixedEle,'currentIndex',this.currentIndex)
       }
      }
    },
    created() {
      this.fixedEleHeight = 0
      this.eles = []
      this.positions = []
      this.heights = []
    },
    mounted() {
      this.refresh()
    },
    methods: {
      addEle(ele) {
        this.eles.push(ele)
      },
      removeEle(ele) {
        const i = this.eles.indexOf(ele)
        this.eles.splice(i, 1)
        this.positions.splice(i, 1)
      },
      refresh() {
        this.$nextTick(() => {
          this.eles.forEach((ele) => {
            ele.refresh()
          })
          this._calculateHeight()
          this.computeCurrentSticky(this.pos)
        })
      },
      computeCurrentSticky(scrollY) {
        let scrollYL = scrollY
        scrollYL += this.offset

        const positions = this.positions
        const heights = this.heights
        const checkTop = this.checkTop
        const len = positions.length
        for (let i = len - 1; i >= 0; i--) {
          const isLast = i === len - 1
          const nextTop = isLast ? scrollYL : positions[i + 1]
          let top
          let bottom
          if (checkTop) {
            top = positions[i]
            bottom = top + heights[i]
          } else {
            top = positions[i] + heights[i]
            bottom = top
          }
          const max = Math.max(bottom, nextTop)
          if (scrollYL >= top && scrollYL <= max) {
            this.currentIndex = i
            this.currentDiff = scrollYL - top
            const diff = nextTop - scrollYL
            if (diff >= 0 && !isLast) {
              this.diff = diff - (this.fixedEleHeight || heights[i])
            } else {
              this.diff = 0
            }
            return
          }
        }
        this.currentIndex = -1
        this.currentDiff = 0
      },
      _calculateHeight() {
        const eles = this.eles
        eles.forEach((ele, i) => {
          const {top, height} = getRect(ele.$el)
          this.positions[i] = top
          this.heights[i] = height
        })
        this.fixedEleHeight = this.$refs.fixedEle.offsetHeight
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .jm-sticky
        position: relative
        height: 100%
        overflow: hidden

    .jm-sticky-fixed
        z-index: 1
        position: absolute
        top: 0
        left: 0
        right: 0

    .jm-sticky-fixed-fade-enter, .jm-sticky-fixed-fade-leave-active
        opacity: 0

    .jm-sticky-fixed-fade-enter-active, .jm-sticky-fixed-fade-leave-active
        transition: all .2s ease-in-out
</style>

