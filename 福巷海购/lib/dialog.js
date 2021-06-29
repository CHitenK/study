const kkd = tt;
const kkdtype = tt;

/**
 * 弱提示
 * @param {string} title 消息内容
 * @param {function} callback 成功回调函数
 */
let alert = (title, callback) => {
  let data = {
    title: title || "",
    icon: 'none',
    mask: true,
    type: "none", //支付宝,图标类型
    content: title || "", //支付宝,弹窗内容
    success: callback,
    duration: 2000
  };
  kkd.showToast(data);
}

/**
 * 成功弹窗 
 * @param {string} title 消息内容
 * @param {function} callback 成功回调函数
 * */
let success = (title, callback) => {
  let data = {
    title: title || "",
    icon: 'none',
    image: "../../img/pop/success.png",
    mask: true,
    type: "success", //支付宝,图标类型
    content: title || "", //支付宝,弹窗内容
    success: callback,
    duration: 2000
  };
  kkd.showToast(data);
}

/**
 * 失败弹窗 
 * @param {string} title 消息内容
 * @param {function} callback 成功回调函数
 */
let error = (title, callback) => {
  let data = {
    title: title || "",
    icon: 'none',
    image: "../../img/pop/wrong.png",
    mask: true,
    type: "fail", //支付宝,图标类型
    content: title || "", //支付宝,弹窗内容
    success: callback,
    duration: 2000
  };
  kkd.showToast(data);
}

/**
 * 信息弹窗 
 * @param {string} title 消息内容
 * @param {function} callback 成功回调函数
 */
let info = (title, callback) => {
  let data = {
    title: title || "",
    icon: 'none',
    image: "../../img/pop/information.png",
    mask: true,
    type: "exception", //支付宝,图标类型
    content: title || "", //支付宝,弹窗内容
    success: callback,
    duration: 2000
  };
  kkd.showToast(data);
}

/**
 * loading 加载弹窗
 * @param {array} a 传入参数,当为boolean表示隐藏loading框，否则为加载文字
 * time 清除加载超时定时器
 */
let time;
let loading = (...a) => {
  if (typeof a[0] == 'boolean') {
    kkd.hideLoading();
    if (time) {
      clearTimeout(time);
    }
  } else {
    let data = {
      title: a[0] || '加载中',
      content: a[0] || '加载中'
    }
    kkd.showLoading(data);
    time = setTimeout(function () {
      kkd.hideLoading();
      //info("加载超时");
    }, 10000)
  }
}

/**
 * 确认对话框
 */
let confirm = (o) => {
  if (kkdtype === 'tt') { //执行支付宝方法
    tt.showModal({
      title: o.title || "",
      content: o.content,
      showCancel: o.cancel || false,
      cancelText: o.cancelText || "取消",
      confirmText: o.confirmText || "确定",
      confirmColor: "",
      success: (res) => {
        if (res.confirm) {
          o.confirm && o.confirm();
        } else if (res.cancel) {
          o.cancel && o.cancel();
        }
      }
    })
  } else { //执行支付宝方法
    if (o.cancel) { //普通警告框
      my.confirm({
        title: o.title || "",
        content: o.content,
        confirmButtonText: o.confirmText || "确定",
        cancelButtonText: o.cancelText || "取消",
        success: (res) => {
          if (res.confirm) {
            o.confirm && o.confirm();
          } else if (res.cancel) {
            o.cancel && o.cancel();
          }
        }
      });
    } else { //确认对话框
      my.alert({
        title: o.title || "",
        content: o.content,
        buttonText: o.confirmText || "确定",
        success: () => {
          o.confirm && o.confirm();
        },
      });
    }
  }
}
const showDialog = (showCancel,confirmText,title, content,confirm,cancel) => {
  tt.showModal({
    title: title,
    content: content,
   showCancel:showCancel,
   confirmText:confirmText,
    confirmColor:"#E83A30",
    success(res) {
      if (res.confirm) {
        confirm();
      } else if (res.cancel) {
        cancel()
      }
    }
  });
};
 

 
 
const showToast = (content, icon, duration) => {
  tt.showToast({
    title: content,
    icon: icon || "none",
    duration: duration || 2000
  });
}
module.exports = {
  alert: alert,
  success: success,
  error: error,
  info: info,
  loading: loading,
  confirm: confirm,
  showToast: showToast,
  showDialog:showDialog
}