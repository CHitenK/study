(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[1],{

/***/ "./components/commomBus/index.js":
/*!***************************************!*\
  !*** ./components/commomBus/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.12.1@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.12.1@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.12.1@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/_@babel_runtime@7.12.1@@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/_@babel_runtime@7.12.1@@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! weixin-js-sdk */ "./node_modules/_weixin-js-sdk@1.6.0@weixin-js-sdk/index.js");
/* harmony import */ var weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var Bus = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Bus, _React$Component);

  var _super = _createSuper(Bus);

  function Bus() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Bus);

    return _super.apply(this, arguments);
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Bus, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onRef(this); // ->将child传递给this.props.onRef()方法
    } // 调转

  }, {
    key: "navigateTo",
    value: function navigateTo(url, type) {
      if (type === 'redirectTo') {
        weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6___default.a.miniProgram.redirectTo({
          url: url
        });
      } else if (type === 'reLaunch') {
        weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6___default.a.miniProgram.reLaunch({
          url: url
        });
      } else if (type === 'switchTab') {
        weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6___default.a.miniProgram.switchTab({
          url: url
        });
      } else {
        weixin_js_sdk__WEBPACK_IMPORTED_MODULE_6___default.a.miniProgram.navigateTo({
          url: url
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }]);

  return Bus;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Bus);

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/_webpack@4.44.1@webpack/buildin/harmony-module.js */ "./node_modules/_webpack@4.44.1@webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/_weixin-js-sdk@1.6.0@weixin-js-sdk/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/_weixin-js-sdk@1.6.0@weixin-js-sdk/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!(function(e, n) {
  module.exports = n(e);
})(window, function(o, e) {
  if (!o.jWeixin) {
    var n,
      c = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest",
        openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
        startSearchBeacons: "startMonitoringBeacons",
        stopSearchBeacons: "stopMonitoringBeacons",
        onSearchBeacons: "onBeaconsInRange",
        consumeAndShareCard: "consumedShareCard",
        openAddress: "editAddress"
      },
      a = (function() {
        var e = {};
        for (var n in c) e[c[n]] = n;
        return e;
      })(),
      i = o.document,
      t = i.title,
      r = navigator.userAgent.toLowerCase(),
      s = navigator.platform.toLowerCase(),
      d = !(!s.match("mac") && !s.match("win")),
      u = -1 != r.indexOf("wxdebugger"),
      l = -1 != r.indexOf("micromessenger"),
      p = -1 != r.indexOf("android"),
      f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
      m = (n =
        r.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
        r.match(/micromessenger\/(\d+\.\d+)/))
        ? n[1]
        : "",
      g = {
        initStartTime: L(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
      },
      h = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: f ? 1 : p ? 2 : -1,
        clientVersion: m,
        url: encodeURIComponent(location.href)
      },
      v = {},
      S = { _completes: [] },
      y = { state: 0, data: {} };
    O(function() {
      g.initEndTime = L();
    });
    var I = !1,
      _ = [],
      w = {
        config: function(e) {
          B("config", (v = e));
          var t = !1 !== v.check;
          O(function() {
            if (t)
              M(
                c.config,
                {
                  verifyJsApiList: C(v.jsApiList),
                  verifyOpenTagList: C(v.openTagList)
                },
                (function() {
                  (S._complete = function(e) {
                    (g.preVerifyEndTime = L()), (y.state = 1), (y.data = e);
                  }),
                    (S.success = function(e) {
                      h.isPreVerifyOk = 0;
                    }),
                    (S.fail = function(e) {
                      S._fail ? S._fail(e) : (y.state = -1);
                    });
                  var t = S._completes;
                  return (
                    t.push(function() {
                      !(function() {
                        if (
                          !(
                            d ||
                            u ||
                            v.debug ||
                            m < "6.0.2" ||
                            h.systemType < 0
                          )
                        ) {
                          var i = new Image();
                          (h.appId = v.appId),
                            (h.initTime = g.initEndTime - g.initStartTime),
                            (h.preVerifyTime =
                              g.preVerifyEndTime - g.preVerifyStartTime),
                            w.getNetworkType({
                              isInnerInvoke: !0,
                              success: function(e) {
                                h.networkType = e.networkType;
                                var n =
                                  "https://open.weixin.qq.com/sdk/report?v=" +
                                  h.version +
                                  "&o=" +
                                  h.isPreVerifyOk +
                                  "&s=" +
                                  h.systemType +
                                  "&c=" +
                                  h.clientVersion +
                                  "&a=" +
                                  h.appId +
                                  "&n=" +
                                  h.networkType +
                                  "&i=" +
                                  h.initTime +
                                  "&p=" +
                                  h.preVerifyTime +
                                  "&u=" +
                                  h.url;
                                i.src = n;
                              }
                            });
                        }
                      })();
                    }),
                    (S.complete = function(e) {
                      for (var n = 0, i = t.length; n < i; ++n) t[n]();
                      S._completes = [];
                    }),
                    S
                  );
                })()
              ),
                (g.preVerifyStartTime = L());
            else {
              y.state = 1;
              for (var e = S._completes, n = 0, i = e.length; n < i; ++n)
                e[n]();
              S._completes = [];
            }
          }),
            w.invoke ||
              ((w.invoke = function(e, n, i) {
                o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
              }),
              (w.on = function(e, n) {
                o.WeixinJSBridge && WeixinJSBridge.on(e, n);
              }));
        },
        ready: function(e) {
          0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
        },
        error: function(e) {
          m < "6.0.2" || (-1 == y.state ? e(y.data) : (S._fail = e));
        },
        checkJsApi: function(e) {
          M(
            "checkJsApi",
            { jsApiList: C(e.jsApiList) },
            ((e._complete = function(e) {
              if (p) {
                var n = e.checkResult;
                n && (e.checkResult = JSON.parse(n));
              }
              e = (function(e) {
                var n = e.checkResult;
                for (var i in n) {
                  var t = a[i];
                  t && ((n[t] = n[i]), delete n[i]);
                }
                return e;
              })(e);
            }),
            e)
          );
        },
        onMenuShareTimeline: function(e) {
          P(
            c.onMenuShareTimeline,
            {
              complete: function() {
                M(
                  "shareTimeline",
                  {
                    title: e.title || t,
                    desc: e.title || t,
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                    type: e.type || "link",
                    data_url: e.dataUrl || ""
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareAppMessage: function(n) {
          P(
            c.onMenuShareAppMessage,
            {
              complete: function(e) {
                "favorite" === e.scene
                  ? M("sendAppMessage", {
                      title: n.title || t,
                      desc: n.desc || "",
                      link: n.link || location.href,
                      img_url: n.imgUrl || "",
                      type: n.type || "link",
                      data_url: n.dataUrl || ""
                    })
                  : M(
                      "sendAppMessage",
                      {
                        title: n.title || t,
                        desc: n.desc || "",
                        link: n.link || location.href,
                        img_url: n.imgUrl || "",
                        type: n.type || "link",
                        data_url: n.dataUrl || ""
                      },
                      n
                    );
              }
            },
            n
          );
        },
        onMenuShareQQ: function(e) {
          P(
            c.onMenuShareQQ,
            {
              complete: function() {
                M(
                  "shareQQ",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareWeibo: function(e) {
          P(
            c.onMenuShareWeibo,
            {
              complete: function() {
                M(
                  "shareWeiboApp",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareQZone: function(e) {
          P(
            c.onMenuShareQZone,
            {
              complete: function() {
                M(
                  "shareQZone",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        updateTimelineShareData: function(e) {
          M(
            "updateTimelineShareData",
            { title: e.title, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        updateAppMessageShareData: function(e) {
          M(
            "updateAppMessageShareData",
            { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        startRecord: function(e) {
          M("startRecord", {}, e);
        },
        stopRecord: function(e) {
          M("stopRecord", {}, e);
        },
        onVoiceRecordEnd: function(e) {
          P("onVoiceRecordEnd", e);
        },
        playVoice: function(e) {
          M("playVoice", { localId: e.localId }, e);
        },
        pauseVoice: function(e) {
          M("pauseVoice", { localId: e.localId }, e);
        },
        stopVoice: function(e) {
          M("stopVoice", { localId: e.localId }, e);
        },
        onVoicePlayEnd: function(e) {
          P("onVoicePlayEnd", e);
        },
        uploadVoice: function(e) {
          M(
            "uploadVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        downloadVoice: function(e) {
          M(
            "downloadVoice",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        translateVoice: function(e) {
          M(
            "translateVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        chooseImage: function(e) {
          M(
            "chooseImage",
            {
              scene: "1|2",
              count: e.count || 9,
              sizeType: e.sizeType || ["original", "compressed"],
              sourceType: e.sourceType || ["album", "camera"]
            },
            ((e._complete = function(e) {
              if (p) {
                var n = e.localIds;
                try {
                  n && (e.localIds = JSON.parse(n));
                } catch (e) {}
              }
            }),
            e)
          );
        },
        getLocation: function(e) {},
        previewImage: function(e) {
          M(c.previewImage, { current: e.current, urls: e.urls }, e);
        },
        uploadImage: function(e) {
          M(
            "uploadImage",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        downloadImage: function(e) {
          M(
            "downloadImage",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        getLocalImgData: function(e) {
          !1 === I
            ? ((I = !0),
              M(
                "getLocalImgData",
                { localId: e.localId },
                ((e._complete = function(e) {
                  if (((I = !1), 0 < _.length)) {
                    var n = _.shift();
                    wx.getLocalImgData(n);
                  }
                }),
                e)
              ))
            : _.push(e);
        },
        getNetworkType: function(e) {
          M(
            "getNetworkType",
            {},
            ((e._complete = function(e) {
              e = (function(e) {
                var n = e.errMsg;
                e.errMsg = "getNetworkType:ok";
                var i = e.subtype;
                if ((delete e.subtype, i)) e.networkType = i;
                else {
                  var t = n.indexOf(":"),
                    o = n.substring(t + 1);
                  switch (o) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                      e.networkType = o;
                      break;
                    default:
                      e.errMsg = "getNetworkType:fail";
                  }
                }
                return e;
              })(e);
            }),
            e)
          );
        },
        openLocation: function(e) {
          M(
            "openLocation",
            {
              latitude: e.latitude,
              longitude: e.longitude,
              name: e.name || "",
              address: e.address || "",
              scale: e.scale || 28,
              infoUrl: e.infoUrl || ""
            },
            e
          );
        },
        getLocation: function(e) {
          M(
            c.getLocation,
            { type: (e = e || {}).type || "wgs84" },
            ((e._complete = function(e) {
              delete e.type;
            }),
            e)
          );
        },
        hideOptionMenu: function(e) {
          M("hideOptionMenu", {}, e);
        },
        showOptionMenu: function(e) {
          M("showOptionMenu", {}, e);
        },
        closeWindow: function(e) {
          M("closeWindow", {}, (e = e || {}));
        },
        hideMenuItems: function(e) {
          M("hideMenuItems", { menuList: e.menuList }, e);
        },
        showMenuItems: function(e) {
          M("showMenuItems", { menuList: e.menuList }, e);
        },
        hideAllNonBaseMenuItem: function(e) {
          M("hideAllNonBaseMenuItem", {}, e);
        },
        showAllNonBaseMenuItem: function(e) {
          M("showAllNonBaseMenuItem", {}, e);
        },
        scanQRCode: function(e) {
          M(
            "scanQRCode",
            {
              needResult: (e = e || {}).needResult || 0,
              scanType: e.scanType || ["qrCode", "barCode"]
            },
            ((e._complete = function(e) {
              if (f) {
                var n = e.resultStr;
                if (n) {
                  var i = JSON.parse(n);
                  e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                }
              }
            }),
            e)
          );
        },
        openAddress: function(e) {
          M(
            c.openAddress,
            {},
            ((e._complete = function(e) {
              e = (function(e) {
                return (
                  (e.postalCode = e.addressPostalCode),
                  delete e.addressPostalCode,
                  (e.provinceName = e.proviceFirstStageName),
                  delete e.proviceFirstStageName,
                  (e.cityName = e.addressCitySecondStageName),
                  delete e.addressCitySecondStageName,
                  (e.countryName = e.addressCountiesThirdStageName),
                  delete e.addressCountiesThirdStageName,
                  (e.detailInfo = e.addressDetailInfo),
                  delete e.addressDetailInfo,
                  e
                );
              })(e);
            }),
            e)
          );
        },
        openProductSpecificView: function(e) {
          M(
            c.openProductSpecificView,
            {
              pid: e.productId,
              view_type: e.viewType || 0,
              ext_info: e.extInfo
            },
            e
          );
        },
        addCard: function(e) {
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, card_ext: r.cardExt };
            i.push(a);
          }
          M(
            c.addCard,
            { card_list: i },
            ((e._complete = function(e) {
              var n = e.card_list;
              if (n) {
                for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                  var o = n[i];
                  (o.cardId = o.card_id),
                    (o.cardExt = o.card_ext),
                    (o.isSuccess = !!o.is_succ),
                    delete o.card_id,
                    delete o.card_ext,
                    delete o.is_succ;
                }
                (e.cardList = n), delete e.card_list;
              }
            }),
            e)
          );
        },
        chooseCard: function(e) {
          M(
            "chooseCard",
            {
              app_id: v.appId,
              location_id: e.shopId || "",
              sign_type: e.signType || "SHA1",
              card_id: e.cardId || "",
              card_type: e.cardType || "",
              card_sign: e.cardSign,
              time_stamp: e.timestamp + "",
              nonce_str: e.nonceStr
            },
            ((e._complete = function(e) {
              (e.cardList = e.choose_card_info), delete e.choose_card_info;
            }),
            e)
          );
        },
        openCard: function(e) {
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, code: r.code };
            i.push(a);
          }
          M(c.openCard, { card_list: i }, e);
        },
        consumeAndShareCard: function(e) {
          M(
            c.consumeAndShareCard,
            { consumedCardId: e.cardId, consumedCode: e.code },
            e
          );
        },
        chooseWXPay: function(e) {
          M(c.chooseWXPay, V(e), e);
        },
        openEnterpriseRedPacket: function(e) {
          M(c.openEnterpriseRedPacket, V(e), e);
        },
        startSearchBeacons: function(e) {
          M(c.startSearchBeacons, { ticket: e.ticket }, e);
        },
        stopSearchBeacons: function(e) {
          M(c.stopSearchBeacons, {}, e);
        },
        onSearchBeacons: function(e) {
          P(c.onSearchBeacons, e);
        },
        openEnterpriseChat: function(e) {
          M(
            "openEnterpriseChat",
            { useridlist: e.userIds, chatname: e.groupName },
            e
          );
        },
        launchMiniProgram: function(e) {
          M(
            "launchMiniProgram",
            {
              targetAppId: e.targetAppId,
              path: (function(e) {
                if ("string" == typeof e && 0 < e.length) {
                  var n = e.split("?")[0],
                    i = e.split("?")[1];
                  return (n += ".html"), void 0 !== i ? n + "?" + i : n;
                }
              })(e.path),
              envVersion: e.envVersion
            },
            e
          );
        },
        openBusinessView: function(e) {
          M(
            "openBusinessView",
            {
              businessType: e.businessType,
              queryString: e.queryString || "",
              envVersion: e.envVersion
            },
            ((e._complete = function(n) {
              if (p) {
                var e = n.extraData;
                if (e)
                  try {
                    n.extraData = JSON.parse(e);
                  } catch (e) {
                    n.extraData = {};
                  }
              }
            }),
            e)
          );
        },
        miniProgram: {
          navigateBack: function(e) {
            (e = e || {}),
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "navigateBack", arg: { delta: e.delta || 1 } },
                  e
                );
              });
          },
          navigateTo: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "navigateTo", arg: { url: e.url } },
                e
              );
            });
          },
          redirectTo: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "redirectTo", arg: { url: e.url } },
                e
              );
            });
          },
          switchTab: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "switchTab", arg: { url: e.url } },
                e
              );
            });
          },
          reLaunch: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "reLaunch", arg: { url: e.url } },
                e
              );
            });
          },
          postMessage: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "postMessage", arg: e.data || {} },
                e
              );
            });
          },
          getEnv: function(e) {
            O(function() {
              e({ miniprogram: "miniprogram" === o.__wxjs_environment });
            });
          }
        }
      },
      T = 1,
      k = {};
    return (
      i.addEventListener(
        "error",
        function(e) {
          if (!p) {
            var n = e.target,
              i = n.tagName,
              t = n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
              if (-1 != t.indexOf("wxlocalresource://")) {
                e.preventDefault(), e.stopPropagation();
                var o = n["wx-id"];
                if ((o || ((o = T++), (n["wx-id"] = o)), k[o])) return;
                (k[o] = !0),
                  wx.ready(function() {
                    wx.getLocalImgData({
                      localId: t,
                      success: function(e) {
                        n.src = e.localData;
                      }
                    });
                  });
              }
          }
        },
        !0
      ),
      i.addEventListener(
        "load",
        function(e) {
          if (!p) {
            var n = e.target,
              i = n.tagName;
            n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
              var t = n["wx-id"];
              t && (k[t] = !1);
            }
          }
        },
        !0
      ),
      e && (o.wx = o.jWeixin = w),
      w
    );
  }
  function M(n, e, i) {
    o.WeixinJSBridge
      ? WeixinJSBridge.invoke(n, x(e), function(e) {
          A(n, e, i);
        })
      : B(n, i);
  }
  function P(n, i, t) {
    o.WeixinJSBridge
      ? WeixinJSBridge.on(n, function(e) {
          t && t.trigger && t.trigger(e), A(n, e, i);
        })
      : B(n, t || i);
  }
  function x(e) {
    return (
      ((e = e || {}).appId = v.appId),
      (e.verifyAppId = v.appId),
      (e.verifySignType = "sha1"),
      (e.verifyTimestamp = v.timestamp + ""),
      (e.verifyNonceStr = v.nonceStr),
      (e.verifySignature = v.signature),
      e
    );
  }
  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1"
    };
  }
  function A(e, n, i) {
    ("openEnterpriseChat" != e && "openBusinessView" !== e) ||
      (n.errCode = n.err_code),
      delete n.err_code,
      delete n.err_desc,
      delete n.err_detail;
    var t = n.errMsg;
    t ||
      ((t = n.err_msg),
      delete n.err_msg,
      (t = (function(e, n) {
        var i = e,
          t = a[i];
        t && (i = t);
        var o = "ok";
        if (n) {
          var r = n.indexOf(":");
          "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
            "failed" == o && (o = "fail"),
            -1 != o.indexOf("failed_") && (o = o.substring(7)),
            -1 != o.indexOf("fail_") && (o = o.substring(5)),
            ("access denied" !=
              (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
              "no permission to execute" != o) ||
              (o = "permission denied"),
            "config" == i && "function not exist" == o && (o = "ok"),
            "" == o && (o = "fail");
        }
        return (n = i + ":" + o);
      })(e, t)),
      (n.errMsg = t)),
      (i = i || {})._complete && (i._complete(n), delete i._complete),
      (t = n.errMsg || ""),
      v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);
    }
    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
  }
  function B(e, n) {
    if (!(!v.debug || (n && n.isInnerInvoke))) {
      var i = a[e];
      i && (e = i),
        n && n._complete && delete n._complete,
        console.log('"' + e + '",', n || "");
    }
  }
  function L() {
    return new Date().getTime();
  }
  function O(e) {
    l &&
      (o.WeixinJSBridge
        ? e()
        : i.addEventListener &&
          i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9jb21tb21CdXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9fd2VpeGluLWpzLXNka0AxLjYuMEB3ZWl4aW4tanMtc2RrL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJ1cyIsInByb3BzIiwib25SZWYiLCJ1cmwiLCJ0eXBlIiwid3giLCJtaW5pUHJvZ3JhbSIsInJlZGlyZWN0VG8iLCJyZUxhdW5jaCIsInN3aXRjaFRhYiIsIm5hdmlnYXRlVG8iLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFTUEsRzs7Ozs7Ozs7Ozs7Ozt3Q0FDZTtBQUNqQixXQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsSUFBakIsRUFEaUIsQ0FDTTtBQUN4QixLLENBQ0Q7Ozs7K0JBQ1dDLEcsRUFBS0MsSSxFQUFNO0FBQ3BCLFVBQUlBLElBQUksS0FBRyxZQUFYLEVBQXlCO0FBQ3ZCQyw0REFBRSxDQUFDQyxXQUFILENBQWVDLFVBQWYsQ0FBMEI7QUFBRUosYUFBRyxFQUFIQTtBQUFGLFNBQTFCO0FBQ0QsT0FGRCxNQUVPLElBQUlDLElBQUksS0FBRyxVQUFYLEVBQXVCO0FBQzVCQyw0REFBRSxDQUFDQyxXQUFILENBQWVFLFFBQWYsQ0FBd0I7QUFBRUwsYUFBRyxFQUFIQTtBQUFGLFNBQXhCO0FBQ0QsT0FGTSxNQUVBLElBQUlDLElBQUksS0FBRyxXQUFYLEVBQXdCO0FBQzdCQyw0REFBRSxDQUFDQyxXQUFILENBQWVHLFNBQWYsQ0FBeUI7QUFBRU4sYUFBRyxFQUFIQTtBQUFGLFNBQXpCO0FBQ0QsT0FGTSxNQUVBO0FBQ0xFLDREQUFFLENBQUNDLFdBQUgsQ0FBZUksVUFBZixDQUEwQjtBQUFDUCxhQUFHLEVBQUhBO0FBQUQsU0FBMUI7QUFDRDtBQUVGOzs7NkJBQ1E7QUFDUCxhQUFPLEVBQVA7QUFDRDs7OztF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Q0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoic3RhdGljL2NodW5rcy8xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgd3ggZnJvbSAnd2VpeGluLWpzLXNkaydcclxuXHJcbmNsYXNzIEJ1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgIHRoaXMucHJvcHMub25SZWYodGhpcykgLy8gLT7lsIZjaGlsZOS8oOmAkue7mXRoaXMucHJvcHMub25SZWYoKeaWueazlVxyXG4gIH1cclxuICAvLyDosIPovaxcclxuICBuYXZpZ2F0ZVRvKHVybCwgdHlwZSkge1xyXG4gICAgaWYgKHR5cGU9PT0ncmVkaXJlY3RUbycpIHtcclxuICAgICAgd3gubWluaVByb2dyYW0ucmVkaXJlY3RUbyh7IHVybCB9KVxyXG4gICAgfSBlbHNlIGlmICh0eXBlPT09J3JlTGF1bmNoJykge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5yZUxhdW5jaCh7IHVybCB9KVxyXG4gICAgfSBlbHNlIGlmICh0eXBlPT09J3N3aXRjaFRhYicpIHtcclxuICAgICAgd3gubWluaVByb2dyYW0uc3dpdGNoVGFiKHsgdXJsIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5uYXZpZ2F0ZVRvKHt1cmwgfSlcclxuICAgIH1cclxuICAgXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAnJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVzIiwiIShmdW5jdGlvbihlLCBuKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbihlKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24obywgZSkge1xuICBpZiAoIW8ualdlaXhpbikge1xuICAgIHZhciBuLFxuICAgICAgYyA9IHtcbiAgICAgICAgY29uZmlnOiBcInByZVZlcmlmeUpTQVBJXCIsXG4gICAgICAgIG9uTWVudVNoYXJlVGltZWxpbmU6IFwibWVudTpzaGFyZTp0aW1lbGluZVwiLFxuICAgICAgICBvbk1lbnVTaGFyZUFwcE1lc3NhZ2U6IFwibWVudTpzaGFyZTphcHBtZXNzYWdlXCIsXG4gICAgICAgIG9uTWVudVNoYXJlUVE6IFwibWVudTpzaGFyZTpxcVwiLFxuICAgICAgICBvbk1lbnVTaGFyZVdlaWJvOiBcIm1lbnU6c2hhcmU6d2VpYm9BcHBcIixcbiAgICAgICAgb25NZW51U2hhcmVRWm9uZTogXCJtZW51OnNoYXJlOlFab25lXCIsXG4gICAgICAgIHByZXZpZXdJbWFnZTogXCJpbWFnZVByZXZpZXdcIixcbiAgICAgICAgZ2V0TG9jYXRpb246IFwiZ2VvTG9jYXRpb25cIixcbiAgICAgICAgb3BlblByb2R1Y3RTcGVjaWZpY1ZpZXc6IFwib3BlblByb2R1Y3RWaWV3V2l0aFBpZFwiLFxuICAgICAgICBhZGRDYXJkOiBcImJhdGNoQWRkQ2FyZFwiLFxuICAgICAgICBvcGVuQ2FyZDogXCJiYXRjaFZpZXdDYXJkXCIsXG4gICAgICAgIGNob29zZVdYUGF5OiBcImdldEJyYW5kV0NQYXlSZXF1ZXN0XCIsXG4gICAgICAgIG9wZW5FbnRlcnByaXNlUmVkUGFja2V0OiBcImdldFJlY2V2aWVCaXpIb25nQmFvUmVxdWVzdFwiLFxuICAgICAgICBzdGFydFNlYXJjaEJlYWNvbnM6IFwic3RhcnRNb25pdG9yaW5nQmVhY29uc1wiLFxuICAgICAgICBzdG9wU2VhcmNoQmVhY29uczogXCJzdG9wTW9uaXRvcmluZ0JlYWNvbnNcIixcbiAgICAgICAgb25TZWFyY2hCZWFjb25zOiBcIm9uQmVhY29uc0luUmFuZ2VcIixcbiAgICAgICAgY29uc3VtZUFuZFNoYXJlQ2FyZDogXCJjb25zdW1lZFNoYXJlQ2FyZFwiLFxuICAgICAgICBvcGVuQWRkcmVzczogXCJlZGl0QWRkcmVzc1wiXG4gICAgICB9LFxuICAgICAgYSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgbiBpbiBjKSBlW2Nbbl1dID0gbjtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9KSgpLFxuICAgICAgaSA9IG8uZG9jdW1lbnQsXG4gICAgICB0ID0gaS50aXRsZSxcbiAgICAgIHIgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksXG4gICAgICBzID0gbmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksXG4gICAgICBkID0gISghcy5tYXRjaChcIm1hY1wiKSAmJiAhcy5tYXRjaChcIndpblwiKSksXG4gICAgICB1ID0gLTEgIT0gci5pbmRleE9mKFwid3hkZWJ1Z2dlclwiKSxcbiAgICAgIGwgPSAtMSAhPSByLmluZGV4T2YoXCJtaWNyb21lc3NlbmdlclwiKSxcbiAgICAgIHAgPSAtMSAhPSByLmluZGV4T2YoXCJhbmRyb2lkXCIpLFxuICAgICAgZiA9IC0xICE9IHIuaW5kZXhPZihcImlwaG9uZVwiKSB8fCAtMSAhPSByLmluZGV4T2YoXCJpcGFkXCIpLFxuICAgICAgbSA9IChuID1cbiAgICAgICAgci5tYXRjaCgvbWljcm9tZXNzZW5nZXJcXC8oXFxkK1xcLlxcZCtcXC5cXGQrKS8pIHx8XG4gICAgICAgIHIubWF0Y2goL21pY3JvbWVzc2VuZ2VyXFwvKFxcZCtcXC5cXGQrKS8pKVxuICAgICAgICA/IG5bMV1cbiAgICAgICAgOiBcIlwiLFxuICAgICAgZyA9IHtcbiAgICAgICAgaW5pdFN0YXJ0VGltZTogTCgpLFxuICAgICAgICBpbml0RW5kVGltZTogMCxcbiAgICAgICAgcHJlVmVyaWZ5U3RhcnRUaW1lOiAwLFxuICAgICAgICBwcmVWZXJpZnlFbmRUaW1lOiAwXG4gICAgICB9LFxuICAgICAgaCA9IHtcbiAgICAgICAgdmVyc2lvbjogMSxcbiAgICAgICAgYXBwSWQ6IFwiXCIsXG4gICAgICAgIGluaXRUaW1lOiAwLFxuICAgICAgICBwcmVWZXJpZnlUaW1lOiAwLFxuICAgICAgICBuZXR3b3JrVHlwZTogXCJcIixcbiAgICAgICAgaXNQcmVWZXJpZnlPazogMSxcbiAgICAgICAgc3lzdGVtVHlwZTogZiA/IDEgOiBwID8gMiA6IC0xLFxuICAgICAgICBjbGllbnRWZXJzaW9uOiBtLFxuICAgICAgICB1cmw6IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5ocmVmKVxuICAgICAgfSxcbiAgICAgIHYgPSB7fSxcbiAgICAgIFMgPSB7IF9jb21wbGV0ZXM6IFtdIH0sXG4gICAgICB5ID0geyBzdGF0ZTogMCwgZGF0YToge30gfTtcbiAgICBPKGZ1bmN0aW9uKCkge1xuICAgICAgZy5pbml0RW5kVGltZSA9IEwoKTtcbiAgICB9KTtcbiAgICB2YXIgSSA9ICExLFxuICAgICAgXyA9IFtdLFxuICAgICAgdyA9IHtcbiAgICAgICAgY29uZmlnOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgQihcImNvbmZpZ1wiLCAodiA9IGUpKTtcbiAgICAgICAgICB2YXIgdCA9ICExICE9PSB2LmNoZWNrO1xuICAgICAgICAgIE8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodClcbiAgICAgICAgICAgICAgTShcbiAgICAgICAgICAgICAgICBjLmNvbmZpZyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2ZXJpZnlKc0FwaUxpc3Q6IEModi5qc0FwaUxpc3QpLFxuICAgICAgICAgICAgICAgICAgdmVyaWZ5T3BlblRhZ0xpc3Q6IEModi5vcGVuVGFnTGlzdClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIChTLl9jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKGcucHJlVmVyaWZ5RW5kVGltZSA9IEwoKSksICh5LnN0YXRlID0gMSksICh5LmRhdGEgPSBlKTtcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAoUy5zdWNjZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGguaXNQcmVWZXJpZnlPayA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAoUy5mYWlsID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgIFMuX2ZhaWwgPyBTLl9mYWlsKGUpIDogKHkuc3RhdGUgPSAtMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgdmFyIHQgPSBTLl9jb21wbGV0ZXM7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICB0LnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuZGVidWcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtIDwgXCI2LjAuMlwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5zeXN0ZW1UeXBlIDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGguYXBwSWQgPSB2LmFwcElkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaC5pbml0VGltZSA9IGcuaW5pdEVuZFRpbWUgLSBnLmluaXRTdGFydFRpbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoLnByZVZlcmlmeVRpbWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5wcmVWZXJpZnlFbmRUaW1lIC0gZy5wcmVWZXJpZnlTdGFydFRpbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcuZ2V0TmV0d29ya1R5cGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNJbm5lckludm9rZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgubmV0d29ya1R5cGUgPSBlLm5ldHdvcmtUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL29wZW4ud2VpeGluLnFxLmNvbS9zZGsvcmVwb3J0P3Y9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgudmVyc2lvbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImbz1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5pc1ByZVZlcmlmeU9rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiZzPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLnN5c3RlbVR5cGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJmM9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguY2xpZW50VmVyc2lvbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImYT1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5hcHBJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImbj1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5uZXR3b3JrVHlwZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImaT1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5pbml0VGltZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImcD1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5wcmVWZXJpZnlUaW1lICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiZ1PVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5zcmMgPSBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAoUy5jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMCwgaSA9IHQubGVuZ3RoOyBuIDwgaTsgKytuKSB0W25dKCk7XG4gICAgICAgICAgICAgICAgICAgICAgUy5fY29tcGxldGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBTXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAoZy5wcmVWZXJpZnlTdGFydFRpbWUgPSBMKCkpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHkuc3RhdGUgPSAxO1xuICAgICAgICAgICAgICBmb3IgKHZhciBlID0gUy5fY29tcGxldGVzLCBuID0gMCwgaSA9IGUubGVuZ3RoOyBuIDwgaTsgKytuKVxuICAgICAgICAgICAgICAgIGVbbl0oKTtcbiAgICAgICAgICAgICAgUy5fY29tcGxldGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgICB3Lmludm9rZSB8fFxuICAgICAgICAgICAgICAoKHcuaW52b2tlID0gZnVuY3Rpb24oZSwgbiwgaSkge1xuICAgICAgICAgICAgICAgIG8uV2VpeGluSlNCcmlkZ2UgJiYgV2VpeGluSlNCcmlkZ2UuaW52b2tlKGUsIHgobiksIGkpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKHcub24gPSBmdW5jdGlvbihlLCBuKSB7XG4gICAgICAgICAgICAgICAgby5XZWl4aW5KU0JyaWRnZSAmJiBXZWl4aW5KU0JyaWRnZS5vbihlLCBuKTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICByZWFkeTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIDAgIT0geS5zdGF0ZSA/IGUoKSA6IChTLl9jb21wbGV0ZXMucHVzaChlKSwgIWwgJiYgdi5kZWJ1ZyAmJiBlKCkpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIG0gPCBcIjYuMC4yXCIgfHwgKC0xID09IHkuc3RhdGUgPyBlKHkuZGF0YSkgOiAoUy5fZmFpbCA9IGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tKc0FwaTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcImNoZWNrSnNBcGlcIixcbiAgICAgICAgICAgIHsganNBcGlMaXN0OiBDKGUuanNBcGlMaXN0KSB9LFxuICAgICAgICAgICAgKChlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGUuY2hlY2tSZXN1bHQ7XG4gICAgICAgICAgICAgICAgbiAmJiAoZS5jaGVja1Jlc3VsdCA9IEpTT04ucGFyc2UobikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGUgPSAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gZS5jaGVja1Jlc3VsdDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIG4pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0ID0gYVtpXTtcbiAgICAgICAgICAgICAgICAgIHQgJiYgKChuW3RdID0gbltpXSksIGRlbGV0ZSBuW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgIH0pKGUpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVudVNoYXJlVGltZWxpbmU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBQKFxuICAgICAgICAgICAgYy5vbk1lbnVTaGFyZVRpbWVsaW5lLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTShcbiAgICAgICAgICAgICAgICAgIFwic2hhcmVUaW1lbGluZVwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZS50aXRsZSB8fCB0LFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiBlLnRpdGxlIHx8IHQsXG4gICAgICAgICAgICAgICAgICAgIGltZ191cmw6IGUuaW1nVXJsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IGUubGluayB8fCBsb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGUgfHwgXCJsaW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsOiBlLmRhdGFVcmwgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVudVNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24obikge1xuICAgICAgICAgIFAoXG4gICAgICAgICAgICBjLm9uTWVudVNoYXJlQXBwTWVzc2FnZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBcImZhdm9yaXRlXCIgPT09IGUuc2NlbmVcbiAgICAgICAgICAgICAgICAgID8gTShcInNlbmRBcHBNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbi50aXRsZSB8fCB0LFxuICAgICAgICAgICAgICAgICAgICAgIGRlc2M6IG4uZGVzYyB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6IG4ubGluayB8fCBsb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICAgICAgIGltZ191cmw6IG4uaW1nVXJsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogbi50eXBlIHx8IFwibGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsOiBuLmRhdGFVcmwgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgOiBNKFxuICAgICAgICAgICAgICAgICAgICAgIFwic2VuZEFwcE1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbi50aXRsZSB8fCB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogbi5kZXNjIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBuLmxpbmsgfHwgbG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZ191cmw6IG4uaW1nVXJsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBuLnR5cGUgfHwgXCJsaW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhX3VybDogbi5kYXRhVXJsIHx8IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lbnVTaGFyZVFROiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgUChcbiAgICAgICAgICAgIGMub25NZW51U2hhcmVRUSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIE0oXG4gICAgICAgICAgICAgICAgICBcInNoYXJlUVFcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGUudGl0bGUgfHwgdCxcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogZS5kZXNjIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGltZ191cmw6IGUuaW1nVXJsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IGUubGluayB8fCBsb2NhdGlvbi5ocmVmXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZW51U2hhcmVXZWlibzogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIFAoXG4gICAgICAgICAgICBjLm9uTWVudVNoYXJlV2VpYm8sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBNKFxuICAgICAgICAgICAgICAgICAgXCJzaGFyZVdlaWJvQXBwXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLnRpdGxlIHx8IHQsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6IGUuZGVzYyB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBpbWdfdXJsOiBlLmltZ1VybCB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBlLmxpbmsgfHwgbG9jYXRpb24uaHJlZlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVudVNoYXJlUVpvbmU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBQKFxuICAgICAgICAgICAgYy5vbk1lbnVTaGFyZVFab25lLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTShcbiAgICAgICAgICAgICAgICAgIFwic2hhcmVRWm9uZVwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZS50aXRsZSB8fCB0LFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiBlLmRlc2MgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgaW1nX3VybDogZS5pbWdVcmwgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluazogZS5saW5rIHx8IGxvY2F0aW9uLmhyZWZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVUaW1lbGluZVNoYXJlRGF0YTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcInVwZGF0ZVRpbWVsaW5lU2hhcmVEYXRhXCIsXG4gICAgICAgICAgICB7IHRpdGxlOiBlLnRpdGxlLCBsaW5rOiBlLmxpbmssIGltZ1VybDogZS5pbWdVcmwgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVBcHBNZXNzYWdlU2hhcmVEYXRhOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcbiAgICAgICAgICAgIFwidXBkYXRlQXBwTWVzc2FnZVNoYXJlRGF0YVwiLFxuICAgICAgICAgICAgeyB0aXRsZTogZS50aXRsZSwgZGVzYzogZS5kZXNjLCBsaW5rOiBlLmxpbmssIGltZ1VybDogZS5pbWdVcmwgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBzdGFydFJlY29yZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXCJzdGFydFJlY29yZFwiLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3BSZWNvcmQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFwic3RvcFJlY29yZFwiLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVm9pY2VSZWNvcmRFbmQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBQKFwib25Wb2ljZVJlY29yZEVuZFwiLCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGxheVZvaWNlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcInBsYXlWb2ljZVwiLCB7IGxvY2FsSWQ6IGUubG9jYWxJZCB9LCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2VWb2ljZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXCJwYXVzZVZvaWNlXCIsIHsgbG9jYWxJZDogZS5sb2NhbElkIH0sIGUpO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wVm9pY2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFwic3RvcFZvaWNlXCIsIHsgbG9jYWxJZDogZS5sb2NhbElkIH0sIGUpO1xuICAgICAgICB9LFxuICAgICAgICBvblZvaWNlUGxheUVuZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIFAoXCJvblZvaWNlUGxheUVuZFwiLCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkVm9pY2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJ1cGxvYWRWb2ljZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsb2NhbElkOiBlLmxvY2FsSWQsXG4gICAgICAgICAgICAgIGlzU2hvd1Byb2dyZXNzVGlwczogMCA9PSBlLmlzU2hvd1Byb2dyZXNzVGlwcyA/IDAgOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvd25sb2FkVm9pY2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJkb3dubG9hZFZvaWNlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlcnZlcklkOiBlLnNlcnZlcklkLFxuICAgICAgICAgICAgICBpc1Nob3dQcm9ncmVzc1RpcHM6IDAgPT0gZS5pc1Nob3dQcm9ncmVzc1RpcHMgPyAwIDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB0cmFuc2xhdGVWb2ljZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcInRyYW5zbGF0ZVZvaWNlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxvY2FsSWQ6IGUubG9jYWxJZCxcbiAgICAgICAgICAgICAgaXNTaG93UHJvZ3Jlc3NUaXBzOiAwID09IGUuaXNTaG93UHJvZ3Jlc3NUaXBzID8gMCA6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hvb3NlSW1hZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJjaG9vc2VJbWFnZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzY2VuZTogXCIxfDJcIixcbiAgICAgICAgICAgICAgY291bnQ6IGUuY291bnQgfHwgOSxcbiAgICAgICAgICAgICAgc2l6ZVR5cGU6IGUuc2l6ZVR5cGUgfHwgW1wib3JpZ2luYWxcIiwgXCJjb21wcmVzc2VkXCJdLFxuICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBlLnNvdXJjZVR5cGUgfHwgW1wiYWxidW1cIiwgXCJjYW1lcmFcIl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKGUuX2NvbXBsZXRlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gZS5sb2NhbElkcztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgbiAmJiAoZS5sb2NhbElkcyA9IEpTT04ucGFyc2UobikpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBnZXRMb2NhdGlvbjogZnVuY3Rpb24oZSkge30sXG4gICAgICAgIHByZXZpZXdJbWFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oYy5wcmV2aWV3SW1hZ2UsIHsgY3VycmVudDogZS5jdXJyZW50LCB1cmxzOiBlLnVybHMgfSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwbG9hZEltYWdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcbiAgICAgICAgICAgIFwidXBsb2FkSW1hZ2VcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbG9jYWxJZDogZS5sb2NhbElkLFxuICAgICAgICAgICAgICBpc1Nob3dQcm9ncmVzc1RpcHM6IDAgPT0gZS5pc1Nob3dQcm9ncmVzc1RpcHMgPyAwIDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkb3dubG9hZEltYWdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcbiAgICAgICAgICAgIFwiZG93bmxvYWRJbWFnZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXJ2ZXJJZDogZS5zZXJ2ZXJJZCxcbiAgICAgICAgICAgICAgaXNTaG93UHJvZ3Jlc3NUaXBzOiAwID09IGUuaXNTaG93UHJvZ3Jlc3NUaXBzID8gMCA6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TG9jYWxJbWdEYXRhOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgITEgPT09IElcbiAgICAgICAgICAgID8gKChJID0gITApLFxuICAgICAgICAgICAgICBNKFxuICAgICAgICAgICAgICAgIFwiZ2V0TG9jYWxJbWdEYXRhXCIsXG4gICAgICAgICAgICAgICAgeyBsb2NhbElkOiBlLmxvY2FsSWQgfSxcbiAgICAgICAgICAgICAgICAoKGUuX2NvbXBsZXRlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKCgoSSA9ICExKSwgMCA8IF8ubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IF8uc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0TG9jYWxJbWdEYXRhKG4pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGUpXG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICA6IF8ucHVzaChlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TmV0d29ya1R5cGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJnZXROZXR3b3JrVHlwZVwiLFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICAoKGUuX2NvbXBsZXRlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBlID0gKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGUuZXJyTXNnO1xuICAgICAgICAgICAgICAgIGUuZXJyTXNnID0gXCJnZXROZXR3b3JrVHlwZTpva1wiO1xuICAgICAgICAgICAgICAgIHZhciBpID0gZS5zdWJ0eXBlO1xuICAgICAgICAgICAgICAgIGlmICgoZGVsZXRlIGUuc3VidHlwZSwgaSkpIGUubmV0d29ya1R5cGUgPSBpO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFyIHQgPSBuLmluZGV4T2YoXCI6XCIpLFxuICAgICAgICAgICAgICAgICAgICBvID0gbi5zdWJzdHJpbmcodCArIDEpO1xuICAgICAgICAgICAgICAgICAgc3dpdGNoIChvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aWZpXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGdlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3d2FuXCI6XG4gICAgICAgICAgICAgICAgICAgICAgZS5uZXR3b3JrVHlwZSA9IG87XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgZS5lcnJNc2cgPSBcImdldE5ldHdvcmtUeXBlOmZhaWxcIjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgIH0pKGUpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW5Mb2NhdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcIm9wZW5Mb2NhdGlvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYXRpdHVkZTogZS5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBlLmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgbmFtZTogZS5uYW1lIHx8IFwiXCIsXG4gICAgICAgICAgICAgIGFkZHJlc3M6IGUuYWRkcmVzcyB8fCBcIlwiLFxuICAgICAgICAgICAgICBzY2FsZTogZS5zY2FsZSB8fCAyOCxcbiAgICAgICAgICAgICAgaW5mb1VybDogZS5pbmZvVXJsIHx8IFwiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TG9jYXRpb246IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgYy5nZXRMb2NhdGlvbixcbiAgICAgICAgICAgIHsgdHlwZTogKGUgPSBlIHx8IHt9KS50eXBlIHx8IFwid2dzODRcIiB9LFxuICAgICAgICAgICAgKChlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIGUudHlwZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlT3B0aW9uTWVudTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXCJoaWRlT3B0aW9uTWVudVwiLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dPcHRpb25NZW51OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcInNob3dPcHRpb25NZW51XCIsIHt9LCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VXaW5kb3c6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFwiY2xvc2VXaW5kb3dcIiwge30sIChlID0gZSB8fCB7fSkpO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlTWVudUl0ZW1zOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcImhpZGVNZW51SXRlbXNcIiwgeyBtZW51TGlzdDogZS5tZW51TGlzdCB9LCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd01lbnVJdGVtczogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXCJzaG93TWVudUl0ZW1zXCIsIHsgbWVudUxpc3Q6IGUubWVudUxpc3QgfSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpZGVBbGxOb25CYXNlTWVudUl0ZW06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFwiaGlkZUFsbE5vbkJhc2VNZW51SXRlbVwiLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dBbGxOb25CYXNlTWVudUl0ZW06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFwic2hvd0FsbE5vbkJhc2VNZW51SXRlbVwiLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNjYW5RUkNvZGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJzY2FuUVJDb2RlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5lZWRSZXN1bHQ6IChlID0gZSB8fCB7fSkubmVlZFJlc3VsdCB8fCAwLFxuICAgICAgICAgICAgICBzY2FuVHlwZTogZS5zY2FuVHlwZSB8fCBbXCJxckNvZGVcIiwgXCJiYXJDb2RlXCJdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKChlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGUucmVzdWx0U3RyO1xuICAgICAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgaSA9IEpTT04ucGFyc2Uobik7XG4gICAgICAgICAgICAgICAgICBlLnJlc3VsdFN0ciA9IGkgJiYgaS5zY2FuX2NvZGUgJiYgaS5zY2FuX2NvZGUuc2Nhbl9yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3BlbkFkZHJlc3M6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgYy5vcGVuQWRkcmVzcyxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgKChlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgZSA9IChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIChlLnBvc3RhbENvZGUgPSBlLmFkZHJlc3NQb3N0YWxDb2RlKSxcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLmFkZHJlc3NQb3N0YWxDb2RlLFxuICAgICAgICAgICAgICAgICAgKGUucHJvdmluY2VOYW1lID0gZS5wcm92aWNlRmlyc3RTdGFnZU5hbWUpLFxuICAgICAgICAgICAgICAgICAgZGVsZXRlIGUucHJvdmljZUZpcnN0U3RhZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgKGUuY2l0eU5hbWUgPSBlLmFkZHJlc3NDaXR5U2Vjb25kU3RhZ2VOYW1lKSxcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLmFkZHJlc3NDaXR5U2Vjb25kU3RhZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgKGUuY291bnRyeU5hbWUgPSBlLmFkZHJlc3NDb3VudGllc1RoaXJkU3RhZ2VOYW1lKSxcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLmFkZHJlc3NDb3VudGllc1RoaXJkU3RhZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgKGUuZGV0YWlsSW5mbyA9IGUuYWRkcmVzc0RldGFpbEluZm8pLFxuICAgICAgICAgICAgICAgICAgZGVsZXRlIGUuYWRkcmVzc0RldGFpbEluZm8sXG4gICAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSkoZSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3BlblByb2R1Y3RTcGVjaWZpY1ZpZXc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgYy5vcGVuUHJvZHVjdFNwZWNpZmljVmlldyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGlkOiBlLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgdmlld190eXBlOiBlLnZpZXdUeXBlIHx8IDAsXG4gICAgICAgICAgICAgIGV4dF9pbmZvOiBlLmV4dEluZm9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkQ2FyZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGZvciAodmFyIG4gPSBlLmNhcmRMaXN0LCBpID0gW10sIHQgPSAwLCBvID0gbi5sZW5ndGg7IHQgPCBvOyArK3QpIHtcbiAgICAgICAgICAgIHZhciByID0gblt0XSxcbiAgICAgICAgICAgICAgYSA9IHsgY2FyZF9pZDogci5jYXJkSWQsIGNhcmRfZXh0OiByLmNhcmRFeHQgfTtcbiAgICAgICAgICAgIGkucHVzaChhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgTShcbiAgICAgICAgICAgIGMuYWRkQ2FyZCxcbiAgICAgICAgICAgIHsgY2FyZF9saXN0OiBpIH0sXG4gICAgICAgICAgICAoKGUuX2NvbXBsZXRlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICB2YXIgbiA9IGUuY2FyZF9saXN0O1xuICAgICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCB0ID0gKG4gPSBKU09OLnBhcnNlKG4pKS5sZW5ndGg7IGkgPCB0OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBvID0gbltpXTtcbiAgICAgICAgICAgICAgICAgIChvLmNhcmRJZCA9IG8uY2FyZF9pZCksXG4gICAgICAgICAgICAgICAgICAgIChvLmNhcmRFeHQgPSBvLmNhcmRfZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgKG8uaXNTdWNjZXNzID0gISFvLmlzX3N1Y2MpLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgby5jYXJkX2lkLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgby5jYXJkX2V4dCxcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG8uaXNfc3VjYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKGUuY2FyZExpc3QgPSBuKSwgZGVsZXRlIGUuY2FyZF9saXN0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hvb3NlQ2FyZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcImNob29zZUNhcmRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXBwX2lkOiB2LmFwcElkLFxuICAgICAgICAgICAgICBsb2NhdGlvbl9pZDogZS5zaG9wSWQgfHwgXCJcIixcbiAgICAgICAgICAgICAgc2lnbl90eXBlOiBlLnNpZ25UeXBlIHx8IFwiU0hBMVwiLFxuICAgICAgICAgICAgICBjYXJkX2lkOiBlLmNhcmRJZCB8fCBcIlwiLFxuICAgICAgICAgICAgICBjYXJkX3R5cGU6IGUuY2FyZFR5cGUgfHwgXCJcIixcbiAgICAgICAgICAgICAgY2FyZF9zaWduOiBlLmNhcmRTaWduLFxuICAgICAgICAgICAgICB0aW1lX3N0YW1wOiBlLnRpbWVzdGFtcCArIFwiXCIsXG4gICAgICAgICAgICAgIG5vbmNlX3N0cjogZS5ub25jZVN0clxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgoZS5fY29tcGxldGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIChlLmNhcmRMaXN0ID0gZS5jaG9vc2VfY2FyZF9pbmZvKSwgZGVsZXRlIGUuY2hvb3NlX2NhcmRfaW5mbztcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBvcGVuQ2FyZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGZvciAodmFyIG4gPSBlLmNhcmRMaXN0LCBpID0gW10sIHQgPSAwLCBvID0gbi5sZW5ndGg7IHQgPCBvOyArK3QpIHtcbiAgICAgICAgICAgIHZhciByID0gblt0XSxcbiAgICAgICAgICAgICAgYSA9IHsgY2FyZF9pZDogci5jYXJkSWQsIGNvZGU6IHIuY29kZSB9O1xuICAgICAgICAgICAgaS5wdXNoKGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBNKGMub3BlbkNhcmQsIHsgY2FyZF9saXN0OiBpIH0sIGUpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zdW1lQW5kU2hhcmVDYXJkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShcbiAgICAgICAgICAgIGMuY29uc3VtZUFuZFNoYXJlQ2FyZCxcbiAgICAgICAgICAgIHsgY29uc3VtZWRDYXJkSWQ6IGUuY2FyZElkLCBjb25zdW1lZENvZGU6IGUuY29kZSB9LFxuICAgICAgICAgICAgZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNob29zZVdYUGF5OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShjLmNob29zZVdYUGF5LCBWKGUpLCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3BlbkVudGVycHJpc2VSZWRQYWNrZXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKGMub3BlbkVudGVycHJpc2VSZWRQYWNrZXQsIFYoZSksIGUpO1xuICAgICAgICB9LFxuICAgICAgICBzdGFydFNlYXJjaEJlYWNvbnM6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKGMuc3RhcnRTZWFyY2hCZWFjb25zLCB7IHRpY2tldDogZS50aWNrZXQgfSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3BTZWFyY2hCZWFjb25zOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgTShjLnN0b3BTZWFyY2hCZWFjb25zLCB7fSwgZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VhcmNoQmVhY29uczogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIFAoYy5vblNlYXJjaEJlYWNvbnMsIGUpO1xuICAgICAgICB9LFxuICAgICAgICBvcGVuRW50ZXJwcmlzZUNoYXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJvcGVuRW50ZXJwcmlzZUNoYXRcIixcbiAgICAgICAgICAgIHsgdXNlcmlkbGlzdDogZS51c2VySWRzLCBjaGF0bmFtZTogZS5ncm91cE5hbWUgfSxcbiAgICAgICAgICAgIGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBsYXVuY2hNaW5pUHJvZ3JhbTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgIE0oXG4gICAgICAgICAgICBcImxhdW5jaE1pbmlQcm9ncmFtXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRhcmdldEFwcElkOiBlLnRhcmdldEFwcElkLFxuICAgICAgICAgICAgICBwYXRoOiAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBlICYmIDAgPCBlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdmFyIG4gPSBlLnNwbGl0KFwiP1wiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IGUuc3BsaXQoXCI/XCIpWzFdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChuICs9IFwiLmh0bWxcIiksIHZvaWQgMCAhPT0gaSA/IG4gKyBcIj9cIiArIGkgOiBuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoZS5wYXRoKSxcbiAgICAgICAgICAgICAgZW52VmVyc2lvbjogZS5lbnZWZXJzaW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW5CdXNpbmVzc1ZpZXc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBNKFxuICAgICAgICAgICAgXCJvcGVuQnVzaW5lc3NWaWV3XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGJ1c2luZXNzVHlwZTogZS5idXNpbmVzc1R5cGUsXG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nOiBlLnF1ZXJ5U3RyaW5nIHx8IFwiXCIsXG4gICAgICAgICAgICAgIGVudlZlcnNpb246IGUuZW52VmVyc2lvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgoZS5fY29tcGxldGUgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSBuLmV4dHJhRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZSlcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG4uZXh0cmFEYXRhID0gSlNPTi5wYXJzZShlKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5leHRyYURhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1pbmlQcm9ncmFtOiB7XG4gICAgICAgICAgbmF2aWdhdGVCYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAoZSA9IGUgfHwge30pLFxuICAgICAgICAgICAgICBPKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIE0oXG4gICAgICAgICAgICAgICAgICBcImludm9rZU1pbmlQcm9ncmFtQVBJXCIsXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6IFwibmF2aWdhdGVCYWNrXCIsIGFyZzogeyBkZWx0YTogZS5kZWx0YSB8fCAxIH0gfSxcbiAgICAgICAgICAgICAgICAgIGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5hdmlnYXRlVG86IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIE8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIE0oXG4gICAgICAgICAgICAgICAgXCJpbnZva2VNaW5pUHJvZ3JhbUFQSVwiLFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJuYXZpZ2F0ZVRvXCIsIGFyZzogeyB1cmw6IGUudXJsIH0gfSxcbiAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZGlyZWN0VG86IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIE8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIE0oXG4gICAgICAgICAgICAgICAgXCJpbnZva2VNaW5pUHJvZ3JhbUFQSVwiLFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJyZWRpcmVjdFRvXCIsIGFyZzogeyB1cmw6IGUudXJsIH0gfSxcbiAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN3aXRjaFRhYjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgTyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgTShcbiAgICAgICAgICAgICAgICBcImludm9rZU1pbmlQcm9ncmFtQVBJXCIsXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcInN3aXRjaFRhYlwiLCBhcmc6IHsgdXJsOiBlLnVybCB9IH0sXG4gICAgICAgICAgICAgICAgZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZUxhdW5jaDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgTyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgTShcbiAgICAgICAgICAgICAgICBcImludm9rZU1pbmlQcm9ncmFtQVBJXCIsXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcInJlTGF1bmNoXCIsIGFyZzogeyB1cmw6IGUudXJsIH0gfSxcbiAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3RNZXNzYWdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBPKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBNKFxuICAgICAgICAgICAgICAgIFwiaW52b2tlTWluaVByb2dyYW1BUElcIixcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwicG9zdE1lc3NhZ2VcIiwgYXJnOiBlLmRhdGEgfHwge30gfSxcbiAgICAgICAgICAgICAgICBlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEVudjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgTyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZSh7IG1pbmlwcm9ncmFtOiBcIm1pbmlwcm9ncmFtXCIgPT09IG8uX193eGpzX2Vudmlyb25tZW50IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVCA9IDEsXG4gICAgICBrID0ge307XG4gICAgcmV0dXJuIChcbiAgICAgIGkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICB2YXIgbiA9IGUudGFyZ2V0LFxuICAgICAgICAgICAgICBpID0gbi50YWdOYW1lLFxuICAgICAgICAgICAgICB0ID0gbi5zcmM7XG4gICAgICAgICAgICBpZiAoXCJJTUdcIiA9PSBpIHx8IFwiVklERU9cIiA9PSBpIHx8IFwiQVVESU9cIiA9PSBpIHx8IFwiU09VUkNFXCIgPT0gaSlcbiAgICAgICAgICAgICAgaWYgKC0xICE9IHQuaW5kZXhPZihcInd4bG9jYWxyZXNvdXJjZTovL1wiKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKSwgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IG5bXCJ3eC1pZFwiXTtcbiAgICAgICAgICAgICAgICBpZiAoKG8gfHwgKChvID0gVCsrKSwgKG5bXCJ3eC1pZFwiXSA9IG8pKSwga1tvXSkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAoa1tvXSA9ICEwKSxcbiAgICAgICAgICAgICAgICAgIHd4LnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB3eC5nZXRMb2NhbEltZ0RhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbi5zcmMgPSBlLmxvY2FsRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICEwXG4gICAgICApLFxuICAgICAgaS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImxvYWRcIixcbiAgICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgdmFyIG4gPSBlLnRhcmdldCxcbiAgICAgICAgICAgICAgaSA9IG4udGFnTmFtZTtcbiAgICAgICAgICAgIG4uc3JjO1xuICAgICAgICAgICAgaWYgKFwiSU1HXCIgPT0gaSB8fCBcIlZJREVPXCIgPT0gaSB8fCBcIkFVRElPXCIgPT0gaSB8fCBcIlNPVVJDRVwiID09IGkpIHtcbiAgICAgICAgICAgICAgdmFyIHQgPSBuW1wid3gtaWRcIl07XG4gICAgICAgICAgICAgIHQgJiYgKGtbdF0gPSAhMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAhMFxuICAgICAgKSxcbiAgICAgIGUgJiYgKG8ud3ggPSBvLmpXZWl4aW4gPSB3KSxcbiAgICAgIHdcbiAgICApO1xuICB9XG4gIGZ1bmN0aW9uIE0obiwgZSwgaSkge1xuICAgIG8uV2VpeGluSlNCcmlkZ2VcbiAgICAgID8gV2VpeGluSlNCcmlkZ2UuaW52b2tlKG4sIHgoZSksIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBBKG4sIGUsIGkpO1xuICAgICAgICB9KVxuICAgICAgOiBCKG4sIGkpO1xuICB9XG4gIGZ1bmN0aW9uIFAobiwgaSwgdCkge1xuICAgIG8uV2VpeGluSlNCcmlkZ2VcbiAgICAgID8gV2VpeGluSlNCcmlkZ2Uub24obiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHQgJiYgdC50cmlnZ2VyICYmIHQudHJpZ2dlcihlKSwgQShuLCBlLCBpKTtcbiAgICAgICAgfSlcbiAgICAgIDogQihuLCB0IHx8IGkpO1xuICB9XG4gIGZ1bmN0aW9uIHgoZSkge1xuICAgIHJldHVybiAoXG4gICAgICAoKGUgPSBlIHx8IHt9KS5hcHBJZCA9IHYuYXBwSWQpLFxuICAgICAgKGUudmVyaWZ5QXBwSWQgPSB2LmFwcElkKSxcbiAgICAgIChlLnZlcmlmeVNpZ25UeXBlID0gXCJzaGExXCIpLFxuICAgICAgKGUudmVyaWZ5VGltZXN0YW1wID0gdi50aW1lc3RhbXAgKyBcIlwiKSxcbiAgICAgIChlLnZlcmlmeU5vbmNlU3RyID0gdi5ub25jZVN0ciksXG4gICAgICAoZS52ZXJpZnlTaWduYXR1cmUgPSB2LnNpZ25hdHVyZSksXG4gICAgICBlXG4gICAgKTtcbiAgfVxuICBmdW5jdGlvbiBWKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGltZVN0YW1wOiBlLnRpbWVzdGFtcCArIFwiXCIsXG4gICAgICBub25jZVN0cjogZS5ub25jZVN0cixcbiAgICAgIHBhY2thZ2U6IGUucGFja2FnZSxcbiAgICAgIHBheVNpZ246IGUucGF5U2lnbixcbiAgICAgIHNpZ25UeXBlOiBlLnNpZ25UeXBlIHx8IFwiU0hBMVwiXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBBKGUsIG4sIGkpIHtcbiAgICAoXCJvcGVuRW50ZXJwcmlzZUNoYXRcIiAhPSBlICYmIFwib3BlbkJ1c2luZXNzVmlld1wiICE9PSBlKSB8fFxuICAgICAgKG4uZXJyQ29kZSA9IG4uZXJyX2NvZGUpLFxuICAgICAgZGVsZXRlIG4uZXJyX2NvZGUsXG4gICAgICBkZWxldGUgbi5lcnJfZGVzYyxcbiAgICAgIGRlbGV0ZSBuLmVycl9kZXRhaWw7XG4gICAgdmFyIHQgPSBuLmVyck1zZztcbiAgICB0IHx8XG4gICAgICAoKHQgPSBuLmVycl9tc2cpLFxuICAgICAgZGVsZXRlIG4uZXJyX21zZyxcbiAgICAgICh0ID0gKGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgdmFyIGkgPSBlLFxuICAgICAgICAgIHQgPSBhW2ldO1xuICAgICAgICB0ICYmIChpID0gdCk7XG4gICAgICAgIHZhciBvID0gXCJva1wiO1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgIHZhciByID0gbi5pbmRleE9mKFwiOlwiKTtcbiAgICAgICAgICBcImNvbmZpcm1cIiA9PSAobyA9IG4uc3Vic3RyaW5nKHIgKyAxKSkgJiYgKG8gPSBcIm9rXCIpLFxuICAgICAgICAgICAgXCJmYWlsZWRcIiA9PSBvICYmIChvID0gXCJmYWlsXCIpLFxuICAgICAgICAgICAgLTEgIT0gby5pbmRleE9mKFwiZmFpbGVkX1wiKSAmJiAobyA9IG8uc3Vic3RyaW5nKDcpKSxcbiAgICAgICAgICAgIC0xICE9IG8uaW5kZXhPZihcImZhaWxfXCIpICYmIChvID0gby5zdWJzdHJpbmcoNSkpLFxuICAgICAgICAgICAgKFwiYWNjZXNzIGRlbmllZFwiICE9XG4gICAgICAgICAgICAgIChvID0gKG8gPSBvLnJlcGxhY2UoL18vZywgXCIgXCIpKS50b0xvd2VyQ2FzZSgpKSAmJlxuICAgICAgICAgICAgICBcIm5vIHBlcm1pc3Npb24gdG8gZXhlY3V0ZVwiICE9IG8pIHx8XG4gICAgICAgICAgICAgIChvID0gXCJwZXJtaXNzaW9uIGRlbmllZFwiKSxcbiAgICAgICAgICAgIFwiY29uZmlnXCIgPT0gaSAmJiBcImZ1bmN0aW9uIG5vdCBleGlzdFwiID09IG8gJiYgKG8gPSBcIm9rXCIpLFxuICAgICAgICAgICAgXCJcIiA9PSBvICYmIChvID0gXCJmYWlsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobiA9IGkgKyBcIjpcIiArIG8pO1xuICAgICAgfSkoZSwgdCkpLFxuICAgICAgKG4uZXJyTXNnID0gdCkpLFxuICAgICAgKGkgPSBpIHx8IHt9KS5fY29tcGxldGUgJiYgKGkuX2NvbXBsZXRlKG4pLCBkZWxldGUgaS5fY29tcGxldGUpLFxuICAgICAgKHQgPSBuLmVyck1zZyB8fCBcIlwiKSxcbiAgICAgIHYuZGVidWcgJiYgIWkuaXNJbm5lckludm9rZSAmJiBhbGVydChKU09OLnN0cmluZ2lmeShuKSk7XG4gICAgdmFyIG8gPSB0LmluZGV4T2YoXCI6XCIpO1xuICAgIHN3aXRjaCAodC5zdWJzdHJpbmcobyArIDEpKSB7XG4gICAgICBjYXNlIFwib2tcIjpcbiAgICAgICAgaS5zdWNjZXNzICYmIGkuc3VjY2VzcyhuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2FuY2VsXCI6XG4gICAgICAgIGkuY2FuY2VsICYmIGkuY2FuY2VsKG4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGkuZmFpbCAmJiBpLmZhaWwobik7XG4gICAgfVxuICAgIGkuY29tcGxldGUgJiYgaS5jb21wbGV0ZShuKTtcbiAgfVxuICBmdW5jdGlvbiBDKGUpIHtcbiAgICBpZiAoZSkge1xuICAgICAgZm9yICh2YXIgbiA9IDAsIGkgPSBlLmxlbmd0aDsgbiA8IGk7ICsrbikge1xuICAgICAgICB2YXIgdCA9IGVbbl0sXG4gICAgICAgICAgbyA9IGNbdF07XG4gICAgICAgIG8gJiYgKGVbbl0gPSBvKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBCKGUsIG4pIHtcbiAgICBpZiAoISghdi5kZWJ1ZyB8fCAobiAmJiBuLmlzSW5uZXJJbnZva2UpKSkge1xuICAgICAgdmFyIGkgPSBhW2VdO1xuICAgICAgaSAmJiAoZSA9IGkpLFxuICAgICAgICBuICYmIG4uX2NvbXBsZXRlICYmIGRlbGV0ZSBuLl9jb21wbGV0ZSxcbiAgICAgICAgY29uc29sZS5sb2coJ1wiJyArIGUgKyAnXCIsJywgbiB8fCBcIlwiKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gTCgpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cbiAgZnVuY3Rpb24gTyhlKSB7XG4gICAgbCAmJlxuICAgICAgKG8uV2VpeGluSlNCcmlkZ2VcbiAgICAgICAgPyBlKClcbiAgICAgICAgOiBpLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICAgICAgICBpLmFkZEV2ZW50TGlzdGVuZXIoXCJXZWl4aW5KU0JyaWRnZVJlYWR5XCIsIGUsICExKSk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==