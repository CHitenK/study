<template>
    <div class="jm-scroll-nav-bar" :class="'jm-scroll-nav-bar_' + direction" :style="backgroundColor">
        <cube-scroll
                ref="navScroll"
                nestMode="none"
                :options="options"
                :direction="direction">
            <div class="jm-scroll-nav-bar-items" ref="items">
                <div
                        class="jm-scroll-nav-bar-item"
                        v-for="(txt, index) in labels"
                        :key="index"
                        :class="{'jm-scroll-nav-bar-item_active': active === labels[index]}"
                        :style="[active === labels[index]?activeStyle:defaultStyle, isokWidth?isokWidthStyle:isnoWidthStyle ]"
                        @click="clickHandler(labels[index])">
                    <slot
                            :txt="txt"
                            :index="index"
                            :active="active"
                            :label="labels[index]">
                        <span v-html="txt"></span>
                    </slot>
                </div>
            </div>
        </cube-scroll>
    </div>
</template>

<script type="text/ecmascript-6">
  import scrollMixin from '../common/mixins/scroll'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  const COMPONENT_NAME = 'jm-scroll-nav-bar'
  const EVENT_CHANGE = 'change'

  export default {
    name: COMPONENT_NAME,
    inject: {
      scrollNav: {
        default: null
      }
    },
    mixins: [scrollMixin],
    props: {
      direction: {
        type: String,
        default: DIRECTION_H,
        validator(val) {
          return val === DIRECTION_H || val === DIRECTION_V
        }
      },
      labels: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      },
      current: {
        type: [String, Number],
        default: ''
      },
      backgroundColor: {
        type: Object
      },
      activeStyle: {
        type: Object
      },
      defaultStyle: {
        type: Object
      }
      // txts: {
      //   type: Array,
      //   default() {
      //     this._defaultTxts = true
      //     /* istanbul ignore next */
      //     return this.labels
      //   }
      // },

    },
    data() {
      return {
        active: this.current,
        usedTxts: this.txts,
        width: null,
        isokWidth: false,
        isokWidthStyle: {},
        isnoWidthStyle: {width: 'auto'}
      }
    },
    watch: {
      labels(newLabels) {
        if (this._defaultTxts) {
          this.usedTxts = newLabels
        }
      },
      current(newVal) {
        this.active = newVal
      },
      active(newVal) {
        this.$emit(EVENT_CHANGE, newVal)
        this._adjust()
      }
    },
    mounted() {
      this.scrollNav && this.scrollNav.setBar(this)
      // this.$nextTick(() => {
      //   console.log(this.styleObj,'scrollNav====================')
      //   this.getStyle(this.styleObj)
      // })
      if (this.active) {
        // waiting panels loaded
        this.$nextTick(() => {
          this._adjust()
        })
      }
      this.setWidth()
    },
    beforeDestroy() {
      this.scrollNav && this.scrollNav.setBar(null)
    },
    methods: {
      clickHandler(label) {
        if (label === this.active) {
          return
        }
        this.active = label
        this.scrollNav && this.scrollNav.barChange(label)
        this.$emit('clickNav', label)
      },
      refresh() {
        this.$refs.navScroll.refresh()
        this._adjust()
      },
      _adjust() {
        // waiting ui
        this.$nextTick(() => {
          const isHorizontal = this.direction === DIRECTION_H
          const targetProp = isHorizontal ? 'clientWidth' : 'clientHeight'
          const active = this.active
          const viewportSize = this.$refs.navScroll.$el[targetProp]
          const itemsEle = this.$refs.items
          const scrollerSize = itemsEle[targetProp]
          const minTranslate = Math.min(0, viewportSize - scrollerSize)
          const middleTranslate = viewportSize / 2
          const items = itemsEle.children
          let size = 0
          this.labels.every((label, index) => {
            if (label === active) {
              size += (items[index][targetProp] / 2)
              return false
            }
            size += items[index][targetProp]
            return true
          })
          let translate = middleTranslate - size
          translate = Math.max(minTranslate, Math.min(0, translate))
          this.$refs.navScroll.scrollTo(isHorizontal ? translate : 0, isHorizontal ? 0 : translate, 300)
        })
      },
      setWidth() { // 控制分类选项按钮大小（当分类选项按钮不足以铺满一屏幕宽度,调整分类选项按钮大小铺满一屏）
        this.$nextTick(() => {
          let totalWidth = this.$refs.items.offsetWidth
          let bodyWidth = document.body.offsetWidth
          if (totalWidth && bodyWidth && totalWidth < bodyWidth ) {
            this.isokWidth = true
            this.width = bodyWidth / this.labels.length
            this.isokWidthStyle.width = this.width + 'px'
            this.isokWidthStyle.boxSizing = 'border-box'
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .jm-scroll-nav-bar
        position: relative
        display: flex

    .jm-scroll-nav-bar_horizontal
        align-items: center

        .cube-scroll-wrapper
            flex: 1
            text-align: center

        .cube-scroll-content
            display: inline-block
            vertical-align: top

        .jm-scroll-nav-bar-items
            white-space: nowrap

    .jm-scroll-nav-bar_vertical
        height: 100%
        justify-content: center
        text-align: center

        .jm-scroll-nav-bar-item
            display: block

    .jm-scroll-nav-bar-items
        font-size: 14px

    .jm-scroll-nav-bar-item
        display: inline-block
        vertical-align: top
        padding: 20px 15px

    .jm-scroll-nav-bar-item_active
        color: $scroll-nav-active-color
</style>
