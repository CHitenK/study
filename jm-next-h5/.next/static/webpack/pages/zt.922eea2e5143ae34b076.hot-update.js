webpackHotUpdate_N_E("pages/zt",{

/***/ "./components/products/index.js":
/*!**************************************!*\
  !*** ./components/products/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/_react@17.0.0@react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.0@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd-mobile */ "./node_modules/_antd-mobile@2.3.4@antd-mobile/es/index.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./components/products/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\components\\products\\index.js",
    _this = undefined;


 // import wx from 'weixin-js-sdk'



var Products = function Products(props) {
  console.log(props); // 抄底三列

  var productType1 = function productType1() {
    var target = props.businessData;
    var product = target.product || [];
    var style = {
      backgroundColor: target.wrapperBgColor
    };
    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "product-box product-box-I",
      style: style,
      children: product.map(function (item, i) {
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "product-box-I-item",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
            src: item.imageUrl
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 15
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "name",
            children: item.name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 24,
            columnNumber: 15
          }, _this)]
        }, i, true, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 13
        }, _this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 5
    }, _this);
  };

  return productType1();
};

_c = Products;
/* harmony default export */ __webpack_exports__["default"] = (Products);

var _c;

$RefreshReg$(_c, "Products");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9wcm9kdWN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQcm9kdWN0cyIsInByb3BzIiwiY29uc29sZSIsImxvZyIsInByb2R1Y3RUeXBlMSIsInRhcmdldCIsImJ1c2luZXNzRGF0YSIsInByb2R1Y3QiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIndyYXBwZXJCZ0NvbG9yIiwibWFwIiwiaXRlbSIsImkiLCJpbWFnZVVybCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Q0FHQTs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxLQUFELEVBQVc7QUFDMUJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaLEVBRDBCLENBRTNCOztBQUNBLE1BQU1HLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDekIsUUFBTUMsTUFBTSxHQUFHSixLQUFLLENBQUNLLFlBQXJCO0FBQ0EsUUFBTUMsT0FBTyxHQUFHRixNQUFNLENBQUNFLE9BQVAsSUFBa0IsRUFBbEM7QUFDQSxRQUFNQyxLQUFLLEdBQUc7QUFDWkMscUJBQWUsRUFBRUosTUFBTSxDQUFDSztBQURaLEtBQWQ7QUFHQSx3QkFDQztBQUFLLGVBQVMsRUFBQywyQkFBZjtBQUEyQyxXQUFLLEVBQUVGLEtBQWxEO0FBQUEsZ0JBRUtELE9BQU8sQ0FBQ0ksR0FBUixDQUFZLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ3ZCLDRCQUNDO0FBQUssbUJBQVMsRUFBQyxvQkFBZjtBQUFBLGtDQUNFO0FBQUssZUFBRyxFQUFFRCxJQUFJLENBQUNFO0FBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixlQUVFO0FBQUsscUJBQVMsRUFBQyxNQUFmO0FBQUEsc0JBQXVCRixJQUFJLENBQUNHO0FBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRkY7QUFBQSxXQUF5Q0YsQ0FBekM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERDtBQU1ELE9BUEQ7QUFGTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREQ7QUFjRCxHQXBCRDs7QUFzQkEsU0FBT1QsWUFBWSxFQUFuQjtBQUNBLENBMUJEOztLQUFNSixRO0FBNEJTQSx1RUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy96dC45MjJlZWEyZTUxNDNhZTM0YjA3Ni5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgQ2Fyb3VzZWwgfSBmcm9tICdhbnRkLW1vYmlsZSdcclxuXHJcbi8vIGltcG9ydCB3eCBmcm9tICd3ZWl4aW4tanMtc2RrJ1xyXG5cclxuaW1wb3J0ICcuL2luZGV4LnNjc3MnXHJcblxyXG5jb25zdCBQcm9kdWN0cyA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHByb3BzKVxyXG4gLy8g5oqE5bqV5LiJ5YiXXHJcbiBjb25zdCBwcm9kdWN0VHlwZTEgPSAoKSA9PiB7XHJcbiAgIGNvbnN0IHRhcmdldCA9IHByb3BzLmJ1c2luZXNzRGF0YVxyXG4gICBjb25zdCBwcm9kdWN0ID0gdGFyZ2V0LnByb2R1Y3QgfHwgW11cclxuICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgYmFja2dyb3VuZENvbG9yOiB0YXJnZXQud3JhcHBlckJnQ29sb3JcclxuICAgfVxyXG4gICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwcm9kdWN0LWJveCBwcm9kdWN0LWJveC1JXCIgc3R5bGU9e3N0eWxlfT5cclxuICAgICAge1xyXG4gICAgICAgICBwcm9kdWN0Lm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZHVjdC1ib3gtSS1pdGVtXCIga2V5PXtpfT5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17aXRlbS5pbWFnZVVybH0gLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICApXHJcbiAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIDwvZGl2PlxyXG4gICApXHJcbiB9XHJcblxyXG4gcmV0dXJuIHByb2R1Y3RUeXBlMSgpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzIl0sInNvdXJjZVJvb3QiOiIifQ==