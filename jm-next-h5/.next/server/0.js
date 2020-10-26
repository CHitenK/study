exports.ids = [0];
exports.modules = {

/***/ "./components/commomBus/index.js":
/*!***************************************!*\
  !*** ./components/commomBus/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! weixin-js-sdk */ "weixin-js-sdk");
/* harmony import */ var weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1__);



class Bus extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  componentDidMount() {
    this.props.onRef(this); // ->将child传递给this.props.onRef()方法
  } // 调转


  navigateTo(url, type) {
    if (type === 'redirectTo') {
      weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.miniProgram.redirectTo({
        url
      });
    } else if (type === 'reLaunch') {
      weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.miniProgram.reLaunch({
        url
      });
    } else if (type === 'switchTab') {
      weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.miniProgram.switchTab({
        url
      });
    } else {
      weixin_js_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.miniProgram.navigateTo({
        url
      });
    }
  }

  render() {
    return '';
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Bus);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NvbW1vbUJ1cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJCdXMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvcHMiLCJvblJlZiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0eXBlIiwid3giLCJtaW5pUHJvZ3JhbSIsInJlZGlyZWN0VG8iLCJyZUxhdW5jaCIsInN3aXRjaFRhYiIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxNQUFNQSxHQUFOLFNBQWtCQyw0Q0FBSyxDQUFDQyxTQUF4QixDQUFrQztBQUNoQ0MsbUJBQWlCLEdBQUU7QUFDakIsU0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCLElBQWpCLEVBRGlCLENBQ007QUFDeEIsR0FIK0IsQ0FJaEM7OztBQUNBQyxZQUFVLENBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFZO0FBQ3BCLFFBQUlBLElBQUksS0FBRyxZQUFYLEVBQXlCO0FBQ3ZCQywwREFBRSxDQUFDQyxXQUFILENBQWVDLFVBQWYsQ0FBMEI7QUFBRUo7QUFBRixPQUExQjtBQUNELEtBRkQsTUFFTyxJQUFJQyxJQUFJLEtBQUcsVUFBWCxFQUF1QjtBQUM1QkMsMERBQUUsQ0FBQ0MsV0FBSCxDQUFlRSxRQUFmLENBQXdCO0FBQUVMO0FBQUYsT0FBeEI7QUFDRCxLQUZNLE1BRUEsSUFBSUMsSUFBSSxLQUFHLFdBQVgsRUFBd0I7QUFDN0JDLDBEQUFFLENBQUNDLFdBQUgsQ0FBZUcsU0FBZixDQUF5QjtBQUFFTjtBQUFGLE9BQXpCO0FBQ0QsS0FGTSxNQUVBO0FBQ0xFLDBEQUFFLENBQUNDLFdBQUgsQ0FBZUosVUFBZixDQUEwQjtBQUFDQztBQUFELE9BQTFCO0FBQ0Q7QUFFRjs7QUFDRE8sUUFBTSxHQUFHO0FBQ1AsV0FBTyxFQUFQO0FBQ0Q7O0FBbkIrQjs7QUFzQm5CZCxrRUFBZixFIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB3eCBmcm9tICd3ZWl4aW4tanMtc2RrJ1xyXG5cclxuY2xhc3MgQnVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgdGhpcy5wcm9wcy5vblJlZih0aGlzKSAvLyAtPuWwhmNoaWxk5Lyg6YCS57uZdGhpcy5wcm9wcy5vblJlZigp5pa55rOVXHJcbiAgfVxyXG4gIC8vIOiwg+i9rFxyXG4gIG5hdmlnYXRlVG8odXJsLCB0eXBlKSB7XHJcbiAgICBpZiAodHlwZT09PSdyZWRpcmVjdFRvJykge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5yZWRpcmVjdFRvKHsgdXJsIH0pXHJcbiAgICB9IGVsc2UgaWYgKHR5cGU9PT0ncmVMYXVuY2gnKSB7XHJcbiAgICAgIHd4Lm1pbmlQcm9ncmFtLnJlTGF1bmNoKHsgdXJsIH0pXHJcbiAgICB9IGVsc2UgaWYgKHR5cGU9PT0nc3dpdGNoVGFiJykge1xyXG4gICAgICB3eC5taW5pUHJvZ3JhbS5zd2l0Y2hUYWIoeyB1cmwgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHd4Lm1pbmlQcm9ncmFtLm5hdmlnYXRlVG8oe3VybCB9KVxyXG4gICAgfVxyXG4gICBcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuICcnXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXMiXSwic291cmNlUm9vdCI6IiJ9