module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"pages/zt": 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../" + ({}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/zt.js");
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

/***/ "./pages/zt.js":
/*!*********************!*\
  !*** ./pages/zt.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dynamic */ "next/dynamic");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd-mobile */ "antd-mobile");
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_mobile__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_head_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/head/index */ "./components/head/index.js");
/* harmony import */ var _components_banner_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/banner/index */ "./components/banner/index.js");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../style/index.scss */ "./style/index.scss");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_index_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../api/index */ "./api/index.js");

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-V\\pages\\zt.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import  {useState} from 'react'








class Index extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  static async getInitialProps({
    query
  }) {
    const detail = await Object(_api_index__WEBPACK_IMPORTED_MODULE_7__["getDetail"])({
      id: query.id
    });
    return {
      detail: detail.code === 200 ? detail.data : {},
      query
    };
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "onRef", ref => {
      this.CommomBus = ref;
    });

    console.log(props);
    this.state = {
      isShowCom: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isShowCom: true
      });
    }, 3000);
  } // 跳转


  navigateToComBUs(url, type) {
    this.CommomBus.navigateTo(url, type);
  }

  renderComBus() {
    const CommomBus = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./../components/commomBus/index */ "./components/commomBus/index.js")), {
      loadableGenerated: {
        webpack: () => [/*require.resolve*/(/*! ./../components/commomBus/index */ "./components/commomBus/index.js")],
        modules: ['./../components/commomBus/index']
      }
    });
    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(CommomBus, {
      onRef: this.onRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 12
    }, this);
  }

  showTeamplate(data) {
    const bus = {
      navigateTo: (url, type) => this.navigateToComBUs(url, type)
    };

    switch (data.name) {
      case 'jm-banner':
        {
          return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_banner_index__WEBPACK_IMPORTED_MODULE_5__["default"], _objectSpread(_objectSpread({}, data), bus), data.uuid, false, {
            fileName: _jsxFileName,
            lineNumber: 46,
            columnNumber: 16
          }, this);
        }

      default:
        {
          return '';
        }
    }
  } // 利用子组件跳转


  render() {
    const {
      isShowCom
    } = this.state;
    const {
      query,
      detail
    } = this.props;
    const showPage = !detail || !query.id;

    if (!showPage) {
      const {
        pages
      } = detail;
      const content = pages.content || [];
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "page-box",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_head_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
          title: detail.title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 11
        }, this), isShowCom && this.renderComBus(), content && content.map((item, i) => {
          return this.showTeamplate(item);
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, this);
    } else {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "no-data",
        children: "\u6570\u636E\u52A0\u8F7D\u51FA\u9519\uFF01~~"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
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

/***/ "next/dynamic":
/*!*******************************!*\
  !*** external "next/dynamic" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

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

/***/ }),

/***/ "weixin-js-sdk":
/*!********************************!*\
  !*** external "weixin-js-sdk" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("weixin-js-sdk");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVhZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy96dC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9odHRwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFudGQtbW9iaWxlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2R5bmFtaWNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlaXhpbi1qcy1zZGtcIiJdLCJuYW1lcyI6WyJnZXREZXRhaWwiLCJkYXRhIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInBhcmFtcyIsIkJhbm5lciIsInByb3BzIiwiaGFuZGxlQ2xpY2siLCJqdW1wVHlwZSIsInByb2R1Y3RDb2RlIiwibmF2aWdhdGVUbyIsInNwZWNpYWxJZCIsImxpbmsiLCJlbmNvZGVVUklDb21wb25lbnQiLCJidXNpbmVzc0RhdGEiLCJpdGVtcyIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJpIiwiaW1hZ2UiLCJNeUhlYWQiLCJ0aXRsZSIsIkluZGV4IiwiUmVhY3QiLCJDb21wb25lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJxdWVyeSIsImRldGFpbCIsImlkIiwiY29kZSIsImNvbnN0cnVjdG9yIiwicmVmIiwiQ29tbW9tQnVzIiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiaXNTaG93Q29tIiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRUaW1lb3V0Iiwic2V0U3RhdGUiLCJuYXZpZ2F0ZVRvQ29tQlVzIiwidHlwZSIsInJlbmRlckNvbUJ1cyIsImR5bmFtaWMiLCJvblJlZiIsInNob3dUZWFtcGxhdGUiLCJidXMiLCJuYW1lIiwidXVpZCIsInJlbmRlciIsInNob3dQYWdlIiwicGFnZXMiLCJjb250ZW50IiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInVzZSIsImNvbmZpZyIsImVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc3BvbnNlIiwicmVzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQTtRQUNBLG1DQUFtQztRQUNuQztRQUNBO1FBQ0E7UUFDQTtRQUNBLGtCQUFrQixxQkFBcUI7UUFDdkM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFB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R0FBUDtBQUNILEdBRk0sTUFFQTtBQUNILFdBQU9ILE9BQU8sQ0FBQ0MsTUFBUixDQUFlRSxHQUFmLENBQVA7QUFDSDtBQUNKLENBVkQsRUFVRyxVQUFVSixLQUFWLEVBQWlCO0FBQ2pCO0FBQ0EsU0FBT0MsT0FBTyxDQUFDQyxNQUFSLENBQWVGLEtBQWYsQ0FBUDtBQUNGLENBYkQ7QUFlZTVELHNFQUFmLEU7Ozs7Ozs7Ozs7O0FDaENBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLDBDIiwiZmlsZSI6InBhZ2VzL3p0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicGFnZXMvenRcIjogMFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gcmVxdWlyZSgpIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSAwKSB7XG4gXHRcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4uL1wiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyB1bmNhdWdodCBlcnJvciBoYW5kbGVyIGZvciB3ZWJwYWNrIHJ1bnRpbWVcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHtcbiBcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiBcdFx0XHR0aHJvdyBlcnI7IC8vIGNhdGNoIHRoaXMgZXJyb3IgYnkgdXNpbmcgaW1wb3J0KCkuY2F0Y2goKVxuIFx0XHR9KTtcbiBcdH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvenQuanNcIik7XG4iLCJpbXBvcnQgcmVxdWVzdCBmcm9tICcuLy4uL3V0aWxzL2h0dHAnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGV0YWlsKGRhdGEpIHtcclxuICByZXR1cm4gcmVxdWVzdCh7XHJcbiAgICB1cmw6ICcvam0vZGV0YWlsJyxcclxuICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICBwYXJhbXM6IGRhdGFcclxufSlcclxufSIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IENhcm91c2VsIH0gZnJvbSAnYW50ZC1tb2JpbGUnXHJcblxyXG4vLyBpbXBvcnQgd3ggZnJvbSAnd2VpeGluLWpzLXNkaydcclxuXHJcbmltcG9ydCAnLi9pbmRleC5zY3NzJ1xyXG5cclxuY29uc3QgQmFubmVyID0gKHByb3BzKSA9PiB7XHJcbiAgLy8g5aSE55CG54K55Ye7XHJcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZGF0YSkgPT4ge1xyXG4gICAgLy8gIDDvvJrllYblk4HvvIwx77ya5LiT6aKY77yMMu+8mua0u+WKqO+8jDPvvJrpk77mjqXvvIw077ya5peg6Lez6L2sXHJcbiAgICBzd2l0Y2ggKGRhdGEuanVtcFR5cGUgKyAnJykge1xyXG4gICAgICBjYXNlICcwJzoge1xyXG4gICAgICAgIGlmIChkYXRhLnByb2R1Y3RDb2RlKSB7XHJcbiAgICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvcHJvZHVjdERldGFpbC9wcm9kdWN0RGV0YWlsP3RhcmdldElkPScgKyBkYXRhLnByb2R1Y3RDb2RlIClcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnMSc6IHtcclxuICAgICAgICBpZiAoZGF0YS5zcGVjaWFsSWQpIHtcclxuICAgICAgICAgIHByb3BzLm5hdmlnYXRlVG8oJy9wYWdlcy9pbmRleC9hY3Rpdml0eS9wcm9kdWN0TGlzdD90eXBlPTImdGlkPScgKyBkYXRhLnNwZWNpYWxJZClcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnMic6IHtcclxuICAgICAgICAvLyBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvcHJvZHVjdERldGFpbC9wcm9kdWN0RGV0YWlsP3RhcmdldElkPTE4Njc5MicpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnMyc6IHtcclxuICAgICAgICBpZiAoZGF0YS5saW5rKSB7XHJcbiAgICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvd2Vic2l0ZS93ZWJzaXRlP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEubGluaykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBidXNpbmVzc0RhdGEgfSA9IHByb3BzXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWJveFwiPlxyXG4gICAgICA8Q2Fyb3VzZWwgXHJcbiAgICAgIGF1dG9wbGF5PXt0cnVlfVxyXG4gICAgICBpbmZpbml0ZVxyXG4gICAgICBkb3RzPXtidXNpbmVzc0RhdGEuaXRlbXMgJiYgYnVzaW5lc3NEYXRhLml0ZW1zLmxlbmd0aCA+IDF9XHJcbiAgICAgIGF1dG9wbGF5SW50ZXJ2YWw9ezMwMDB9XHJcbiAgICAgID4gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnVzaW5lc3NEYXRhICYmIGJ1c2luZXNzRGF0YS5pdGVtcyAmJiBidXNpbmVzc0RhdGEuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWl0ZW1cIiBrZXk9e2l9IG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGl0ZW0pfT5cclxuICAgICAgICAgICAgICAgICA8aW1nIHNyYz17aXRlbS5pbWFnZX0gLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICA8L0Nhcm91c2VsPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYW5uZXIiLCJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXHJcblxyXG5jb25zdCBNeUhlYWQgPSAocHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPEhlYWQ+XHJcbiAgICAgIDx0aXRsZT57cHJvcHMudGl0bGV9PC90aXRsZT5cclxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cImluaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGhcIiAvPlxyXG4gICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9jZG4uYm9vdGNzcy5jb20vYW50ZC1tb2JpbGUvMi4xLjEvYW50ZC1tb2JpbGUuY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XHJcbiAgICAgIHsvKiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJodHRwczovL3Jlcy53eC5xcS5jb20vb3Blbi9qcy9qd2VpeGluLTEuMy4yLmpzXCI+PC9zY3JpcHQ+ICovfVxyXG4gICAgPC9IZWFkPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlIZWFkXHJcbiAiLCJcclxuLy8gaW1wb3J0ICB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBkeW5hbWljIGZyb20gJ25leHQvZHluYW1pYydcclxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICdhbnRkLW1vYmlsZSdcclxuXHJcbmltcG9ydCBIZWFkIGZyb20gJy4vLi4vY29tcG9uZW50cy9oZWFkL2luZGV4J1xyXG5pbXBvcnQgQmFubmVyIGZyb20gJy4vLi4vY29tcG9uZW50cy9iYW5uZXIvaW5kZXgnXHJcblxyXG5cclxuaW1wb3J0ICAnLi8uLi9zdHlsZS9pbmRleC5zY3NzJ1xyXG5cclxuaW1wb3J0IHsgZ2V0RGV0YWlsIH0gZnJvbSAnLi8uLi9hcGkvaW5kZXgnXHJcblxyXG5jbGFzcyBJbmRleCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyh7IHF1ZXJ5IH0pIHtcclxuICAgIGNvbnN0IGRldGFpbCA9IGF3YWl0IGdldERldGFpbCh7IGlkOiBxdWVyeS5pZCB9KVxyXG4gICAgcmV0dXJuIHsgZGV0YWlsOiBkZXRhaWwuY29kZSA9PT0gMjAwID8gZGV0YWlsLmRhdGEgOiB7fSwgcXVlcnkgfVxyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIGNvbnNvbGUubG9nKHByb3BzKVxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgaXNTaG93Q29tOiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNTaG93Q29tOiB0cnVlIH0pXHJcbiAgICB9LCAzMDAwKVxyXG4gIH1cclxuICAvLyDot7PovaxcclxuICBuYXZpZ2F0ZVRvQ29tQlVzKHVybCwgdHlwZSkge1xyXG4gICAgdGhpcy5Db21tb21CdXMubmF2aWdhdGVUbyh1cmwsIHR5cGUpXHJcbiAgfVxyXG4gIHJlbmRlckNvbUJ1cygpIHtcclxuICAgIGNvbnN0IENvbW1vbUJ1cyA9IGR5bmFtaWMoaW1wb3J0KCcuLy4uL2NvbXBvbmVudHMvY29tbW9tQnVzL2luZGV4JykpXHJcbiAgICByZXR1cm4gPENvbW1vbUJ1cyBvblJlZj17dGhpcy5vblJlZn0gLz5cclxuICB9XHJcbiAgc2hvd1RlYW1wbGF0ZShkYXRhKSB7XHJcbiAgICBjb25zdCBidXMgPSB7XHJcbiAgICAgIG5hdmlnYXRlVG86ICh1cmwsIHR5cGUpID0+IHRoaXMubmF2aWdhdGVUb0NvbUJVcyh1cmwsIHR5cGUpXHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKGRhdGEubmFtZSkge1xyXG4gICAgICBjYXNlICdqbS1iYW5uZXInOiB7XHJcbiAgICAgICAgcmV0dXJuIDxCYW5uZXIga2V5PXtkYXRhLnV1aWR9IHsuLi5kYXRhfSB7Li4uYnVzfSAvPlxyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHsgXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8g5Yip55So5a2Q57uE5Lu26Lez6L2sXHJcbiAgb25SZWYgPSAocmVmKSA9PiB7XHJcbiAgICB0aGlzLkNvbW1vbUJ1cyA9IHJlZlxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlzU2hvd0NvbSB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgY29uc3QgeyBxdWVyeSwgZGV0YWlsIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaG93UGFnZSA9ICFkZXRhaWwgfHwgIXF1ZXJ5LmlkXHJcbiAgICBpZiAoIXNob3dQYWdlKSB7XHJcbiAgICAgIGNvbnN0IHsgcGFnZXMgfSA9IGRldGFpbFxyXG4gICAgICBjb25zdCBjb250ZW50ID0gcGFnZXMuY29udGVudCB8fCBbXVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYWdlLWJveCc+XHJcbiAgICAgICAgICA8SGVhZCB0aXRsZT17ZGV0YWlsLnRpdGxlfT48L0hlYWQ+XHJcbiAgICAgICAgICB7aXNTaG93Q29tICYmIHRoaXMucmVuZGVyQ29tQnVzKCl9XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgJiYgY29udGVudC5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93VGVhbXBsYXRlKGl0ZW0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5vLWRhdGFcIj7mlbDmja7liqDovb3lh7rplJnvvIF+fjwvZGl2PlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJbmRleCIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuXHJcbmNvbnN0IHJlcXVlc3QgPSBheGlvcy5jcmVhdGUoe1xyXG4gICAgYmFzZVVSTDogJ2h0dHA6Ly9jaGlta2UuY246ODA4OCcsXHJcbiAgICB0aW1lb3V0OiAyMDAwMFxyXG59KVxyXG4vLyDmt7vliqDor7fmsYLmi6bmiKrlmahcclxucmVxdWVzdC5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgLy8g5Zyo5Y+R6YCB6K+35rGC5LmL5YmN5YGa5Lqb5LuA5LmIXHJcbiAgICAgICAvLyBjb25maWcuaGVhZGVycy50b2tlbiA9IGAke3Rva2VufWBcclxuICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAvLyDlr7nor7fmsYLplJnor6/lgZrkupvku4DkuYhcclxuICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxufSlcclxuXHJcbi8vIOa3u+WKoOWTjeW6lOaLpuaIquWZqFxyXG5yZXF1ZXN0LmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAvLyDlr7nlk43lupTmlbDmja7lgZrngrnku4DkuYhcclxuICAgIGNvbnN0IHJlcyA9IHJlc3BvbnNlLmRhdGFcclxuICAgIGlmIChyZXMuY29kZSA9PT0gNDAxKSB7IC8vIOacqueZu+W9lVxyXG5cclxuICAgIH0gZWxzZSBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlcylcclxuICAgIH1cclxufSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgIC8vIOWvueWTjeW6lOmUmeivr+WBmueCueS7gOS5iFxyXG4gICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFudGQtbW9iaWxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZHluYW1pY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlaXhpbi1qcy1zZGtcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==