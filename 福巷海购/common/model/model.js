var app = getApp();
var $ = require('../../utils/util.js');
/** 
 * 弹窗组件
 * params isMask 是否显示遮罩 isMaskBox是否弹窗内容框
 * title 标题 可不填 Array
 * content 内容 必填
 * buttonText 按钮文案 可不填 默认 “知道了” 不超8个汉字
 * buttonStyle 0 无背景按钮 1：背景按钮 可不填 默认为0
 * buttonTextColor 按钮文字颜色 可不填 有默认值 当buttonStyle=0 默认红色，buttonStyle=0 默认白色
 * buttonBackgroundColor 按钮背景颜色 可不填 默认红色
 * HelpText 右上角帮助信息 可不填
 */
Component({
    //属性值   
    properties: {
        clickMask: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        content: {
            type: Array,
            value: []
        },
        buttonStyle: {
            type: Number,
            value: 0,
        },
        buttonText: {
            type: String,
            value: '知道了',
        },
        buttonTextColor: {
            type: String,
            value: '',
        },
        buttonBackgroundColor: {
            type: String,
            value: '',
        },
        HelpText: {
            type: String,
            value: '',
        },
    },
    // 私有数据，可用于模版渲染 
    // 组件内部数据
    data: {
        isMask: false,
        isMaskBox: false,
        onceMoreModel: false //是否是再次弹窗
    },

    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {},

    ready: function () {

    },

    // 组件自定义方法
    methods: {
        comfirm() {
            if (!this.data.onceMoreModel) {
                this.closeModel()
            }
            this.triggerEvent('modelevent', {
                type: 'comfirm',
                onceMoreModel: this.data.onceMoreModel
            })
        },
        help() {
            // this.closeModel()
            this.triggerEvent('modelevent', {
                type: 'help'
            })
        },
        closeModel(e) {
            let type = e && e.currentTarget.dataset.type ? e.currentTarget.dataset.type : null // type='clickMask'证明点击遮罩层
            // 如果是clickMask=false点击遮罩层不可隐藏弹窗
            if (type == 'clickMask') {
                return false
            }
            this.setData({
                isMaskBox: false,
                isMask: false
            })
        },
        openModel() {
            this.setData({
                isMaskBox: true,
                isMask: true
            })
        }
    }
})