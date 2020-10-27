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

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-h5\\components\\banner\\index.js";

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

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-h5\\components\\head\\index.js";


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
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("script", {
      type: "text/javascript",
      src: "//at.alicdn.com/t/font_813394_ooixss60lmp.js"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
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

/***/ "./components/products/index.js":
/*!**************************************!*\
  !*** ./components/products/index.js ***!
  \**************************************/
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
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./components/products/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-h5\\components\\products\\index.js";

 // import wx from 'weixin-js-sdk'



const Products = props => {
  // 抄底三列
  const productType1 = () => {
    const target = props.businessData;
    const product = target.product || [];
    const style = {
      backgroundColor: target.wrapperBgColor
    };
    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
      className: "product-box product-box-I",
      style: style,
      children: product.map((item, i) => {
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "product-box-I-item",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
            src: item.imageUrl
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 22,
            columnNumber: 15
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
            className: "name",
            children: item.name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 15
          }, undefined)]
        }, i, true, {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 13
        }, undefined);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }, undefined);
  };

  return productType1();
};

/* harmony default export */ __webpack_exports__["default"] = (Products);

/***/ }),

/***/ "./components/products/index.scss":
/*!****************************************!*\
  !*** ./components/products/index.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var _components_products_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../components/products/index */ "./components/products/index.js");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../style/index.scss */ "./style/index.scss");
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_index_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _api_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../api/index */ "./api/index.js");

var _jsxFileName = "D:\\\u5353\u5FD7\\web\\study\\jm-next-h5\\pages\\zt.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import  {useState} from 'react'









class Index extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  static async getInitialProps({
    query
  }) {
    const detail = await Object(_api_index__WEBPACK_IMPORTED_MODULE_8__["getDetail"])({
      id: query.id
    });
    return {
      detail: detail.code === 200 ? detail.data : null,
      query,
      loading: true
    };
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "onRef", ref => {
      this.CommomBus = ref;
    });

    this.state = {
      isShowCom: false
    };
  }

  componentDidMount() {
    // 延时加载微信jsdk, 保证window存在
    setTimeout(() => {
      this.setState({
        isShowCom: true
      });
    }, 1500);
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
      lineNumber: 39,
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
            lineNumber: 47,
            columnNumber: 16
          }, this);
        }

      case 'jm-products':
        {
          return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_products_index__WEBPACK_IMPORTED_MODULE_6__["default"], _objectSpread(_objectSpread({}, data), bus), data.uuid, false, {
            fileName: _jsxFileName,
            lineNumber: 50,
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
      isShowCom,
      loading,
      loadingText
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
          lineNumber: 70,
          columnNumber: 11
        }, this), isShowCom && this.renderComBus(), content && content.map((item, i) => {
          return this.showTeamplate(item);
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, this);
    } else if (!loading) {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "no-data",
        children: "\u8F7D\u5165\u4E2D..."
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 15
      }, this);
    } else {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "no-data",
        children: "\u6570\u636E\u52A0\u8F7D\u51FA\u9519\uFF01~~"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVhZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Byb2R1Y3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3BhZ2VzL3p0LmpzIiwid2VicGFjazovLy8uL3V0aWxzL2h0dHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW50ZC1tb2JpbGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZHluYW1pY1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2VpeGluLWpzLXNka1wiIl0sIm5hbWVzIjpbImdldERldGFpbCIsImRhdGEiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwicGFyYW1zIiwiQmFubmVyIiwicHJvcHMiLCJoYW5kbGVDbGljayIsImp1bXBUeXBlIiwicHJvZHVjdENvZGUiLCJuYXZpZ2F0ZVRvIiwic3BlY2lhbElkIiwibGluayIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ1c2luZXNzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImkiLCJpbWFnZSIsIk15SGVhZCIsInRpdGxlIiwiUHJvZHVjdHMiLCJwcm9kdWN0VHlwZTEiLCJ0YXJnZXQiLCJwcm9kdWN0Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ3cmFwcGVyQmdDb2xvciIsImltYWdlVXJsIiwibmFtZSIsIkluZGV4IiwiUmVhY3QiLCJDb21wb25lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJxdWVyeSIsImRldGFpbCIsImlkIiwiY29kZSIsImxvYWRpbmciLCJjb25zdHJ1Y3RvciIsInJlZiIsIkNvbW1vbUJ1cyIsInN0YXRlIiwiaXNTaG93Q29tIiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRUaW1lb3V0Iiwic2V0U3RhdGUiLCJuYXZpZ2F0ZVRvQ29tQlVzIiwidHlwZSIsInJlbmRlckNvbUJ1cyIsImR5bmFtaWMiLCJvblJlZiIsInNob3dUZWFtcGxhdGUiLCJidXMiLCJ1dWlkIiwicmVuZGVyIiwibG9hZGluZ1RleHQiLCJzaG93UGFnZSIsInBhZ2VzIiwiY29udGVudCIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJpbnRlcmNlcHRvcnMiLCJ1c2UiLCJjb25maWciLCJlcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsInJlcyJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0E7UUFDQSxtQ0FBbUM7UUFDbkM7UUFDQTtRQUNBO1FBQ0E7UUFDQSxrQkFBa0IscUJBQXFCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QUNELFNBQU9DLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRixLQUFmLENBQVA7QUFDTixDQVBELEUsQ0FTQTs7QUFDQXBFLE9BQU8sQ0FBQ2lFLFlBQVIsQ0FBcUJNLFFBQXJCLENBQThCTCxHQUE5QixDQUFrQyxVQUFVSyxRQUFWLEVBQW9CO0FBQ2xEO0FBQ0EsUUFBTUMsR0FBRyxHQUFHRCxRQUFRLENBQUN4RSxJQUFyQjs7QUFDQSxNQUFJeUUsR0FBRyxDQUFDbEMsSUFBSixLQUFhLEdBQWpCLEVBQXNCLENBQUU7QUFFdkIsR0FGRCxNQUVPLElBQUlrQyxHQUFHLENBQUNsQyxJQUFKLEtBQWEsR0FBakIsRUFBc0I7QUFDekIsV0FBT2tDLEdBQVA7QUFDSCxHQUZNLE1BRUE7QUFDSCxXQUFPSCxPQUFPLENBQUNDLE1BQVIsQ0FBZUUsR0FBZixDQUFQO0FBQ0g7QUFDSixDQVZELEVBVUcsVUFBVUosS0FBVixFQUFpQjtBQUNqQjtBQUNBLFNBQU9DLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRixLQUFmLENBQVA7QUFDRixDQWJEO0FBZWVwRSxzRUFBZixFOzs7Ozs7Ozs7OztBQ2hDQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSwwQyIsImZpbGUiOiJwYWdlcy96dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBhZ2VzL3p0XCI6IDBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIHJlcXVpcmUoKSBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gMCkge1xuIFx0XHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuLi9cIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiKTtcbiBcdFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBjaHVuay5tb2R1bGVzLCBjaHVua0lkcyA9IGNodW5rLmlkcztcbiBcdFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gdW5jYXVnaHQgZXJyb3IgaGFuZGxlciBmb3Igd2VicGFjayBydW50aW1lXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7XG4gXHRcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gXHRcdFx0dGhyb3cgZXJyOyAvLyBjYXRjaCB0aGlzIGVycm9yIGJ5IHVzaW5nIGltcG9ydCgpLmNhdGNoKClcbiBcdFx0fSk7XG4gXHR9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL3p0LmpzXCIpO1xuIiwiaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi8uLi91dGlscy9odHRwJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERldGFpbChkYXRhKSB7XHJcbiAgcmV0dXJuIHJlcXVlc3Qoe1xyXG4gICAgdXJsOiAnL2ptL2RldGFpbCcsXHJcbiAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgcGFyYW1zOiBkYXRhXHJcbn0pXHJcbn0iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDYXJvdXNlbCB9IGZyb20gJ2FudGQtbW9iaWxlJ1xyXG5cclxuLy8gaW1wb3J0IHd4IGZyb20gJ3dlaXhpbi1qcy1zZGsnXHJcblxyXG5pbXBvcnQgJy4vaW5kZXguc2NzcydcclxuXHJcbmNvbnN0IEJhbm5lciA9IChwcm9wcykgPT4ge1xyXG4gIC8vIOWkhOeQhueCueWHu1xyXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGRhdGEpID0+IHtcclxuICAgIC8vICAw77ya5ZWG5ZOB77yMMe+8muS4k+mimO+8jDLvvJrmtLvliqjvvIwz77ya6ZO+5o6l77yMNO+8muaXoOi3s+i9rFxyXG4gICAgc3dpdGNoIChkYXRhLmp1bXBUeXBlICsgJycpIHtcclxuICAgICAgY2FzZSAnMCc6IHtcclxuICAgICAgICBpZiAoZGF0YS5wcm9kdWN0Q29kZSkge1xyXG4gICAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0nICsgZGF0YS5wcm9kdWN0Q29kZSApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzEnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3BlY2lhbElkKSB7XHJcbiAgICAgICAgICBwcm9wcy5uYXZpZ2F0ZVRvKCcvcGFnZXMvaW5kZXgvYWN0aXZpdHkvcHJvZHVjdExpc3Q/dHlwZT0yJnRpZD0nICsgZGF0YS5zcGVjaWFsSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzInOiB7XHJcbiAgICAgICAgLy8gcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3Byb2R1Y3REZXRhaWwvcHJvZHVjdERldGFpbD90YXJnZXRJZD0xODY3OTInKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJzMnOiB7XHJcbiAgICAgICAgaWYgKGRhdGEubGluaykge1xyXG4gICAgICAgICAgcHJvcHMubmF2aWdhdGVUbygnL3BhZ2VzL2luZGV4L3dlYnNpdGUvd2Vic2l0ZT91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhLmxpbmspKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHsgYnVzaW5lc3NEYXRhIH0gPSBwcm9wc1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1ib3hcIj5cclxuICAgICAgPENhcm91c2VsIFxyXG4gICAgICBhdXRvcGxheT17dHJ1ZX1cclxuICAgICAgaW5maW5pdGVcclxuICAgICAgZG90cz17YnVzaW5lc3NEYXRhLml0ZW1zICYmIGJ1c2luZXNzRGF0YS5pdGVtcy5sZW5ndGggPiAxfVxyXG4gICAgICBhdXRvcGxheUludGVydmFsPXszMDAwfVxyXG4gICAgICA+IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJ1c2luZXNzRGF0YSAmJiBidXNpbmVzc0RhdGEuaXRlbXMgJiYgYnVzaW5lc3NEYXRhLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1pdGVtXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGljayhpdGVtKX0+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2l0ZW0uaW1hZ2V9IC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICApXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgPC9DYXJvdXNlbD5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFubmVyIiwiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5cclxuY29uc3QgTXlIZWFkID0gKHByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxIZWFkPlxyXG4gICAgICA8dGl0bGU+e3Byb3BzLnRpdGxlfTwvdGl0bGU+XHJcbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJpbml0aWFsLXNjYWxlPTEuMCwgd2lkdGg9ZGV2aWNlLXdpZHRoXCIgLz5cclxuICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vY2RuLmJvb3Rjc3MuY29tL2FudGQtbW9iaWxlLzIuMS4xL2FudGQtbW9iaWxlLmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxyXG4gICAgICB7LyogPGxpbmsgaHJlZj1cIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfODEzMzk0X29vaXhzczYwbG1wLmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPiAqL31cclxuICAgICAgPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiLy9hdC5hbGljZG4uY29tL3QvZm9udF84MTMzOTRfb29peHNzNjBsbXAuanNcIj48L3NjcmlwdD5cclxuICAgIDwvSGVhZD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15SGVhZFxyXG4gIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgQ2Fyb3VzZWwgfSBmcm9tICdhbnRkLW1vYmlsZSdcclxuXHJcbi8vIGltcG9ydCB3eCBmcm9tICd3ZWl4aW4tanMtc2RrJ1xyXG5cclxuaW1wb3J0ICcuL2luZGV4LnNjc3MnXHJcblxyXG5jb25zdCBQcm9kdWN0cyA9IChwcm9wcykgPT4ge1xyXG4gLy8g5oqE5bqV5LiJ5YiXXHJcbiBjb25zdCBwcm9kdWN0VHlwZTEgPSAoKSA9PiB7XHJcbiAgIGNvbnN0IHRhcmdldCA9IHByb3BzLmJ1c2luZXNzRGF0YVxyXG4gICBjb25zdCBwcm9kdWN0ID0gdGFyZ2V0LnByb2R1Y3QgfHwgW11cclxuICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgYmFja2dyb3VuZENvbG9yOiB0YXJnZXQud3JhcHBlckJnQ29sb3JcclxuICAgfVxyXG4gICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwcm9kdWN0LWJveCBwcm9kdWN0LWJveC1JXCIgc3R5bGU9e3N0eWxlfT5cclxuICAgICAge1xyXG4gICAgICAgICBwcm9kdWN0Lm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZHVjdC1ib3gtSS1pdGVtXCIga2V5PXtpfT5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17aXRlbS5pbWFnZVVybH0gLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICApXHJcbiAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIDwvZGl2PlxyXG4gICApXHJcbiB9XHJcblxyXG4gcmV0dXJuIHByb2R1Y3RUeXBlMSgpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzIiwiXHJcbi8vIGltcG9ydCAge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXHJcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnYW50ZC1tb2JpbGUnXHJcblxyXG5pbXBvcnQgSGVhZCBmcm9tICcuLy4uL2NvbXBvbmVudHMvaGVhZC9pbmRleCdcclxuaW1wb3J0IEJhbm5lciBmcm9tICcuLy4uL2NvbXBvbmVudHMvYmFubmVyL2luZGV4J1xyXG5pbXBvcnQgUHJvZHVjdHMgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2R1Y3RzL2luZGV4J1xyXG5cclxuXHJcbmltcG9ydCAgJy4vLi4vc3R5bGUvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGdldERldGFpbCB9IGZyb20gJy4vLi4vYXBpL2luZGV4J1xyXG5cclxuY2xhc3MgSW5kZXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoeyBxdWVyeSB9KSB7XHJcbiAgICBjb25zdCBkZXRhaWwgPSBhd2FpdCBnZXREZXRhaWwoeyBpZDogcXVlcnkuaWQgfSlcclxuICAgIHJldHVybiB7IGRldGFpbDogZGV0YWlsLmNvZGUgPT09IDIwMCA/IGRldGFpbC5kYXRhIDogbnVsbCwgcXVlcnksIGxvYWRpbmc6IHRydWUgfVxyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzU2hvd0NvbTogZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAvLyDlu7bml7bliqDovb3lvq7kv6Fqc2RrLCDkv53or4F3aW5kb3flrZjlnKhcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNTaG93Q29tOiB0cnVlIH0pXHJcbiAgICB9LCAxNTAwKVxyXG4gIH1cclxuICAvLyDot7PovaxcclxuICBuYXZpZ2F0ZVRvQ29tQlVzKHVybCwgdHlwZSkge1xyXG4gICAgdGhpcy5Db21tb21CdXMubmF2aWdhdGVUbyh1cmwsIHR5cGUpXHJcbiAgfVxyXG4gIHJlbmRlckNvbUJ1cygpIHtcclxuICAgIGNvbnN0IENvbW1vbUJ1cyA9IGR5bmFtaWMoaW1wb3J0KCcuLy4uL2NvbXBvbmVudHMvY29tbW9tQnVzL2luZGV4JykpXHJcbiAgICByZXR1cm4gPENvbW1vbUJ1cyBvblJlZj17dGhpcy5vblJlZn0gLz5cclxuICB9XHJcbiAgc2hvd1RlYW1wbGF0ZShkYXRhKSB7XHJcbiAgICBjb25zdCBidXMgPSB7XHJcbiAgICAgIG5hdmlnYXRlVG86ICh1cmwsIHR5cGUpID0+IHRoaXMubmF2aWdhdGVUb0NvbUJVcyh1cmwsIHR5cGUpXHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKGRhdGEubmFtZSkge1xyXG4gICAgICBjYXNlICdqbS1iYW5uZXInOiB7XHJcbiAgICAgICAgcmV0dXJuIDxCYW5uZXIga2V5PXtkYXRhLnV1aWR9IHsuLi5kYXRhfSB7Li4uYnVzfSAvPlxyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2ptLXByb2R1Y3RzJzoge1xyXG4gICAgICAgIHJldHVybiA8UHJvZHVjdHMga2V5PXtkYXRhLnV1aWR9IHsuLi5kYXRhfSB7Li4uYnVzfSAvPlxyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHsgXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8g5Yip55So5a2Q57uE5Lu26Lez6L2sXHJcbiAgb25SZWYgPSAocmVmKSA9PiB7XHJcbiAgICB0aGlzLkNvbW1vbUJ1cyA9IHJlZlxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlzU2hvd0NvbSwgbG9hZGluZywgbG9hZGluZ1RleHQgfSA9IHRoaXMuc3RhdGVcclxuICAgIGNvbnN0IHsgcXVlcnksIGRldGFpbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2hvd1BhZ2UgPSAhZGV0YWlsIHx8ICFxdWVyeS5pZFxyXG4gICAgaWYgKCFzaG93UGFnZSkge1xyXG4gICAgICBjb25zdCB7IHBhZ2VzIH0gPSBkZXRhaWxcclxuICAgICAgY29uc3QgY29udGVudCA9IHBhZ2VzLmNvbnRlbnQgfHwgW11cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFnZS1ib3gnPlxyXG4gICAgICAgICAgPEhlYWQgdGl0bGU9e2RldGFpbC50aXRsZX0+PC9IZWFkPlxyXG4gICAgICAgICAge2lzU2hvd0NvbSAmJiB0aGlzLnJlbmRlckNvbUJ1cygpfVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZW50ICYmIGNvbnRlbnQubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1RlYW1wbGF0ZShpdGVtKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApXHJcbiAgICB9IGVsc2UgaWYgKCFsb2FkaW5nKSB7XHJcbiAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJuby1kYXRhXCI+XHJcbiAgICAgICAg6L295YWl5LitLi4uXHJcbiAgICAgICAgPC9kaXY+KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibm8tZGF0YVwiPuaVsOaNruWKoOi9veWHuumUme+8gX5+PC9kaXY+XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5cclxuY29uc3QgcmVxdWVzdCA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBiYXNlVVJMOiAnaHR0cDovL2NoaW1rZS5jbjo4MDg4JyxcclxuICAgIHRpbWVvdXQ6IDIwMDAwXHJcbn0pXHJcbi8vIOa3u+WKoOivt+axguaLpuaIquWZqFxyXG5yZXF1ZXN0LmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAvLyDlnKjlj5HpgIHor7fmsYLkuYvliY3lgZrkupvku4DkuYhcclxuICAgICAgIC8vIGNvbmZpZy5oZWFkZXJzLnRva2VuID0gYCR7dG9rZW59YFxyXG4gICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIC8vIOWvueivt+axgumUmeivr+WBmuS6m+S7gOS5iFxyXG4gICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKVxyXG59KVxyXG5cclxuLy8g5re75Yqg5ZON5bqU5oum5oiq5ZmoXHJcbnJlcXVlc3QuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgIC8vIOWvueWTjeW6lOaVsOaNruWBmueCueS7gOS5iFxyXG4gICAgY29uc3QgcmVzID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgaWYgKHJlcy5jb2RlID09PSA0MDEpIHsgLy8g5pyq55m75b2VXHJcblxyXG4gICAgfSBlbHNlIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzKVxyXG4gICAgfVxyXG59LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgLy8g5a+55ZON5bqU6ZSZ6K+v5YGa54K55LuA5LmIXHJcbiAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW50ZC1tb2JpbGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9keW5hbWljXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VpeGluLWpzLXNka1wiKTsiXSwic291cmNlUm9vdCI6IiJ9