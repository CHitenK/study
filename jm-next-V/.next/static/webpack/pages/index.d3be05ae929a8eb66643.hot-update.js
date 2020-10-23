webpackHotUpdate_N_E("pages/index",{

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
          props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792');
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
            lineNumber: 50,
            columnNumber: 18
          }, _this)
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 15
        }, _this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 39,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9iYW5uZXIvaW5kZXguanMiXSwibmFtZXMiOlsiQmFubmVyIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJkYXRhIiwianVtcFR5cGUiLCJwcm9kdWN0Q29kZSIsIm5hdmlnYXRlVG8iLCJidXNpbmVzc0RhdGEiLCJpdGVtcyIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJpIiwiaW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Q0FHQTs7QUFFQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDQyxLQUFELEVBQVc7QUFDeEJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaLEVBRHdCLENBRXhCOztBQUNBLE1BQU1HLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLElBQUQsRUFBVTtBQUM1QjtBQUNBLFlBQVFBLElBQUksQ0FBQ0MsUUFBTCxHQUFnQixFQUF4QjtBQUNFLFdBQUssR0FBTDtBQUFVO0FBQ1IsY0FBSUQsSUFBSSxDQUFDRSxXQUFULEVBQXNCO0FBQ3BCTixpQkFBSyxDQUFDTyxVQUFOLENBQWlCLHVEQUF1REgsSUFBSSxDQUFDRSxXQUE3RTtBQUNEOztBQUNEO0FBQ0Q7O0FBQ0QsV0FBSyxHQUFMO0FBQVU7QUFDUk4sZUFBSyxDQUFDTyxVQUFOLENBQWlCLDBEQUFqQjtBQUNBO0FBQ0Q7O0FBQ0QsV0FBSyxHQUFMO0FBQVU7QUFDUlAsZUFBSyxDQUFDTyxVQUFOLENBQWlCLDBEQUFqQjtBQUNBO0FBQ0Q7O0FBQ0QsV0FBSyxHQUFMO0FBQVU7QUFDUlAsZUFBSyxDQUFDTyxVQUFOLENBQWlCLDBEQUFqQjtBQUNBO0FBQ0Q7O0FBQ0Q7QUFBUztBQUNQO0FBQ0Q7QUFyQkg7QUF1QkQsR0F6QkQ7O0FBSHdCLE1BNkJoQkMsWUE3QmdCLEdBNkJDUixLQTdCRCxDQTZCaEJRLFlBN0JnQjtBQThCeEIsc0JBQ0U7QUFBSyxhQUFTLEVBQUMsWUFBZjtBQUFBLDJCQUNFLHFFQUFDLG9EQUFEO0FBQ0EsY0FBUSxFQUFFLElBRFY7QUFFQSxjQUFRLE1BRlI7QUFHQSxVQUFJLEVBQUVBLFlBQVksQ0FBQ0MsS0FBYixJQUFzQkQsWUFBWSxDQUFDQyxLQUFiLENBQW1CQyxNQUFuQixHQUE0QixDQUh4RDtBQUlBLHNCQUFnQixFQUFFLElBSmxCO0FBQUEsZ0JBT0lGLFlBQVksSUFBSUEsWUFBWSxDQUFDQyxLQUE3QixJQUFzQ0QsWUFBWSxDQUFDQyxLQUFiLENBQW1CRSxHQUFuQixDQUF1QixVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUN2RSw0QkFDQztBQUFLLG1CQUFTLEVBQUMsYUFBZjtBQUFxQyxpQkFBTyxFQUFFO0FBQUEsbUJBQU1WLFdBQVcsQ0FBQ1MsSUFBRCxDQUFqQjtBQUFBLFdBQTlDO0FBQUEsaUNBQ0c7QUFBSyxlQUFHLEVBQUVBLElBQUksQ0FBQ0U7QUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREgsV0FBa0NELENBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREQ7QUFLRixPQU5xQztBQVAxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBb0JELENBbEREOztLQUFNZCxNO0FBb0RTQSxxRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9pbmRleC5kM2JlMDVhZTkyOWE4ZWI2NjY0My5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgQ2Fyb3VzZWwgfSBmcm9tICdhbnRkLW1vYmlsZSdcclxuXHJcbi8vIGltcG9ydCB3eCBmcm9tICd3ZWl4aW4tanMtc2RrJ1xyXG5cclxuaW1wb3J0ICcuL2luZGV4LnNjc3MnXHJcblxyXG5jb25zdCBCYW5uZXIgPSAocHJvcHMpID0+IHtcclxuICBjb25zb2xlLmxvZyhwcm9wcylcclxuICAvLyDlpITnkIbngrnlh7tcclxuICBjb25zdCBoYW5kbGVDbGljayA9IChkYXRhKSA9PiB7XHJcbiAgICAvLyAgMO+8muWVhuWTge+8jDHvvJrkuJPpopjvvIwy77ya5rS75Yqo77yMM++8mumTvuaOpe+8jDTvvJrml6Dot7PovaxcclxuICAgIHN3aXRjaCAoZGF0YS5qdW1wVHlwZSArICcnKSB7XHJcbiAgICAgIGNhc2UgJzAnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEucHJvZHVjdENvZGUpIHtcclxuICAgICAgICAgIHByb3BzLm5hdmlnYXRlVG8oJy9wYWdlcy9pbmRleC9wcm9kdWN0RGV0YWlsL3Byb2R1Y3REZXRhaWw/dGFyZ2V0SWQ9JyArIGRhdGEucHJvZHVjdENvZGUgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICcxJzoge1xyXG4gICAgICAgIHByb3BzLm5hdmlnYXRlVG8oJy9wYWdlcy9pbmRleC9wcm9kdWN0RGV0YWlsL3Byb2R1Y3REZXRhaWw/dGFyZ2V0SWQ9MTg2NzkyJylcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICcyJzoge1xyXG4gICAgICAgIHByb3BzLm5hdmlnYXRlVG8oJy9wYWdlcy9pbmRleC9wcm9kdWN0RGV0YWlsL3Byb2R1Y3REZXRhaWw/dGFyZ2V0SWQ9MTg2NzkyJylcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICczJzoge1xyXG4gICAgICAgIHByb3BzLm5hdmlnYXRlVG8oJy9wYWdlcy9pbmRleC9wcm9kdWN0RGV0YWlsL3Byb2R1Y3REZXRhaWw/dGFyZ2V0SWQ9MTg2NzkyJylcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY29uc3QgeyBidXNpbmVzc0RhdGEgfSA9IHByb3BzXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWJveFwiPlxyXG4gICAgICA8Q2Fyb3VzZWwgXHJcbiAgICAgIGF1dG9wbGF5PXt0cnVlfVxyXG4gICAgICBpbmZpbml0ZVxyXG4gICAgICBkb3RzPXtidXNpbmVzc0RhdGEuaXRlbXMgJiYgYnVzaW5lc3NEYXRhLml0ZW1zLmxlbmd0aCA+IDF9XHJcbiAgICAgIGF1dG9wbGF5SW50ZXJ2YWw9ezMwMDB9XHJcbiAgICAgID4gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnVzaW5lc3NEYXRhICYmIGJ1c2luZXNzRGF0YS5pdGVtcyAmJiBidXNpbmVzc0RhdGEuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWl0ZW1cIiBrZXk9e2l9IG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGl0ZW0pfT5cclxuICAgICAgICAgICAgICAgICA8aW1nIHNyYz17aXRlbS5pbWFnZX0gLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICA8L0Nhcm91c2VsPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYW5uZXIiXSwic291cmNlUm9vdCI6IiJ9