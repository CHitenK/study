webpackHotUpdate_N_E("pages/zt",{

/***/ "./components/banner/index.js":
/*!************************************!*\
  !*** ./components/banner/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/_react@17.0.0@react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.0@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd-mobile */ "./node_modules/_antd-mobile@2.3.4@antd-mobile/es/index.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./components/banner/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\components\\banner\\index.js",
    _this = undefined;


 // import wx from 'weixin-js-sdk'



var Banner = function Banner(props) {
  console.log(props); // 处理点击

  var handleClick = function handleClick(data) {
    //  0：商品，1：专题，2：活动，3：链接，4：无跳转
    switch (data.jumpType + '') {
      case '0':
        {
          if (data.productCode) {
            props.navigateTo('/pages/index/productDetail/productDetail?targetId=' + data.productCode);
          }

          break;
        }

      case '1':
        {
          if (data.specialId) {
            props.navigateTo('/pages/index/activity/productList?type=2&tid=' + data.specialId);
          }

          break;
        }

      case '2':
        {
          props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792');
          break;
        }

      case '3':
        {
          props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792');
          break;
        }

      default:
        {
          break;
        }
    }
  };

  var businessData = props.businessData;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "banner-box",
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(antd_mobile__WEBPACK_IMPORTED_MODULE_2__["Carousel"], {
      autoplay: true,
      infinite: true,
      dots: businessData.items && businessData.items.length > 1,
      autoplayInterval: 3000,
      children: businessData && businessData.items && businessData.items.map(function (item, i) {
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "banner-item",
          onClick: function onClick() {
            return handleClick(item);
          },
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
            src: item.image
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 52,
            columnNumber: 18
          }, _this)
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 15
        }, _this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, _this);
};

_c = Banner;
/* harmony default export */ __webpack_exports__["default"] = (Banner);

var _c;

$RefreshReg$(_c, "Banner");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9iYW5uZXIvaW5kZXguanMiXSwibmFtZXMiOlsiQmFubmVyIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJkYXRhIiwianVtcFR5cGUiLCJwcm9kdWN0Q29kZSIsIm5hdmlnYXRlVG8iLCJzcGVjaWFsSWQiLCJidXNpbmVzc0RhdGEiLCJpdGVtcyIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJpIiwiaW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Q0FHQTs7QUFFQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDQyxLQUFELEVBQVc7QUFDeEJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaLEVBRHdCLENBRXhCOztBQUNBLE1BQU1HLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLElBQUQsRUFBVTtBQUM1QjtBQUNBLFlBQVFBLElBQUksQ0FBQ0MsUUFBTCxHQUFnQixFQUF4QjtBQUNFLFdBQUssR0FBTDtBQUFVO0FBQ1IsY0FBSUQsSUFBSSxDQUFDRSxXQUFULEVBQXNCO0FBQ3BCTixpQkFBSyxDQUFDTyxVQUFOLENBQWlCLHVEQUF1REgsSUFBSSxDQUFDRSxXQUE3RTtBQUNEOztBQUNEO0FBQ0Q7O0FBQ0QsV0FBSyxHQUFMO0FBQVU7QUFDUixjQUFJRixJQUFJLENBQUNJLFNBQVQsRUFBb0I7QUFDbEJSLGlCQUFLLENBQUNPLFVBQU4sQ0FBaUIsa0RBQWtESCxJQUFJLENBQUNJLFNBQXhFO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFDRCxXQUFLLEdBQUw7QUFBVTtBQUNSUixlQUFLLENBQUNPLFVBQU4sQ0FBaUIsMERBQWpCO0FBQ0E7QUFDRDs7QUFDRCxXQUFLLEdBQUw7QUFBVTtBQUNSUCxlQUFLLENBQUNPLFVBQU4sQ0FBaUIsMERBQWpCO0FBQ0E7QUFDRDs7QUFDRDtBQUFTO0FBQ1A7QUFDRDtBQXZCSDtBQXlCRCxHQTNCRDs7QUFId0IsTUErQmhCRSxZQS9CZ0IsR0ErQkNULEtBL0JELENBK0JoQlMsWUEvQmdCO0FBZ0N4QixzQkFDRTtBQUFLLGFBQVMsRUFBQyxZQUFmO0FBQUEsMkJBQ0UscUVBQUMsb0RBQUQ7QUFDQSxjQUFRLEVBQUUsSUFEVjtBQUVBLGNBQVEsTUFGUjtBQUdBLFVBQUksRUFBRUEsWUFBWSxDQUFDQyxLQUFiLElBQXNCRCxZQUFZLENBQUNDLEtBQWIsQ0FBbUJDLE1BQW5CLEdBQTRCLENBSHhEO0FBSUEsc0JBQWdCLEVBQUUsSUFKbEI7QUFBQSxnQkFPSUYsWUFBWSxJQUFJQSxZQUFZLENBQUNDLEtBQTdCLElBQXNDRCxZQUFZLENBQUNDLEtBQWIsQ0FBbUJFLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ3ZFLDRCQUNDO0FBQUssbUJBQVMsRUFBQyxhQUFmO0FBQXFDLGlCQUFPLEVBQUU7QUFBQSxtQkFBTVgsV0FBVyxDQUFDVSxJQUFELENBQWpCO0FBQUEsV0FBOUM7QUFBQSxpQ0FDRztBQUFLLGVBQUcsRUFBRUEsSUFBSSxDQUFDRTtBQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESCxXQUFrQ0QsQ0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERDtBQUtGLE9BTnFDO0FBUDFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFvQkQsQ0FwREQ7O0tBQU1mLE07QUFzRFNBLHFFQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL3p0LmQ0N2ZlYWIzNDE3YzE4YTRjYTE5LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDYXJvdXNlbCB9IGZyb20gJ2FudGQtbW9iaWxlJ1xyXG5cclxuLy8gaW1wb3J0IHd4IGZyb20gJ3dlaXhpbi1qcy1zZGsnXHJcblxyXG5pbXBvcnQgJy4vaW5kZXguc2NzcydcclxuXHJcbmNvbnN0IEJhbm5lciA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHByb3BzKVxyXG4gIC8vIOWkhOeQhueCueWHu1xyXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGRhdGEpID0+IHtcclxuICAgIC8vICAw77ya5ZWG5ZOB77yMMe+8muS4k+mimO+8jDLvvJrmtLvliqjvvIwz77ya6ZO+5o6l77yMNO+8muaXoOi3s+i9rFxyXG4gICAgc3dpdGNoIChkYXRhLmp1bXBUeXBlICsgJycpIHtcclxuICAgICAgY2FzZSAnMCc6IHtcclxuICAgICAgICBpZiAoZGF0YS5wcm9kdWN0Q29kZSkge1xyXG4gICAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0nICsgZGF0YS5wcm9kdWN0Q29kZSApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzEnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3BlY2lhbElkKSB7XHJcbiAgICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvYWN0aXZpdHkvcHJvZHVjdExpc3Q/dHlwZT0yJnRpZD0nICsgZGF0YS5zcGVjaWFsSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzInOiB7XHJcbiAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0xODY3OTInKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzMnOiB7XHJcbiAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0xODY3OTInKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCB7IGJ1c2luZXNzRGF0YSB9ID0gcHJvcHNcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItYm94XCI+XHJcbiAgICAgIDxDYXJvdXNlbCBcclxuICAgICAgYXV0b3BsYXk9e3RydWV9XHJcbiAgICAgIGluZmluaXRlXHJcbiAgICAgIGRvdHM9e2J1c2luZXNzRGF0YS5pdGVtcyAmJiBidXNpbmVzc0RhdGEuaXRlbXMubGVuZ3RoID4gMX1cclxuICAgICAgYXV0b3BsYXlJbnRlcnZhbD17MzAwMH1cclxuICAgICAgPiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBidXNpbmVzc0RhdGEgJiYgYnVzaW5lc3NEYXRhLml0ZW1zICYmIGJ1c2luZXNzRGF0YS5pdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItaXRlbVwiIGtleT17aX0gb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpY2soaXRlbSl9PlxyXG4gICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtpdGVtLmltYWdlfSAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIDwvQ2Fyb3VzZWw+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhbm5lciJdLCJzb3VyY2VSb290IjoiIn0=