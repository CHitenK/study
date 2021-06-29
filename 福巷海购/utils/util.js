const cf = require('../config/config.js').config;
const dia = require('../lib/dialog.js');
const { pfChannelId, interactiveAPIArray } = require('./../config.js').config

//打印日志
let log = (...a) => {
    if (!cf.debug) return; //是否开启日志功能
    if (typeof console == 'object' && console.log) console.log(...a);
}

function isNull(o) {
    return o == undefined || o == "undefined" || o == null || o == '';
}

function trim(o) {
    return o.replace(/(^\s*)|(\s*$)/g, '');
}

function uniq(array) {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}

//普通弹出框
function alert(content, callback, duration) {
    if (content.length <= 7) {
        tt.showToast({
            icon: "none",
            title: content || "成功",
            duration: duration || 2000,
            success: callback
        });
    } else {
        setTimeout(() => {
            tt.showModal({
                title: '提示',
                content: content || "成功",
                showCancel: false,
                success: callback
            })
        }, 500)

    }
}
//数据加载
function loading(content, time, callback) {
    tt.showLoading({
        mask: true,
        title: content || "loading...",
        success: callback
    });
}
//隐藏提示框
function hideloading() {
    var time = setTimeout(function () {
        tt.hideLoading()
    }, 500);
}
//确认对话框
function confirm(content, callback, isCancel=false,confirmText='确定',cancelText='取消') {
    tt.showModal({
        title: '温馨提示',
        content: content,
        showCancel: isCancel,
        confirmText:confirmText,
        cancelText:cancelText,
        success: callback
    })
}
//保留当前页，跳转页面
function gopage(url, callback) {
    if (url) {
        tt.navigateTo({
            url: url,
            success: callback,
            fail: function (e) {
                console.log("跳转失败：", e);
            }
        })
    }
}
//关闭当前页面，跳转页面
function gotopage(url, callback) {
    tt.redirectTo({
        url: url,
        success: callback
    })
}
//返回第N页，大于跳转页面返回首页
function backpage(n, callback) {
    tt.navigateBack({
        delta: n || 1,
        success: callback
    })
}
//添加缓存【异步】
function setCache(key, data, callback) {
    tt.setStorage({
        key: key,
        data: data
    });
}
//获取缓存【异步】
function getCache(key, callback, failback) {
    tt.getStorage({
        key: key
    });
}
//移除缓存【异步】
function removeCache(key, callback) {
    tt.removeStorage({
        key: key,
        success: callback
    })
}
// 格式化天时分秒
function FormatTime(endTime) {
    endTime = endTime.replace(/-/g, "/");
    var nowTime = new Date().getTime(); //当前时间
    var endTime = new Date(endTime).getTime(); //结束时间
    endTime = endTime > nowTime ? endTime : nowTime; //活动是否已经结束
    if (endTime <= nowTime) {
        clearInterval();
    } else {
        var t = endTime - nowTime;
        var day = Math.floor(t / 1000 / 60 / 60 / 24) + 1;
        var hour = Math.floor(t / 1000 / 60 / 60 % 24);
        var min = Math.floor(t / 1000 / 60 % 60);
        var sec = Math.floor(t / 1000 % 60);
        return {
            day: doubleNum(day),
            hour: doubleNum(hour),
            min: doubleNum(min),
            sec: doubleNum(sec)
        }
    }
}
/**
 * @description 导航跳转
 * @param {Object} that 当前页面
 * @param {Object} pageConfig 后台传过来的配置信息
 */
function goToTabBar(that, pageConfig) {
    //判断当前是否为导航页，控制展示底部导航栏
    try {
        if (cf.config.tabBar.list instanceof Array) {
            var isTabBar = false;
            //比对出当前页面
            for (var i = 0; i < cf.config.tabBar.list.length; i++) {
                if (!isTabBar) {
                    var _pgconfig = cf.config.tabBar.list[i];
                    if (pageConfig.indexOf((_pgconfig.pagePath.replace("pages", ""))) > -1) {
                        //表示导航页
                        isTabBar = true;
                    } else {
                        isTabBar = false
                    }
                }
            }
            if (isTabBar) {
                tt.switchTab({
                    url: pageConfig
                })
            } else {
                tt.navigateTo({
                    url: pageConfig
                })
            }
        } else {
            tt.navigateTo({
                url: pageConfig,
                fail: function () {
                    tt.switchTab({
                        url: pageConfig
                    })
                }
            })
        }
    } catch (e) {
        tt.navigateTo({
            url: pageConfig,
            fail: function () {
                tt.switchTab({
                    url: pageConfig
                })
            }
        })
    }
}

/**
 * @description 导航跳转
 * @param {Object} that 当前页面
 * @param {Object} pageConfig 后台传过来的配置信息
 */
function golevelToTabBar(that, pageConfig, pageUrl) {
    //判断当前是否为导航页，控制展示底部导航栏
    try {
        if (cf.config.tabBar.list instanceof Array) {
            var isTabBar = false;
            //比对出当前页面
            for (var i = 0; i < cf.config.tabBar.list.length; i++) {
                if (!isTabBar) {
                    var _pgconfig = cf.config.tabBar.list[i];
                    if (("../../" + _pgconfig.pagePath) == pageConfig) {
                        //表示导航页
                        isTabBar = true;
                    } else {
                        isTabBar = false
                    }
                }
            }
            if (isTabBar) {
                tt.navigateTo({
                    url: pageUrl
                })
            } else {
                tt.redirectTo({
                    url: pageUrl
                })
            }
        } else {
            tt.redirectTo({
                url: pageUrl
            })
        }
    } catch (e) {
        tt.redirectTo({
            url: pageUrl
        })
    }
}

//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。  
//调用：accAdd(arg1,arg2)  
//返回值：arg1加上arg2的精确结果   
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。  
//调用：accSub(arg1,arg2)  
//返回值：arg1减上arg2的精确结果  
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}
//验证手机号
function checkPhone(phoneVal) {
    if ((/^1[3456789]\d{9}$/.test(phoneVal))) {
        return true;
    } else {
        return false;
    }
}
// 解析二维码链接中的参数
function getQueryString(url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(0).match(reg)
    if (r != null) {
        return r[2]
    }
    return null;
}
// 打开授权设置
function openSet(callback) {
    tt.openSetting({
        success(res) {
            callback(res) || null
        },
        fail(err) {
            callback(err) || null
        }
    })
}

//保留两位小数
function keepTwoDecimalFull(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
//验证身份证号
function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var pass = true;
    if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
        pass = false
    } else if (!city[code.substr(0, 2)]) {
        pass = false
    } else {
        if (code.length == 18) {
            code = code.split('');
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17].toUpperCase()) {
                pass = false
            }
        }
    }
    return pass
}
//warn提示框
function warn(word) {
    tt.showToast({
        title: word, // 内容
        icon: 'none',
        duration: 1000,
        success: (res) => {

        }
    });
}
//判断授权
function JudgeAuth(callback, from) {
    tt.getSetting({
        success: function (res) {
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
                callback && callback(res)
            } else {
                // from 从哪个页面过来 
                tt.navigateTo({
                    url: from ? '/pages/login/login?from=' + from : '/pages/login/login'
                });
            }
        }
    });
}

function cutDownTime(totalTime, intervalDate) {
    var totalSec = totalTime / 1000;
    // var timeId = setInterval(function () {
    //  判断 是否 小于0了
    if (totalSec <= 0) {
        clearInterval(intervalDate);
        return;
    }
    totalSec--;
    var surplusTime = totalSec;
    var hour = Math.floor(totalSec / 3600);
    var minute = Math.floor(totalSec % 3600 / 60);
    var sec = totalSec % 60;

    // 小时
    var hour1 = Math.floor(hour / 10); // 十位 41 / 10  =4.1 所以要取整数
    var hour2 = hour % 10; // 个位

    // 分
    var minute1 = Math.floor(minute / 10); // 是为 55/10 = 5.5 取整
    var minute2 = minute % 10;

    // 秒
    var sec1 = Math.floor(sec / 10);
    var sec2 = Math.floor(sec % 10);
    console.log((hour1.toString()) + (hour2.toString()) + '小时')
    console.log((minute1.toString()) + (minute2.toString()) + '分钟')
    console.log((sec1.toString()) + (sec2.toString()) + '秒')
    return {
        hour: hour1.toString() + hour2.toString(),
        minute: minute1.toString() + minute2.toString(),
        sec: sec1.toString() + sec2.toString(),
        surplusTime: surplusTime
    }
    // },1000)

}

const verifyPhone = (phone) => {
    const PHONE_TEST = /^1[3456789]\d{9}$/;
    return PHONE_TEST.test(phone);
};
const verifyParams = (keys, obj) => {
    return keys.every(key => {
        return obj.hasOwnProperty(key) && obj[key];
    });
};
// 处理请求 旧的 无网关令牌 (不能删除) 
function apiRequest({
    url = '',
    data = {},
    header = {},
    method = 'GET',
    dataType = "json",
    responseType = "text",
}) {
    header['cookie'] = header['cookie'] ? header['cookie'] : 'JSESSIONID=' + tt.getStorageSync('KEY_sessionId')
    data.pfChannelId = pfChannelId
    return new Promise((resolve, reject) => {
        // 调用 wx请求接口
        tt.request({
            url: url,
            data: data,
            header: header,
            method: method,
            dataType: dataType,
            responseType: responseType,
            success: (res) => {
                do {
                    // http异常状态拦截
                    if (res.statusCode == 401) {
                        console.log('接口--->' + url + '--->, 报错信息：' , res.data)
                        if (url.indexOf('cart/confirm/check') < 0 ) { // cart/confirm/check 接口不在此处理401 
                            handle401()
                        }
                        reject({ code: 401, msg: ''})
                    }
                    if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
                        console.log('接口--->' + url + '--->, 报错信息：' , res.data)
                        reject(res)
                    }
                    if (res.data.code === 1 || res.data.code === 200) {
                        resolve(res.data);
                    } else if (res.data.code == 429) { // 处理json
                        handle429(res.data, url)
                        reject(res.data)
                    } else {
                        console.log('接口--->' + url + '--->, 报错信息：'  ,  res.data)
                        reject(res.data);
                    }
                    // 埋点
                    if ((res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) || (res.data.code !== 1 && res.data.code !== 200)) {
                        // 埋点
                        statistics('ajaxError', { url: url, data: data ? JSON.stringify(data) : '', res:  res.data ?  JSON.stringify(res.data) : '', time: formatDate(Date.now()) })
                    }
                } while (false);
            },
            fail: (res) => {
                dia.loading(false)
                reject(res);
                statistics('ajaxError', { url: url, data: data ? JSON.stringify(data) : '', res:  res ?  JSON.stringify(res) : '', time: formatDate(Date.now())})
            },
            complete: () => {}
        });
    });
}
// 处理json文件
function ajaxJSON({
    url = '',
    method= 'GET'
}) {
    return new Promise((resolve, reject) => {
        // 调用 wx请求接口
        tt.request({
            url: url,
            method: method,
            success: (res) => {
                do {
                    if (res.statusCode == 200 || res.statusCode == 301 || res.statusCode == 302) {
                        resolve(res.data)  
                    } else {
                        console.log('接口--->' + url + '--->, 报错信息：' + res.data)
                        reject(res)
                    }
                   
                } while (false);
            },
            fail: (res) => {
                reject(res);
            },
            complete: () => {}
        });
    });
}
// 处理请求 新的 设置了网关令牌(不能删除)
function request(opt) {
  const index = opt.url.indexOf('mobi')
  const urlStr = opt.url.substring(index + 5)// 请求地址(无域名)
  let lingpaiUrl = '' 
  if (opt.url.indexOf('-api') > 0) {
    lingpaiUrl = cf.apiTokenUrl + urlStr  // api请求地址
  } else if (opt.url.indexOf('-user') > 0) {
    lingpaiUrl = cf.userTokenUrl + urlStr  // user请求地址
  } else if (opt.url.indexOf('-pay') > 0) {
    lingpaiUrl = cf.payTokenUrl + urlStr  // pay请求地址
  }
  // 请求
  return new Promise((resolve, reject) => {
    tt.request({
        url: lingpaiUrl,
        method: opt.method || 'get',
        dataType: opt.dataType,
        data: { t: Date.now() },
        success: (e) => {
            // 拦截请求不通过
            if (!(e.statusCode === 200 && (e.data.code === 1 || e.data.code === 200))) {
                handle429(e.data, urlStr)
                return false
            }
            opt.header = opt.header || {}
            opt.header['cookie'] = opt.header['cookie'] ? opt.header['cookie'] : 'JSESSIONID=' + tt.getStorageSync('KEY_sessionId')
            opt.data = {...opt.data, pfChannelId: pfChannelId }
            // 调用 wx请求接口
            tt.request({
                url: opt.url,
                data: opt.data,
                header: opt.header,
                method: opt.method || 'GET',
                dataType: opt.dataType || 'json',
                responseType: opt.responseType || 'text',
                success: (res) => {
                    do {
                        // http异常状态拦截
                        if (res.statusCode == 401) {
                            console.log('接口--->' + opt.url + '--->, 报错信息：' + res.data)
                            handle401()
                            reject({ code: 401, msg: ''} )
                        }
                        if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
                            console.log('接口--->' + opt.url + '--->, 报错信息：' + res.data)
                            reject(res)
                        }
                        if (res.data.code === 1 || res.data.code === 200) {
                            resolve(res.data);
                        } else {
                            console.log('接口--->' + opt.url + '--->, 报错信息：' + res.data)
                            reject(res.data);
                        }
                    } while (false);
                },
                fail: (res) => {
                    dia.loading(false)
                    reject(res);
                },
                complete: () => {}
            });
        },
        fail: res => {
            reject({ code: 429, msg: ''})
            handle429(res, urlStr)
        }
    })
  })
}
// 获取 2020-07-09 15:38:15 格式时间的毫秒数
function getMillisecond(date) {
    let time = date.replace(new RegExp("-","gm"),"/");
    time = (new Date(time)).getTime()
    return time
}
//  拦截未登录
function handle401() {
    if (!tt.getStorageSync('code_401')) { // code_401 保证执行一次
        tt.setStorageSync('code_401', true)
        console.log('拦截401')
        tt.navigateTo({
            url: '/pages/login/login'
        });
    }
}
// 拦截令牌不通过
function handle429(res, url='') {
    const routers = getCurrentPages() // 路径路由  \
    if (routers && routers.length > 0 && !tt.getStorageSync('code_429')) { // code_429 保证执行一次
        tt.setStorageSync('code_429', true)
        const route = routers[routers.length -1]
        tt.showModal({
            title: "温馨提示",
            content: "系统繁忙，稍后重试",
            showCancel: false,
            // confirmText: '关闭',
            success(res) {
              tt.setStorageSync('code_429', false)
              if (res.confirm) {
                return false
                let flage = false
                interactiveAPIArray.forEach(item => {
                    if (url.indexOf(item) > -1) {
                        flage = true
                    }
                })
                if (!flage) {
                    route.onLoad(route.options)
                    route.onShow()
                }
              }
            },
            fail(res) {
                tt.setStorageSync('code_429', false)
            }
        })
    }
}
/*
* fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
*/
function debounce(fn, delay = 500) {
    let timer;

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
    return function () {

        var context = this
        var args = arguments

        clearTimeout(timer)

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}
// 节流
function throttle (fn, gapTime = 1000) {
    let _lastTime = null;

    return function () {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments);
            _lastTime = _nowTime;
        }
    }
}
// 字节埋点统计
function statistics(name='', data={}) {
    console.log('埋点------事件' + name + '----------->' ,data)
    tt.reportAnalytics(name, data)
}
// 时间戳赚换时间日期 YYYY-MM-dd HH:mm:ss
function formatDate(date) {
    var date = new Date(date)
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD +" "+hh + mm + ss;
  }
// 拦截
module.exports = {
    log: log, //日志
    isNull: isNull, //判断是否为空
    alert: alert, //弹出框
    loading: loading, //数据加载
    gopage: gopage,
    confirm: confirm,
    gotopage: gotopage,
    backpage: backpage,
    setCache: setCache,
    getCache: getCache,
    removeCache: removeCache,
    hideloading: hideloading,
    FormatTime: FormatTime,
    goToTabBar: goToTabBar,
    golevelToTabBar: golevelToTabBar,
    accAdd: accAdd,
    accSub: accSub,
    checkPhone: checkPhone,
    getQueryString: getQueryString, //解析二维码链接中的参数
    openSet: openSet, // 打开设置
    trim: trim,
    uniq: uniq,
    warn: warn,
    IdentityCodeValid: IdentityCodeValid,
    keepTwoDecimalFull: keepTwoDecimalFull,
    JudgeAuth: JudgeAuth,
    verifyPhone: verifyPhone,
    verifyParams: verifyParams,
    cutDownTime: cutDownTime,
    // request: request, // 网关令牌
    request: apiRequest, // 无网关令牌
    getMillisecond: getMillisecond,
    ajaxJSON: ajaxJSON,
    debounce:debounce,
    throttle:throttle,
    statistics: statistics,
    formatDate: formatDate
}