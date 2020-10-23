webpackHotUpdate_N_E(1,{

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.0@react/index.js");
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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9jb21tb21CdXMvaW5kZXguanMiXSwibmFtZXMiOlsiQnVzIiwicHJvcHMiLCJvblJlZiIsInVybCIsInR5cGUiLCJ3eCIsIm1pbmlQcm9ncmFtIiwicmVkaXJlY3RUbyIsInJlTGF1bmNoIiwic3dpdGNoVGFiIiwibmF2aWdhdGVUbyIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVNQSxHOzs7Ozs7Ozs7Ozs7O3dDQUNlO0FBQ2pCLFdBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixJQUFqQixFQURpQixDQUNNO0FBQ3hCLEssQ0FDRDs7OzsrQkFDV0MsRyxFQUFLQyxJLEVBQU07QUFDcEIsVUFBSUEsSUFBSSxLQUFHLFlBQVgsRUFBeUI7QUFDdkJDLDREQUFFLENBQUNDLFdBQUgsQ0FBZUMsVUFBZixDQUEwQjtBQUFFSixhQUFHLEVBQUhBO0FBQUYsU0FBMUI7QUFDRCxPQUZELE1BRU8sSUFBSUMsSUFBSSxLQUFHLFVBQVgsRUFBdUI7QUFDNUJDLDREQUFFLENBQUNDLFdBQUgsQ0FBZUUsUUFBZixDQUF3QjtBQUFFTCxhQUFHLEVBQUhBO0FBQUYsU0FBeEI7QUFDRCxPQUZNLE1BRUEsSUFBSUMsSUFBSSxLQUFHLFdBQVgsRUFBd0I7QUFDN0JDLDREQUFFLENBQUNDLFdBQUgsQ0FBZUcsU0FBZixDQUF5QjtBQUFFTixhQUFHLEVBQUhBO0FBQUYsU0FBekI7QUFDRCxPQUZNLE1BRUE7QUFDTEUsNERBQUUsQ0FBQ0MsV0FBSCxDQUFlSSxVQUFmLENBQTBCO0FBQUNQLGFBQUcsRUFBSEE7QUFBRCxTQUExQjtBQUNEO0FBRUY7Ozs2QkFDUTtBQUNQLGFBQU8sRUFBUDtBQUNEOzs7O0VBbkJlUSw0Q0FBSyxDQUFDQyxTOztBQXNCVFosa0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svMS5kYTE3Y2EyMTJhNjkwMzgwODM3ZC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgd3ggZnJvbSAnd2VpeGluLWpzLXNkaydcclxuXHJcbmNsYXNzIEJ1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgIHRoaXMucHJvcHMub25SZWYodGhpcykgLy8gLT7lsIZjaGlsZOS8oOmAkue7mXRoaXMucHJvcHMub25SZWYoKeaWueazlVxyXG4gIH1cclxuICAvLyDosIPovaxcclxuICBuYXZpZ2F0ZVRvKHVybCwgdHlwZSkge1xyXG4gICAgaWYgKHR5cGU9PT0ncmVkaXJlY3RUbycpIHtcclxuICAgICAgd3gubWluaVByb2dyYW0ucmVkaXJlY3RUbyh7IHVybCB9KVxyXG4gICAgfSBlbHNlIGlmICh0eXBlPT09J3JlTGF1bmNoJykge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5yZUxhdW5jaCh7IHVybCB9KVxyXG4gICAgfSBlbHNlIGlmICh0eXBlPT09J3N3aXRjaFRhYicpIHtcclxuICAgICAgd3gubWluaVByb2dyYW0uc3dpdGNoVGFiKHsgdXJsIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5uYXZpZ2F0ZVRvKHt1cmwgfSlcclxuICAgIH1cclxuICAgXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAnJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVzIl0sInNvdXJjZVJvb3QiOiIifQ==