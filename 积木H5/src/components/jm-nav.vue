<template>
    <div class="navBox">
        <jm-scroll-nav-bar
                :current="current"
                :labels="labels"
                :backgroundColor="backgroundColor"
                :activeStyle="activeStyle"
                :defaultStyle="defaultStyle"
                @clickNav="changeHandler"></jm-scroll-nav-bar>
    </div>
</template>
<script>
  import JmScrollNavBar from '../components/jm-scroll-nav-bar'
  import {getJmBusinessData} from '@/api/jmPageConfig'

  export default {
    name: 'jm-nav',
    props: {
      componentsId: {
        type: Number,
        required: true
      },
      specialId: {
        type: String,
        required: true
      },
      currentKey: {
        type: String
      },
      clickNavName: {
        type: String
      },
        businessData: {
            type: Object,
            required: true
        }
    },
    watch: {
      currentKey(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.current = newVal
            this.navIdx = this.labels.findIndex(p=>p === this.current) || 0
        }
      },
      clickNavName(n){
        this.current = n
          this.navIdx = this.labels.findIndex(p=>p === this.current) || 0
      },
        navIdx(newVal, oldVal){
            if (newVal !== oldVal) {
                let data = {}
                data.idx = newVal
                data.name = this.labels[newVal]
                this.$emit('changeNav', data)
            }
        }
    },
    data() {
      return {
        styleObject: null,
        current: null,
        labels: null,
        nowClickName: null,
        listItem: {},
        backgroundColor: null,
        activeStyle: null,
        defaultStyle: null,
        navIdx: null
      };
    },
    created() {
      this.getJmBusinessBannerByProps(this.businessData)
    },
    mounted() {
      if (!this.listItem[this.componentsId]) {
        this.listItem[this.componentsId] = this.$el.offsetHeight
        this.$emit('offsetHeightBack', this.listItem)
      }
    },
    methods: {
      changeHandler(label) {
        // console.log(label,'nav==========================')
        this.nowClickName = label
        this.$emit('clickNav', label)
      },
      getJmBusinessBanner(specialId, componentsId) {
        let getData = {}
        getData.specialId = specialId;
        getData.uuid = componentsId;
        getJmBusinessData(getData).then(res => {
          let item = res.data
          if (item.useLabels && item.useLabels.length > 0) {
            this.current = item.useLabels[0]
            this.labels = item.useLabels
          }
          this.styleObject = {}
          this.styleObject.bgColor = item.bgColor
          this.styleObject.bgColorActive = item.bgColorActive
          this.styleObject.textColor = item.textColor
          this.styleObject.textColorActive = item.textColorActive
          this.getStyle(this.styleObject)
        }).catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
      },
      getJmBusinessBannerByProps(newVal) {
          let item = newVal
          if (item.useLabels && item.useLabels.length > 0) {
            this.current = item.useLabels[0]
            this.labels = item.useLabels
          }
          this.styleObject = {}
          this.styleObject.bgColor = item.bgColor
          this.styleObject.bgColorActive = item.bgColorActive
          this.styleObject.textColor = item.textColor
          this.styleObject.textColorActive = item.textColorActive
          this.getStyle(this.styleObject)
      },
      getStyle(style) {
        this.backgroundColor = {}
        this.backgroundColor.backgroundColor = style.bgColor
        this.defaultStyle = {}
        this.defaultStyle.color = style.textColor
        this.activeStyle = {}
        this.activeStyle.backgroundColor = style.bgColorActive
        this.activeStyle.color = style.textColorActive
      }
    },
    components: {
      JmScrollNavBar
    }
  };
</script>
<style lang="stylus" scoped>
    .cube-scroll-nav-bar-items
        height: 44px
        line-height: 44px

    .cube-scroll-nav-bar-item
        padding: 0 20px !important

    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .list-item
        background: #fff
        height: 44px
        line-height: 44px
        display: inline-block
</style>
