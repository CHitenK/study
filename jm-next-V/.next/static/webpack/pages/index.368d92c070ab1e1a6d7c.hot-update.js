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
    props.say(); //  0：商品，1：专题，2：活动，3：链接，4：无跳转

    switch (data.jumpType + '') {
      case '0':
        {
          props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792');
          break;
        }

      case '1':
        {
          wx.miniProgram.navigateTo({
            url: '/pages/index/productDetail/productDetail?targetId=186792'
          });
          break;
        }

      case '2':
        {
          wx.miniProgram.navigateTo({
            url: '/pages/index/productDetail/productDetail?targetId=186792'
          });
          break;
        }

      case '3':
        {
          wx.miniProgram.navigateTo({
            url: '/pages/index/productDetail/productDetail?targetId=186792'
          });
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
            lineNumber: 49,
            columnNumber: 18
          }, _this)
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 15
        }, _this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9iYW5uZXIvaW5kZXguanMiXSwibmFtZXMiOlsiQmFubmVyIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJkYXRhIiwic2F5IiwianVtcFR5cGUiLCJuYXZpZ2F0ZVRvIiwid3giLCJtaW5pUHJvZ3JhbSIsInVybCIsImJ1c2luZXNzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImkiLCJpbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtDQUdBOztBQUVBOztBQUVBLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNDLEtBQUQsRUFBVztBQUN4QkMsU0FBTyxDQUFDQyxHQUFSLENBQVlGLEtBQVosRUFEd0IsQ0FFeEI7O0FBQ0EsTUFBTUcsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0MsSUFBRCxFQUFVO0FBQzVCSixTQUFLLENBQUNLLEdBQU4sR0FENEIsQ0FFNUI7O0FBQ0EsWUFBUUQsSUFBSSxDQUFDRSxRQUFMLEdBQWdCLEVBQXhCO0FBQ0UsV0FBSyxHQUFMO0FBQVU7QUFDUk4sZUFBSyxDQUFDTyxVQUFOLENBQWlCLDBEQUFqQjtBQUNBO0FBQ0Q7O0FBQ0QsV0FBSyxHQUFMO0FBQVU7QUFDUkMsWUFBRSxDQUFDQyxXQUFILENBQWVGLFVBQWYsQ0FBMEI7QUFBQ0csZUFBRyxFQUFFO0FBQU4sV0FBMUI7QUFDQTtBQUNEOztBQUNELFdBQUssR0FBTDtBQUFVO0FBQ1JGLFlBQUUsQ0FBQ0MsV0FBSCxDQUFlRixVQUFmLENBQTBCO0FBQUNHLGVBQUcsRUFBRTtBQUFOLFdBQTFCO0FBQ0E7QUFDRDs7QUFDRCxXQUFLLEdBQUw7QUFBVTtBQUNSRixZQUFFLENBQUNDLFdBQUgsQ0FBZUYsVUFBZixDQUEwQjtBQUFDRyxlQUFHLEVBQUU7QUFBTixXQUExQjtBQUNBO0FBQ0Q7O0FBQ0Q7QUFBUztBQUNQO0FBQ0Q7QUFuQkg7QUFxQkQsR0F4QkQ7O0FBSHdCLE1BNEJoQkMsWUE1QmdCLEdBNEJDWCxLQTVCRCxDQTRCaEJXLFlBNUJnQjtBQTZCeEIsc0JBQ0U7QUFBSyxhQUFTLEVBQUMsWUFBZjtBQUFBLDJCQUNFLHFFQUFDLG9EQUFEO0FBQ0EsY0FBUSxFQUFFLElBRFY7QUFFQSxjQUFRLE1BRlI7QUFHQSxVQUFJLEVBQUVBLFlBQVksQ0FBQ0MsS0FBYixJQUFzQkQsWUFBWSxDQUFDQyxLQUFiLENBQW1CQyxNQUFuQixHQUE0QixDQUh4RDtBQUlBLHNCQUFnQixFQUFFLElBSmxCO0FBQUEsZ0JBT0lGLFlBQVksSUFBSUEsWUFBWSxDQUFDQyxLQUE3QixJQUFzQ0QsWUFBWSxDQUFDQyxLQUFiLENBQW1CRSxHQUFuQixDQUF1QixVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUN2RSw0QkFDQztBQUFLLG1CQUFTLEVBQUMsYUFBZjtBQUFxQyxpQkFBTyxFQUFFO0FBQUEsbUJBQU1iLFdBQVcsQ0FBQ1ksSUFBRCxDQUFqQjtBQUFBLFdBQTlDO0FBQUEsaUNBQ0c7QUFBSyxlQUFHLEVBQUVBLElBQUksQ0FBQ0U7QUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREgsV0FBa0NELENBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREQ7QUFLRixPQU5xQztBQVAxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBb0JELENBakREOztLQUFNakIsTTtBQW1EU0EscUVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguMzY4ZDkyYzA3MGFiMWUxYTZkN2MuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IENhcm91c2VsIH0gZnJvbSAnYW50ZC1tb2JpbGUnXHJcblxyXG4vLyBpbXBvcnQgd3ggZnJvbSAnd2VpeGluLWpzLXNkaydcclxuXHJcbmltcG9ydCAnLi9pbmRleC5zY3NzJ1xyXG5cclxuY29uc3QgQmFubmVyID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc29sZS5sb2cocHJvcHMpXHJcbiAgLy8g5aSE55CG54K55Ye7XHJcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgcHJvcHMuc2F5KClcclxuICAgIC8vICAw77ya5ZWG5ZOB77yMMe+8muS4k+mimO+8jDLvvJrmtLvliqjvvIwz77ya6ZO+5o6l77yMNO+8muaXoOi3s+i9rFxyXG4gICAgc3dpdGNoIChkYXRhLmp1bXBUeXBlICsgJycpIHtcclxuICAgICAgY2FzZSAnMCc6IHtcclxuICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvcHJvZHVjdERldGFpbC9wcm9kdWN0RGV0YWlsP3RhcmdldElkPTE4Njc5MicpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnMSc6IHtcclxuICAgICAgICB3eC5taW5pUHJvZ3JhbS5uYXZpZ2F0ZVRvKHt1cmw6ICcvcGFnZXMvaW5kZXgvcHJvZHVjdERldGFpbC9wcm9kdWN0RGV0YWlsP3RhcmdldElkPTE4Njc5Mid9KVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzInOiB7XHJcbiAgICAgICAgd3gubWluaVByb2dyYW0ubmF2aWdhdGVUbyh7dXJsOiAnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0xODY3OTInfSlcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICczJzoge1xyXG4gICAgICAgIHd4Lm1pbmlQcm9ncmFtLm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9pbmRleC9wcm9kdWN0RGV0YWlsL3Byb2R1Y3REZXRhaWw/dGFyZ2V0SWQ9MTg2NzkyJ30pXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IHsgYnVzaW5lc3NEYXRhIH0gPSBwcm9wc1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1ib3hcIj5cclxuICAgICAgPENhcm91c2VsIFxyXG4gICAgICBhdXRvcGxheT17dHJ1ZX1cclxuICAgICAgaW5maW5pdGVcclxuICAgICAgZG90cz17YnVzaW5lc3NEYXRhLml0ZW1zICYmIGJ1c2luZXNzRGF0YS5pdGVtcy5sZW5ndGggPiAxfVxyXG4gICAgICBhdXRvcGxheUludGVydmFsPXszMDAwfVxyXG4gICAgICA+IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJ1c2luZXNzRGF0YSAmJiBidXNpbmVzc0RhdGEuaXRlbXMgJiYgYnVzaW5lc3NEYXRhLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1pdGVtXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGljayhpdGVtKX0+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2l0ZW0uaW1hZ2V9IC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICApXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgPC9DYXJvdXNlbD5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFubmVyIl0sInNvdXJjZVJvb3QiOiIifQ==