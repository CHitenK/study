<script>
  import JmBanner from '@/components/jm-banner.vue'
  import JmNav from '@/components/jm-nav.vue'
  import JmStickyEle from '@/components/jm-sticky-ele.vue'
  import JmNavEle from '@/components/jm-nav-ele.vue'
  import JmCoupon from '@/components/jm-coupon.vue'
  import JmSales from '@/components/jm-sales.vue'
  import JmSearch from '../components/jm-search'
  import JmProducts from '../components/jm-product'
  import JmShowcase from '../components/jm-showcase'
  import JmLicense from '../components/jm-license'
  export default {
    name: 'child-wrapper',
    provide() { // 锚点组件用到
      return {
        wrapper: this
      }
    },
    props: {
      specialId: String,
      childData: Array,
      clickNavName: String,
      scrollY: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        moveHeight: 10,
        createdTiming: 0,
        jmTiming: 0,
        offsetHeightList: [],
        domSticky: null,
        navEleArr: null,
        domOver: false,
        currentIndex: null,
        currentName: '',
        isLast: null,
        navIdx: 0, // 吸顶组件高度
        navHight: 0 // 吸顶组件高度
      };
    },
    components: {
      JmBanner,
      JmNav,
      JmCoupon,
      JmSales,
      JmStickyEle,
      JmNavEle,
      JmSearch,
      JmProducts,
      JmShowcase,
      JmLicense
    },
    watch: {
      offsetHeightList(newVal, oldVal) {
        if ((newVal.length === this.childData.length)) {
          // if (this.getDomSticky()) {
          //   this.getNavPreOffsetHeight(newVal)
          // }
            this.getNavOffsetTop(newVal)
            this.navIdx = this.childData.findIndex(p => p.name === this.getDomSticky())
            this.navHight = this.getDomSticky() ? this.childData[this.navIdx].heightY : 0
            this.domOver = true
        }
      },
      scrollY: 'computeCurrentNav',
      currentIndex(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.childData && this.childData.length > 0 && this.childData[newVal] && this.childData[newVal].modelName) {
            this.currentName = this.childData[newVal].modelName
          }
        }
      }
    },
    render: function (h) { // 渲染函数
      const content = this.childData;
      let create = h;
      let domName = this.getDomStickyOne()
      let hasNav = this.domNameHasNav(domName)
      // let domName = this.getDomSticky()
      let jmDom = create('div', content.map(item => {
        if ((domName && domName.length > 0 && item.name === domName[0].name) || (domName && domName.length > 1 && item.name === domName[1].name)) {
          let AnchorDomName = 'jm-sticky-ele';
          let childDom
          if (hasNav) {
            childDom = [
              create(item.name, {
                props: {
                  specialId: this.specialId,
                  componentsId: item.uuid,
                  currentKey: this.currentName,
                  clickNavName: this.clickNavName,
                    businessData: item.businessData
                },
                ref: item.label + item.uuid,
                on: {
                  offsetHeightBack: this.getDomOffsetHeight,
                  clickNav: this.clickNav,
                  changeNav: this.changeNav
                }
              })
            ]
          } else {
            childDom = [
              create(item.name, {
                props: {specialId: this.specialId, componentsId: item.uuid, businessData: item.businessData},
                ref: item.label + item.uuid,
                on: {
                  offsetHeightBack: this.getDomOffsetHeight
                }
              })
            ]
          }
          return create(
            AnchorDomName, {
              ref: 'navBarEle'
            },
            childDom
          )
        } else if (item.modelName && item.modelId) {
          // return create('div')
          let AnchorDomName = 'jm-nav-ele';
          return create(
            AnchorDomName, {
              props: {
                eleKey: item.modelName
              },
              ref: item.label + item.uuid
            },
            [
              create(item.name, {
                props: {specialId: this.specialId, componentsId: item.uuid, businessData: item.businessData},
                on: {
                  offsetHeightBack: this.getDomOffsetHeight
                }
              })
            ]
          )
        } else {
          // return create('div')
          let childDom
          if (!hasNav && item.name === 'jm-nav') {
            childDom = [
              create(item.name, {
                props: {
                  specialId: this.specialId,
                  componentsId: item.uuid,
                  currentKey: this.currentName,
                  clickNavName: this.clickNavName,
                    businessData: item.businessData
                },
                ref: item.label + item.uuid,
                on: {
                  offsetHeightBack: this.getDomOffsetHeight,
                  clickNav: this.clickNav,
                  changeNav: this.changeNav
                }
              })
            ]
          } else {
            childDom = create(item.name, {
              props: {specialId: this.specialId, componentsId: item.uuid, businessData: item.businessData},
              ref: item.label + item.uuid,
              on: {
                offsetHeightBack: this.getDomOffsetHeight
              }
            });
          }
          return childDom
        }
      }));
      return jmDom
    },
    created() { // 生命周期
      this.createdTiming = new Date().getTime()
      this.domSticky = this.getDomSticky()
      this.domOver = false
    },
    methods: {
      getNavPreOffsetHeight(newVal) {
        let copyArr = [...this.childData]
        this.moveHeight = 0;
        if (copyArr.length === 0) {
          return;
        }
        let idx = copyArr.findIndex(p => p.name === this.getDomSticky())
        if (idx === -1 || idx === 0) {
          return
        }
        let preBeforeArr = copyArr.slice(0, idx)
        preBeforeArr.forEach((item, index, array) => {
          this.moveHeight = this.moveHeight + this.$refs[item.label + item.uuid].$el.offsetHeight
        });
      },
      getNavOffsetTop(newVal) {
        let dom = this.getDomStickyOne()
          let stickyHeight = 0
            this.childData.forEach((item, index, array) => {
                item.heightY = this.$refs[item.label + item.uuid].$el.offsetHeight
                if ( (dom && dom.length > 0 && dom[0].name === item.name) || (dom && dom.length > 1 && dom[1].name === item.name)) {
                    item.top = this.moveHeight
                    item.bottom = this.moveHeight + this.$refs[item.label + item.uuid].$el.offsetHeight
                    stickyHeight += item.heightY
                } else {
                    item.top = this.$refs[item.label + item.uuid].$el.offsetTop
                    item.bottom = this.$refs[item.label + item.uuid].$el.offsetTop + this.$refs[item.label + item.uuid].$el.offsetHeight
                }
                for (let val of newVal) {
                  if (item.uuid === val.componentsId && val.product) {
                    item.KjProduct = val.product
                  }
                }
            });
        this.moveHeight = stickyHeight
        this.$emit('dom-over', newVal, this.moveHeight, this.childData, stickyHeight)
      },
      getDomOffsetHeight(e) {
        this.offsetHeightList.push(e);
      },
      getDomSticky() {
        let pArr = [...this.childData]
        let arr = pArr.filter(p => p.location === 0)
        if (arr.length > 0 && arr.length === 1) {
          return arr[0].name
        } else if (arr.length > 1) {
          let winArr = arr.find(p => p.name === 'jm-search')
          let winName = winArr ? 'jm-search' : 'jm-nav'
          return winName
        } else {
          return null
        }
      },
      getDomStickyOne() {
        let pArr = [...this.childData]
        let arr = pArr.filter(p => p.location === 0)
        return arr && arr.length > 0 ? arr : null
      },
      domNameHasNav(domName) {
          let flag = false;
          if ( domName && domName.length > 0 ) {
              let idx = domName.findIndex(p => p.name === 'jm-nav')
              flag = idx >= 0
          } else {
              flag = false
          }
          return flag
      },
      computeCurrentNav(scrollY) {
        let scrollYL = scrollY + this.moveHeight
        if (this.domOver) {
            for (let i = this.childData.length - 1; i >= 0; i--) {
                // const isLast = (i === (this.childData.length - 1))
                if (scrollYL >= this.childData[i].top && scrollYL <= this.childData[i].bottom) {
                    this.currentIndex = i
                }
            }
        }
      },
      clickNav(label) {
        let item = this.childData.find(p => p.modelName && (p.modelName === label))
        // let navItem = this.childData.find(p => p.name === this.getDomSticky())
        // let navHight = this.getDomSticky() ? navItem.heightY : 0
          setTimeout(() => {
              let idx = this.childData.findIndex(p => p.modelName && (p.modelName === label))
              this.currentIndex = idx
          },800)
        this.$emit('clickNav', item, this.moveHeight, label)
      },
      changeNav(n) {
          this.$emit('changeNav', n)
      }
    }
  };
</script>

