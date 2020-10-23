module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/index.js":
/*!**********************!*\
  !*** ./api/index.js ***!
  \**********************/
/*! exports provided: getDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDetail", function() { return getDetail; });
/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/http */ "./utils/http.js");

function getDetail(data) {
  return Object(_utils_http__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/jm/detail',
    method: 'get',
    params: data
  });
}

/***/ }),

/***/ "./components/banner/index.js":
/*!************************************!*\
  !*** ./components/banner/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd-mobile */ "antd-mobile");
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_mobile__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./components/banner/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\components\\banner\\index.js";

 // import wx from 'weixin-js-sdk'



const Banner = props => {
  // 处理点击
  const handleClick = data => {
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
          // props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792')
          break;
        }

      case '3':
        {
          if (data.link) {
            props.navigateTo('/pages/index/website/website?url=' + encodeURIComponent(data.link));
          }

          break;
        }

      default:
        {
          break;
        }
    }
  };

  const {
    businessData
  } = props;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "banner-box",
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(antd_mobile__WEBPACK_IMPORTED_MODULE_2__["Carousel"], {
      autoplay: true,
      infinite: true,
      dots: businessData.items && businessData.items.length > 1,
      autoplayInterval: 3000,
      children: businessData && businessData.items && businessData.items.map((item, i) => {
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "banner-item",
          onClick: () => handleClick(item),
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
            src: item.image
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 18
          }, undefined)
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 15
        }, undefined);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Banner);

/***/ }),

/***/ "./components/banner/index.scss":
/*!**************************************!*\
  !*** ./components/banner/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/head/index.js":
/*!**********************************!*\
  !*** ./components/head/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\components\\head\\index.js";


const MyHead = props => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("title", {
      children: props.title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("meta", {
      name: "viewport",
      content: "initial-scale=1.0, width=device-width"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("link", {
      href: "https://cdn.bootcss.com/antd-mobile/2.1.1/antd-mobile.css",
      rel: "stylesheet"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (MyHead);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd-mobile */ "antd-mobile");
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_mobile__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_head_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/head/index */ "./components/head/index.js");
/* harmony import */ var _components_banner_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/banner/index */ "./components/banner/index.js");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../style/index.scss */ "./style/index.scss");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_index_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../api/index */ "./api/index.js");

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\pages\\index.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import  {useState} from 'react'







class Index extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  static async getInitialProps({
    query
  }) {
    const detail = await Object(_api_index__WEBPACK_IMPORTED_MODULE_6__["getDetail"])({
      id: query.id
    });
    return {
      detail: detail.code === 200 ? detail.data : {},
      query
    };
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }

  showTeamplate(data) {
    console.log(data.name);

    switch (data.name) {
      case 'jm-banner':
        {
          return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_banner_index__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, data), data.uuid, false, {
            fileName: _jsxFileName,
            lineNumber: 28,
            columnNumber: 16
          }, this);
        }

      default:
        {
          return '';
        }
    }
  }

  render() {
    const {
      query,
      detail
    } = this.props;
    const showPage = !detail || !query.id; // if (showPage) {
    //   Toast.fail('数据加载出错', 2)
    // }

    if (!showPage) {
      const {
        pages
      } = detail;
      const content = pages.content || [];
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "page-box",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_head_index__WEBPACK_IMPORTED_MODULE_3__["default"], {
          title: detail.title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, this), content && content.map((item, i) => {
          return this.showTeamplate(item);
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, this);
    } else {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 14
      }, this);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./style/index.scss":
/*!**************************!*\
  !*** ./style/index.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./utils/http.js":
/*!***********************!*\
  !*** ./utils/http.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: 'http://chimke.cn:8088',
  timeout: 20000
}); // 添加请求拦截器

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.headers.token = `${token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 添加响应拦截器

request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data;

  if (res.code === 401) {// 未登录
  } else if (res.code === 200) {
    return res;
  } else {
    return Promise.reject(res);
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["default"] = (request);

/***/ }),

/***/ "antd-mobile":
/*!******************************!*\
  !*** external "antd-mobile" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd-mobile");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react/jsx-dev-runtime");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVhZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9odHRwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFudGQtbW9iaWxlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIl0sIm5hbWVzIjpbImdldERldGFpbCIsImRhdGEiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwicGFyYW1zIiwiQmFubmVyIiwicHJvcHMiLCJoYW5kbGVDbGljayIsImp1bXBUeXBlIiwicHJvZHVjdENvZGUiLCJuYXZpZ2F0ZVRvIiwic3BlY2lhbElkIiwibGluayIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ1c2luZXNzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImkiLCJpbWFnZSIsIk15SGVhZCIsInRpdGxlIiwiSW5kZXgiLCJSZWFjdCIsIkNvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsInF1ZXJ5IiwiZGV0YWlsIiwiaWQiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJjb25zb2xlIiwibG9nIiwic3RhdGUiLCJzaG93VGVhbXBsYXRlIiwibmFtZSIsInV1aWQiLCJyZW5kZXIiLCJzaG93UGFnZSIsInBhZ2VzIiwiY29udGVudCIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJpbnRlcmNlcHRvcnMiLCJ1c2UiLCJjb25m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QUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsa0QiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi8uLi91dGlscy9odHRwJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERldGFpbChkYXRhKSB7XHJcbiAgcmV0dXJuIHJlcXVlc3Qoe1xyXG4gICAgdXJsOiAnL2ptL2RldGFpbCcsXHJcbiAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgcGFyYW1zOiBkYXRhXHJcbn0pXHJcbn0iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDYXJvdXNlbCB9IGZyb20gJ2FudGQtbW9iaWxlJ1xyXG5cclxuLy8gaW1wb3J0IHd4IGZyb20gJ3dlaXhpbi1qcy1zZGsnXHJcblxyXG5pbXBvcnQgJy4vaW5kZXguc2NzcydcclxuXHJcbmNvbnN0IEJhbm5lciA9IChwcm9wcykgPT4ge1xyXG4gIC8vIOWkhOeQhueCueWHu1xyXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGRhdGEpID0+IHtcclxuICAgIC8vICAw77ya5ZWG5ZOB77yMMe+8muS4k+mimO+8jDLvvJrmtLvliqjvvIwz77ya6ZO+5o6l77yMNO+8muaXoOi3s+i9rFxyXG4gICAgc3dpdGNoIChkYXRhLmp1bXBUeXBlICsgJycpIHtcclxuICAgICAgY2FzZSAnMCc6IHtcclxuICAgICAgICBpZiAoZGF0YS5wcm9kdWN0Q29kZSkge1xyXG4gICAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0nICsgZGF0YS5wcm9kdWN0Q29kZSApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzEnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3BlY2lhbElkKSB7XHJcbiAgICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvYWN0aXZpdHkvcHJvZHVjdExpc3Q/dHlwZT0yJnRpZD0nICsgZGF0YS5zcGVjaWFsSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzInOiB7XHJcbiAgICAgICAgLy8gcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0xODY3OTInKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzMnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEubGluaykge1xyXG4gICAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3dlYnNpdGUvd2Vic2l0ZT91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhLmxpbmspKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHsgYnVzaW5lc3NEYXRhIH0gPSBwcm9wc1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1ib3hcIj5cclxuICAgICAgPENhcm91c2VsIFxyXG4gICAgICBhdXRvcGxheT17dHJ1ZX1cclxuICAgICAgaW5maW5pdGVcclxuICAgICAgZG90cz17YnVzaW5lc3NEYXRhLml0ZW1zICYmIGJ1c2luZXNzRGF0YS5pdGVtcy5sZW5ndGggPiAxfVxyXG4gICAgICBhdXRvcGxheUludGVydmFsPXszMDAwfVxyXG4gICAgICA+IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJ1c2luZXNzRGF0YSAmJiBidXNpbmVzc0RhdGEuaXRlbXMgJiYgYnVzaW5lc3NEYXRhLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1pdGVtXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGljayhpdGVtKX0+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2l0ZW0uaW1hZ2V9IC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICApXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgPC9DYXJvdXNlbD5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFubmVyIiwiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5cclxuY29uc3QgTXlIZWFkID0gKHByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxIZWFkPlxyXG4gICAgICA8dGl0bGU+e3Byb3BzLnRpdGxlfTwvdGl0bGU+XHJcbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJpbml0aWFsLXNjYWxlPTEuMCwgd2lkdGg9ZGV2aWNlLXdpZHRoXCIgLz5cclxuICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vY2RuLmJvb3Rjc3MuY29tL2FudGQtbW9iaWxlLzIuMS4xL2FudGQtbW9iaWxlLmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxyXG4gICAgICB7LyogPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiaHR0cHM6Ly9yZXMud3gucXEuY29tL29wZW4vanMvandlaXhpbi0xLjMuMi5qc1wiPjwvc2NyaXB0PiAqL31cclxuICAgIDwvSGVhZD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15SGVhZFxyXG4gIiwiXHJcbi8vIGltcG9ydCAge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJ2FudGQtbW9iaWxlJ1xyXG5cclxuaW1wb3J0IEhlYWQgZnJvbSAnLi8uLi9jb21wb25lbnRzL2hlYWQvaW5kZXgnXHJcbmltcG9ydCBCYW5uZXIgZnJvbSAnLi8uLi9jb21wb25lbnRzL2Jhbm5lci9pbmRleCdcclxuXHJcbmltcG9ydCAgJy4vLi4vc3R5bGUvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGdldERldGFpbCB9IGZyb20gJy4vLi4vYXBpL2luZGV4J1xyXG5cclxuY2xhc3MgSW5kZXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoeyBxdWVyeSB9KSB7XHJcbiAgICBjb25zdCBkZXRhaWwgPSBhd2FpdCBnZXREZXRhaWwoeyBpZDogcXVlcnkuaWQgfSlcclxuICAgIHJldHVybiB7IGRldGFpbDogZGV0YWlsLmNvZGUgPT09IDIwMCA/IGRldGFpbC5kYXRhIDoge30sIHF1ZXJ5IH1cclxuICB9XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpXHJcbiAgICBjb25zb2xlLmxvZyhwcm9wcylcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNob3dUZWFtcGxhdGUoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coZGF0YS5uYW1lKVxyXG4gICAgc3dpdGNoIChkYXRhLm5hbWUpIHtcclxuICAgICAgY2FzZSAnam0tYmFubmVyJzoge1xyXG4gICAgICAgIHJldHVybiA8QmFubmVyIGtleT17ZGF0YS51dWlkfSB7Li4uZGF0YX0gLz5cclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7IFxyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcXVlcnksIGRldGFpbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2hvd1BhZ2UgPSAhZGV0YWlsIHx8ICFxdWVyeS5pZFxyXG4gICAgLy8gaWYgKHNob3dQYWdlKSB7XHJcbiAgICAvLyAgIFRvYXN0LmZhaWwoJ+aVsOaNruWKoOi9veWHuumUmScsIDIpXHJcbiAgICAvLyB9XHJcbiAgICBpZiAoIXNob3dQYWdlKSB7XHJcbiAgICAgIGNvbnN0IHsgcGFnZXMgfSA9IGRldGFpbFxyXG4gICAgICBjb25zdCBjb250ZW50ID0gcGFnZXMuY29udGVudCB8fCBbXVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYWdlLWJveCc+XHJcbiAgICAgICAgICA8SGVhZCB0aXRsZT17ZGV0YWlsLnRpdGxlfT48L0hlYWQ+XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgJiYgY29udGVudC5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93VGVhbXBsYXRlKGl0ZW0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA8ZGl2PjwvZGl2PlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJbmRleCIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuXHJcbmNvbnN0IHJlcXVlc3QgPSBheGlvcy5jcmVhdGUoe1xyXG4gICAgYmFzZVVSTDogJ2h0dHA6Ly9jaGlta2UuY246ODA4OCcsXHJcbiAgICB0aW1lb3V0OiAyMDAwMFxyXG59KVxyXG4vLyDmt7vliqDor7fmsYLmi6bmiKrlmahcclxucmVxdWVzdC5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgLy8g5Zyo5Y+R6YCB6K+35rGC5LmL5YmN5YGa5Lqb5LuA5LmIXHJcbiAgICAgICAvLyBjb25maWcuaGVhZGVycy50b2tlbiA9IGAke3Rva2VufWBcclxuICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAvLyDlr7nor7fmsYLplJnor6/lgZrkupvku4DkuYhcclxuICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxufSlcclxuXHJcbi8vIOa3u+WKoOWTjeW6lOaLpuaIquWZqFxyXG5yZXF1ZXN0LmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAvLyDlr7nlk43lupTmlbDmja7lgZrngrnku4DkuYhcclxuICAgIGNvbnN0IHJlcyA9IHJlc3BvbnNlLmRhdGFcclxuICAgIGlmIChyZXMuY29kZSA9PT0gNDAxKSB7IC8vIOacqueZu+W9lVxyXG5cclxuICAgIH0gZWxzZSBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlcylcclxuICAgIH1cclxufSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgIC8vIOWvueWTjeW6lOmUmeivr+WBmueCueS7gOS5iFxyXG4gICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFudGQtbW9iaWxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==