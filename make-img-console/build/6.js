(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{153:function(e,t,r){"use strict";r.d(t,"d",(function(){return l})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return s})),r.d(t,"e",(function(){return c})),r.d(t,"b",(function(){return m}));var n=r(420),a=r.n(n).a.create({baseURL:"",timeout:2e4});a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),a.interceptors.response.use((function(e){var t=e.data;if(401!==t.code)return 200===t.code?t:Promise.reject(t)}),(function(e){return Promise.reject(e)}));var o=a;function l(e){return o({url:"/api/makeimg/save",method:"post",data:e})}function i(e){return o({url:"/api/makeimg/list",method:"post",data:e})}function s(e){return o({url:"/api/makeimg/delete",method:"post",data:e})}function c(e){return o({url:"/api/makeimg/update",method:"post",data:e})}function m(e){return o({url:"/api/makeimg/detail",method:"get",params:e})}},363:function(e,t,r){var n=r(56),a=r(442);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o,l=n(a,{insert:"head",singleton:!1});a.locals&&!e.hot.invalidate||(o=a.locals,e.hot.accept(442,(function(){"string"==typeof(a=(a=r(442)).__esModule?a.default:a)&&(a=[[e.i,a,""]]),function(e,t){if(!e&&t||e&&!t)return!1;var r;for(r in e)if(e[r]!==t[r])return!1;for(r in t)if(!e[r])return!1;return!0}(o,a.locals)?(o=a.locals,l(a)):e.hot.invalidate()}))),e.hot.dispose((function(){l()})),e.exports=a.locals||{}},424:function(e,t,r){"use strict";var n=r(0),a=r.n(n);r(675),t.a=function(e){var t=e.name;return a.a.createElement("div",{className:"badge-box"},a.a.createElement("div",{class:"space-label"},a.a.createElement("div",{class:"top"},a.a.createElement("div",{class:"ring"}),a.a.createElement("div",{class:"ring"}),a.a.createElement("div",{class:"ring"})),a.a.createElement("div",{class:"text"},t||"新建图片"),a.a.createElement("div",{class:"bottom"},a.a.createElement("div",{class:"ring"}),a.a.createElement("div",{class:"ring"}),a.a.createElement("div",{class:"ring"}))))}},427:function(e,t,r){"use strict";r.r(t);var n=r(36),a=r.n(n)()(!1);a.push([e.i,"*{box-sizing:border-box}.badge-box{position:absolute;top:-30px;right:0;width:280px;height:170px;transform:scale(0.7) rotate(-30deg);background-color:#ffffff}.space-label{width:280px;margin:0 auto;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);background-color:ffffff}.space-label .top,.space-label .bottom{height:60px;overflow:hidden;position:relative;width:170px;margin:0 auto}.space-label .top .ring,.space-label .bottom .ring{border-radius:100%;position:absolute;width:170px;height:170px;border:3px solid #14456a;border-width:8px}.space-label .top .ring:nth-child(2),.space-label .bottom .ring:nth-child(2){border-width:4px;width:154px}.space-label .top .ring:nth-child(3),.space-label .bottom .ring:nth-child(3){border-width:2px;width:139px}.space-label .top .ring:nth-child(3):after,.space-label .bottom .ring:nth-child(3):after{content:'';width:18px;position:absolute;border-top:1px solid #14456a;left:50%;margin-left:-9px}.space-label .top .ring:nth-child(3):before,.space-label .bottom .ring:nth-child(3):before{content:'';width:32px;position:absolute;border-top:1px solid #14456a;margin-left:-16px;left:50%}.space-label .top .ring:nth-child(1){top:0;left:0}.space-label .top .ring:nth-child(2){top:10px;left:8px}.space-label .top .ring:nth-child(3){top:20px;left:16px}.space-label .top .ring:nth-child(3):after{top:17px}.space-label .top .ring:nth-child(3):before{top:22px}.space-label .bottom .ring:nth-child(1){bottom:0;left:0}.space-label .bottom .ring:nth-child(2){bottom:10px;left:8px}.space-label .bottom .ring:nth-child(3){bottom:20px;left:16px}.space-label .bottom .ring:nth-child(3):after{bottom:17px}.space-label .bottom .ring:nth-child(3):before{bottom:22px}.space-label .text{text-align:center;text-transform:uppercase;font-family:'Raleway', sans-serif;font-size:24px;font-weight:700;color:#14456a;height:55px;vertical-align:middle;display:table-cell;width:170px;position:relative;left:57px;letter-spacing:14px;background-color:#ffffff}\n",""]),t.default=a},428:function(e,t,r){var n={"./af":228,"./af.js":228,"./ar":229,"./ar-dz":230,"./ar-dz.js":230,"./ar-kw":231,"./ar-kw.js":231,"./ar-ly":232,"./ar-ly.js":232,"./ar-ma":233,"./ar-ma.js":233,"./ar-sa":234,"./ar-sa.js":234,"./ar-tn":235,"./ar-tn.js":235,"./ar.js":229,"./az":236,"./az.js":236,"./be":237,"./be.js":237,"./bg":238,"./bg.js":238,"./bm":239,"./bm.js":239,"./bn":240,"./bn.js":240,"./bo":241,"./bo.js":241,"./br":242,"./br.js":242,"./bs":243,"./bs.js":243,"./ca":244,"./ca.js":244,"./cs":245,"./cs.js":245,"./cv":246,"./cv.js":246,"./cy":247,"./cy.js":247,"./da":248,"./da.js":248,"./de":249,"./de-at":250,"./de-at.js":250,"./de-ch":251,"./de-ch.js":251,"./de.js":249,"./dv":252,"./dv.js":252,"./el":253,"./el.js":253,"./en-au":254,"./en-au.js":254,"./en-ca":255,"./en-ca.js":255,"./en-gb":256,"./en-gb.js":256,"./en-ie":257,"./en-ie.js":257,"./en-il":258,"./en-il.js":258,"./en-in":259,"./en-in.js":259,"./en-nz":260,"./en-nz.js":260,"./en-sg":261,"./en-sg.js":261,"./eo":262,"./eo.js":262,"./es":263,"./es-do":264,"./es-do.js":264,"./es-us":265,"./es-us.js":265,"./es.js":263,"./et":266,"./et.js":266,"./eu":267,"./eu.js":267,"./fa":268,"./fa.js":268,"./fi":269,"./fi.js":269,"./fil":270,"./fil.js":270,"./fo":271,"./fo.js":271,"./fr":272,"./fr-ca":273,"./fr-ca.js":273,"./fr-ch":274,"./fr-ch.js":274,"./fr.js":272,"./fy":275,"./fy.js":275,"./ga":276,"./ga.js":276,"./gd":277,"./gd.js":277,"./gl":278,"./gl.js":278,"./gom-deva":279,"./gom-deva.js":279,"./gom-latn":280,"./gom-latn.js":280,"./gu":281,"./gu.js":281,"./he":282,"./he.js":282,"./hi":283,"./hi.js":283,"./hr":284,"./hr.js":284,"./hu":285,"./hu.js":285,"./hy-am":286,"./hy-am.js":286,"./id":287,"./id.js":287,"./is":288,"./is.js":288,"./it":289,"./it-ch":290,"./it-ch.js":290,"./it.js":289,"./ja":291,"./ja.js":291,"./jv":292,"./jv.js":292,"./ka":293,"./ka.js":293,"./kk":294,"./kk.js":294,"./km":295,"./km.js":295,"./kn":296,"./kn.js":296,"./ko":297,"./ko.js":297,"./ku":298,"./ku.js":298,"./ky":299,"./ky.js":299,"./lb":300,"./lb.js":300,"./lo":301,"./lo.js":301,"./lt":302,"./lt.js":302,"./lv":303,"./lv.js":303,"./me":304,"./me.js":304,"./mi":305,"./mi.js":305,"./mk":306,"./mk.js":306,"./ml":307,"./ml.js":307,"./mn":308,"./mn.js":308,"./mr":309,"./mr.js":309,"./ms":310,"./ms-my":311,"./ms-my.js":311,"./ms.js":310,"./mt":312,"./mt.js":312,"./my":313,"./my.js":313,"./nb":314,"./nb.js":314,"./ne":315,"./ne.js":315,"./nl":316,"./nl-be":317,"./nl-be.js":317,"./nl.js":316,"./nn":318,"./nn.js":318,"./oc-lnc":319,"./oc-lnc.js":319,"./pa-in":320,"./pa-in.js":320,"./pl":321,"./pl.js":321,"./pt":322,"./pt-br":323,"./pt-br.js":323,"./pt.js":322,"./ro":324,"./ro.js":324,"./ru":325,"./ru.js":325,"./sd":326,"./sd.js":326,"./se":327,"./se.js":327,"./si":328,"./si.js":328,"./sk":329,"./sk.js":329,"./sl":330,"./sl.js":330,"./sq":331,"./sq.js":331,"./sr":332,"./sr-cyrl":333,"./sr-cyrl.js":333,"./sr.js":332,"./ss":334,"./ss.js":334,"./sv":335,"./sv.js":335,"./sw":336,"./sw.js":336,"./ta":337,"./ta.js":337,"./te":338,"./te.js":338,"./tet":339,"./tet.js":339,"./tg":340,"./tg.js":340,"./th":341,"./th.js":341,"./tk":342,"./tk.js":342,"./tl-ph":343,"./tl-ph.js":343,"./tlh":344,"./tlh.js":344,"./tr":345,"./tr.js":345,"./tzl":346,"./tzl.js":346,"./tzm":347,"./tzm-latn":348,"./tzm-latn.js":348,"./tzm.js":347,"./ug-cn":349,"./ug-cn.js":349,"./uk":350,"./uk.js":350,"./ur":351,"./ur.js":351,"./uz":352,"./uz-latn":353,"./uz-latn.js":353,"./uz.js":352,"./vi":354,"./vi.js":354,"./x-pseudo":355,"./x-pseudo.js":355,"./yo":356,"./yo.js":356,"./zh-cn":357,"./zh-cn.js":357,"./zh-hk":358,"./zh-hk.js":358,"./zh-mo":359,"./zh-mo.js":359,"./zh-tw":360,"./zh-tw.js":360};function a(e){var t=o(e);return r(t)}function o(e){if(r.o(n,e))return n[e];var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return Object.keys(n)},a.resolve=o,(e.exports=a).id=428},442:function(e,t,r){"use strict";r.r(t);var n=r(36),a=r.n(n)()(!1);a.push([e.i,".route-box{display:flex;justify-content:space-between;flex-direction:row}.route-box-l{width:68%;height:100%;position:relative}.route-box-r{width:30%;height:100%;overflow:auto;border:solid 1px #eaeaea;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,0.66)}.tool-box{width:100%;height:80px;display:flex;justify-content:flex-start;flex-wrap:wrap;border:solid 1px #eaeaea;align-items:center}.mobile{width:320px;height:480px;background:#fff;position:relative}.form-box{width:100%;height:calc(100% - 200px);border:solid 1px #eaeaea;display:flex;justify-content:space-between;flex-direction:row;box-sizing:border-box;padding:15px}.form-box-l{width:100%;height:100%;overflow:auto}.form-box-r{width:16%;height:100%;overflow:auto;border:solid 1px #eaeaea}.form-list{width:100%;height:40px;display:flex;align-items:center;border:solid 1px #eaeaea}.form-list-ot{height:100px}.form-label{display:inline-block;width:120px;margin-right:10px}.color-box{display:inline-block;height:28px;line-height:28px;width:100px;border:solid 1px #eaeaea;cursor:pointer;margin-right:10px;text-align:center}.w-90{width:120px}.w-160{width:160px}.w-200{width:200px}.w-240{width:240px}.w-320{width:320px}.last-tool-box{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.line-x{display:inline-block;height:100%;width:1px;position:absolute;background:#0471e7;top:0;z-index:2020}.line-Y{display:inline-block;width:100%;height:1px;position:absolute;background:#0471e7;left:0;z-index:2020}.nor-list{width:100%;box-sizing:border-box;padding:13px;border:solid 1px #0471e7;min-height:100px;border-radius:5px;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.nor-list-l{width:88%}.img-j{display:inline-block;position:absolute;background:#0471e7;left:0;top:0;z-index:1}.img-j-12{height:100px;width:100px;border:solid 1px red}.des{display:inline-block;position:absolute;left:0;top:0;z-index:2}#target{border:#cccccc dashed 1px;cursor:move}\n",""]),t.default=a},675:function(e,t,r){var n=r(56),a=r(427);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o,l=n(a,{insert:"head",singleton:!1});a.locals&&!e.hot.invalidate||(o=a.locals,e.hot.accept(427,(function(){"string"==typeof(a=(a=r(427)).__esModule?a.default:a)&&(a=[[e.i,a,""]]),function(e,t){if(!e&&t||e&&!t)return!1;var r;for(r in e)if(e[r]!==t[r])return!1;for(r in t)if(!e[r])return!1;return!0}(o,a.locals)?(o=a.locals,l(a)):e.hot.invalidate()}))),e.hot.dispose((function(){l()})),e.exports=a.locals||{}},877:function(e,t,r){"use strict";r.r(t),r(176);var n=r(88),a=(r(93),r(27)),o=(r(185),r(38)),l=r(0),i=r.n(l),s=r(50),c=(r(431),r(84)),m=(r(219),r(69)),u=(r(411),r(133)),f=(r(150),r(40)),p=r(182),d=r(227);function b(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){var n,a,o;n=e,o=r[a=t],a in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=Object(d.a)({state:{bgData:{width:320,height:480,bgColor:"#FFFFFF",isTransmit:!1,isBgColor:1,bgImgSrc:"",transmitName:"bg_color",deflautColor:"#FFFFFF",name:"",describe:"",starTime:"2020-06-27 19:42:28"},isShowNet:!1,normalOpt:[{px:0,py:0,src:"",isTransmit:!1,transmitName:"",width:100,height:100}],textOpt:[{px:0,py:0,des:"",isTransmit:!1,transmitName:"",fontSize:14,fsColor:"#666666",showColorBox:!1}]},reducers:{updateBg:function(e,t){e.bgData=h(h({},e.bgData),t)},reseBg:function(e){e.bgData={}},swicthShowNet:function(e){e.isShowNet=!e.isShowNet},updateNormalOpt:function(e,t){var r=t.data,n=t.index,a=JSON.parse(JSON.stringify(e.normalOpt));a.splice(n,1,r),e.normalOpt=a},insetNormalOpt:function(e,t){e.normalOpt.push(t)},deleteNormalOpt:function(e,t){var r=e.normalOpt;r.splice(t,1),e.normalOpt=r},updateTextOpt:function(e,t){var r=t.data,n=t.index,a=JSON.parse(JSON.stringify(e.textOpt));a.splice(n,1,r),e.textOpt=a},insetTextOpt:function(e,t){e.textOpt.push(t)},deleteTextOpt:function(e,t){var r=e.textOpt;r.splice(t,1),e.textOpt=r},reset:function(){}}}),v=g.useStore,j=g.dispatch,y=r(880);function x(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){var n,a,o;n=e,o=r[a=t],a in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function O(){function e(e,t){var r={};r[t]=e||"",j("updateBg",r)}function t(t,r){e(t.target.value||"",r)}var r=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(l.useState)({background:"#fff",showColorBox:!1,fineName:""}),2),s=r[0],d=r[1],b=v((function(e){return e.bgData})),h={name:"file",accept:"image/*",action:"/api/file/upload",headers:{},onRemove:function(){d((function(e){return E(E({},e),{},{fineName:""})})),e("","bgImgSrc")},beforeUpload:function(e,t){return!(102400<t.size&&(o.b.error("图片大小不能超过100kb"),1))},onChange:function(t){var r="";"done"===t.file.status?(r="http://chimke.cn/images/upload/"+t.file.response.filename,o.b.success("上传成功")):"error"===t.file.status&&o.b.error("上传失败，稍后重试"),d((function(e){return E(E({},e),{},{fineName:r})})),e(r,"bgImgSrc")}};return i.a.createElement("div",null,i.a.createElement("div",{className:"fs-16 clr-I"},"基础配置"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"名称:"),i.a.createElement(f.a,{value:b.name||"",onChange:function(e){return t(e,"name")}})),i.a.createElement("div",{className:"form-list form-list-ot clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"描述:"),i.a.createElement(N,{rows:3,value:b.describe||"",onChange:function(e){return t(e,"describe")}})),i.a.createElement("div",{className:"fs-16 clr-I mr-t-30 need"},"底框"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r"},"宽 :"),i.a.createElement(m.a,{value:b.width||"",onChange:function(t){return e(t,"width")},min:20}),"    px",i.a.createElement("span",{className:"form-label t-r"},"高 :"),i.a.createElement(m.a,{value:b.height||"",onChange:function(t){return e(t,"height")},min:20}),"    px"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"展现显示 :"),i.a.createElement(c.a.Group,{onChange:function(e){return t(e,"isBgColor")},value:b.isBgColor},i.a.createElement(c.a,{value:1},"底色"),i.a.createElement(c.a,{value:2},"底图"))),1===b.isBgColor?i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"底色值是否传参 :"),i.a.createElement(n.a,{checked:b.isTransmit,onChange:function(t){e(t,"isTransmit")}})),b.isTransmit?i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"参数名 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{placeholder:"8个字符内",value:b.transmitName,onChange:function(e){return t(e,"transmitName")}}))),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"参数默认值 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{value:b.deflautColor,onChange:function(e){return t(e,"deflautColor")},placeholder:"FFFFFF"})))):i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"底色 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{value:b.bgColor,placeholder:"#FFFFFF",onChange:function(e){return t(e,"bgColor")}})),i.a.createElement("span",{className:"color-box mr-l-10 clor-III",style:{background:b.bgColor},onClick:function(){d((function(e){return E(E({},e),{},{showColorBox:!s.showColorBox})}))}},"选择"),s.showColorBox?i.a.createElement(p.SketchPicker,{color:b.bgColor,onChange:function(t){return r=t,d((function(e){return E(E({},e),{},{showColorBox:!1})})),void e(r.hex,"bgColor");var r}}):"")):i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"底图地址 :"),i.a.createElement(f.a,{placeholder:"https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg",disabled:!!s.fineName,value:b.bgImgSrc,onChange:function(e){return t(e,"bgImgSrc")}})),i.a.createElement("div",{className:"form-list form-list-ot clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r"},"上传图片 :"),i.a.createElement(u.a,h,i.a.createElement(a.a,{disabled:!!s.fineName},i.a.createElement(y.a,null)," 选择文件")))))}r(6),r(363);var N=f.a.TextArea;function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function C(){function e(e,t,r){var n=JSON.parse(JSON.stringify(o[r]));n[t]=e,j("updateTextOpt",{index:r,data:n})}function t(t,r,n){e(t.target.value||"",r,n)}var r=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?k(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(l.useState)({name:""}),2),o=(r[0],r[1],v((function(e){return e.textOpt})));return i.a.createElement("div",null,i.a.createElement("div",{className:"fs-16 clr-I"},"文字"),o&&o.map((function(r,l){return i.a.createElement("div",{className:"nor-list mr-t-30",key:l},i.a.createElement("div",{className:"nor-list-l"},i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-5"},i.a.createElement("span",{className:"form-label t-r need"},"X :"),i.a.createElement(m.a,{value:r.px,onChange:function(t){return e(t,"px",l)}}),"    px",i.a.createElement("span",{className:"form-label t-r need"},"Y :"),i.a.createElement(m.a,{value:r.py,onChange:function(t){return e(t,"py",l)}}),"    px"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"文字大小 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{placeholder:"文字大小",value:r.fontSize,onChange:function(e){return t(e,"fontSize",l)}})),"    px"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"文字颜色 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{value:r.fsColor,placeholder:"#FFFFFF",onChange:function(e){return t(e,"fsColor",l)}})),i.a.createElement("span",{className:"color-box mr-l-10 clor-III",style:{background:r.fsColor},onClick:function(){var t;e(!o[t=l].showColorBox,"showColorBox",t)}},"选择"),r.showColorBox?i.a.createElement(p.SketchPicker,{color:r.fsColor,onChange:function(t){return"fsColor",r=l,e(t.hex,"fsColor",r),setTimeout((function(){e(!1,"showColorBox",r)}),1500),void console.log(12);var r},onChangeComplete:function(e,t){return closePicker(e,t,l)}}):""),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"是否传参 :"),i.a.createElement(n.a,{checked:r.isTransmit,onChange:function(t){e(t,"isTransmit",l)}})),r.isTransmit?i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"参数名 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{placeholder:"8个字符内",value:r.transmitName,onChange:function(e){return t(e,"transmitName",l)}}))),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"默认文案 :"),i.a.createElement(f.a,{placeholder:"输入文字",value:r.defaultDes,onChange:function(e){return t(e,"defaultDes",l)}}))):i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"文案 :"),i.a.createElement(f.a,{placeholder:"输入文字 ",value:r.des,onChange:function(e){return t(e,"des",l)}})))),1<o.length&&i.a.createElement(a.a,{danger:!0,onClick:function(){j("deleteTextOpt",l)}},"删除"))})),i.a.createElement("div",{className:"mr-t-30"},i.a.createElement(a.a,{onClick:function(){j("insetTextOpt",{px:0,py:0,des:"",isTransmit:!1,transmitName:"",fontSize:14,fsColor:"#666666",showColorBox:!1})}},"增加")))}function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function S(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){var n,a,o;n=e,o=r[a=t],a in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function z(){function e(e,t,r){var n=JSON.parse(JSON.stringify(p[r]));n[t]=e,j("updateNormalOpt",{index:r,data:n})}function t(t,r,n){e(t.target.value||"",r,n)}var r=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?A(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(l.useState)({fileNameArr:[]}),2),s=r[0],c=r[1],p=v((function(e){return e.normalOpt})),d={name:"file",accept:"image/*",action:"/api/file/upload",headers:{},beforeUpload:function(e,t){return!(102400<t.size&&(o.b.error("图片大小不能超过100kb"),1))}};return i.a.createElement("div",null,i.a.createElement("div",{className:"fs-16 clr-I"},"常规图片"),p&&p.map((function(r,l){return i.a.createElement("div",{className:"nor-list mr-t-30",key:l},i.a.createElement("div",{className:"nor-list-l"},i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-5"},i.a.createElement("span",{className:"form-label t-r need"},"宽 :"),i.a.createElement(m.a,{value:r.width,onChange:function(t){return e(t,"width",l)}}),"    px",i.a.createElement("span",{className:"form-label t-r need"},"高 :"),i.a.createElement(m.a,{value:r.height,onChange:function(t){return e(t,"height",l)}}),"    px"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-5"},i.a.createElement("span",{className:"form-label t-r need"},"X :"),i.a.createElement(m.a,{value:r.px,onChange:function(t){return e(t,"px",l)}}),"    px",i.a.createElement("span",{className:"form-label t-r need"},"Y :"),i.a.createElement(m.a,{value:r.py,onChange:function(t){return e(t,"py",l)}}),"    px"),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"图片是否传参 :"),i.a.createElement(n.a,{checked:r.isTransmit,onChange:function(t){e(t,"isTransmit",l)}})),r.isTransmit?i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"参数名 :"),i.a.createElement("div",{className:"w-90"},i.a.createElement(f.a,{placeholder:"8个字符内",value:r.transmitName,onChange:function(e){return t(e,"transmitName",l)}}))),i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"默认值 :"),i.a.createElement(f.a,{placeholder:"https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg",value:r.defaultSrc,onChange:function(e){return t(e,"defaultSrc",l)}}))):i.a.createElement("div",null,i.a.createElement("div",{className:"form-list clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"图片地址 :"),i.a.createElement(f.a,{disabled:!!s.fileNameArr[l],placeholder:"https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg",value:r.src,onChange:function(e){return t(e,"src",l)}})),i.a.createElement("div",{className:"form-list form-list-ot clr-II fs-14 mr-t-15"},i.a.createElement("span",{className:"form-label t-r need"},"上传图片 :"),i.a.createElement(u.a,I({},d,{onChange:function(t){return r=t,n=l,a=s.fileNameArr,i="","done"===r.file.status?(i="http://chimke.cn/images/upload/"+r.file.response.filename,o.b.success("上传成功"),a[n]=i):"error"===r.file.status&&(o.b.error("上传失败，稍后重试"),i=a[n]=""),c((function(e){return P(P({},e),{},{fileNameArr:a})})),void e(i,"src",n);var r,n,a,i},onRemove:function(){return t=l,(r=s.fileNameArr)[t]="",c((function(e){return P(P({},e),{},{fileNameArr:r})})),void e("","src",t);var t,r}}),i.a.createElement(a.a,{disabled:!!s.fileNameArr[l]},i.a.createElement(y.a,null)," 选择文件"))))),1<p.length&&i.a.createElement(a.a,{danger:!0,onClick:function(){j("deleteNormalOpt",l)}},"删除"))})),i.a.createElement("div",{className:"mr-t-30"},i.a.createElement(a.a,{onClick:function(){j("insetNormalOpt",{px:0,py:0,src:"",isTransmit:!1,transmitName:"",width:100,height:100})}},"增加")))}function D(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){var n,a,o;n=e,o=r[a=t],a in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function B(){function e(e){var t=e.target;if(!e.target)return!1;var r=document.getElementById("target");r&&r.setAttribute("id",""),t.setAttribute("id","target");var n,a,o,l=t.getAttribute("type"),i=t.getAttribute("index");if(!l)return!1;n=i,a=l,o=document.getElementById("target"),console.log(n,a),o.onmousedown=function(e){var t=e||window.event,r=t.clientX-o.offsetLeft,l=t.clientY-o.offsetTop;document.onmousemove=function(e){var t=e||window.event,o=t.clientX-r,i=t.clientY-l,m="updateNormalOpt"===a?JSON.parse(JSON.stringify(s[n])):JSON.parse(JSON.stringify(c[n]));m.px=o,m.py=i,console.log(m),j(a,{index:n,data:m})},document.onmouseup=function(e){this.onmousemove=null,this.onmouseup=null}}}var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return F(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?F(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(l.useState)({scale:"scale(1,1)"}),2),r=t[0],n=t[1],a=v((function(e){return e.bgData})),o=v((function(e){return e.isShowNet})),s=v((function(e){return e.normalOpt})),c=v((function(e){return e.textOpt}));return Object(l.useEffect)((function(){})),i.a.createElement("div",{className:"route-box-r"},i.a.createElement("div",{id:"handel-view"}),i.a.createElement("div",{id:"view",className:"mobile",style:{width:a.width+"px",height:a.height+"px",transform:r.scale,backgroundColor:a.bgColor,backgroundImage:a.bgImgSrc?"url("+a.bgImgSrc+")":"none",backgroundSize:"100% 100%",backgroundRepeat:"no-repeat"}},s&&s.map((function(t,r){var n=t.isTransmit&&t.defaultSrc?t.defaultSrc||"":t.src||"";if(n)return i.a.createElement("img",{className:"img-j",alt:"",index:r,onDoubleClick:e,type:"updateNormalOpt",key:n,src:n,style:{left:t.px+"px",top:t.py+"px",width:t.width+"px",height:t.height+"px"}})})),c&&c.map((function(t,r){var n=t.isTransmit&&t.defaultDes?t.defaultDes||"":t.des||"";if(n)return i.a.createElement("span",{className:"des",onDoubleClick:e,type:"updateTextOpt",index:r,key:r,style:{left:t.px+"px",top:t.py+"px",color:t.fsColor,fontSize:t.fontSize+"px"}},n)})),o&&function(){if(!a.width)return[];for(var e=[],t=0;t<a.width;t++)t%10==0&&e.push(t+"px");return setTimeout((function(){var e,t;t=e=1,340<a.width&&(e=(340/a.width).toFixed(2)),540<a.height&&(t=(520/a.height).toFixed(2)),n((function(r){return T(T({},r),{},{scale:"scale(".concat(e,",").concat(t,")")})}))}),1500),e}().map((function(e,t){return i.a.createElement("span",{className:"line-x",key:t,style:{left:e}})})),o&&function(){if(!a.height)return[];for(var e=[],t=0;t<a.height;t++)t%10==0&&e.push(t+"px");return e}().map((function(e,t){return i.a.createElement("span",{className:"line-Y",key:t,style:{top:e}})}))))}var J=r(424),_=r(153);function U(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){var n,a,o;n=e,o=r[a=t],a in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}t.default=function(){function e(e){c((function(t){return M(M({},t),{},{active:e})}))}var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(l.useState)({active:"bgNex"}),2),r=t[0],c=t[1],m=v((function(e){return e.bgData})),u=v((function(e){return e.textOpt})),f=v((function(e){return e.normalOpt})),p=Object(s.k)(),d=!0;return i.a.createElement("div",{className:"cont-box route-box"},i.a.createElement("div",{className:"route-box-l"},i.a.createElement(J.a,{name:"新建图片"}),i.a.createElement("div",{className:"tool-box"},i.a.createElement(a.a,{type:"bgNex"===r.active?"primary":"",className:"mr-l-15",onClick:function(){return e("bgNex")}},"底框"),i.a.createElement(a.a,{type:"normalImg"===r.active?"primary":"",className:"mr-l-15",onClick:function(){return e("normalImg")}},"常规图片"),i.a.createElement(a.a,{type:"text"===r.active?"primary":"",className:"mr-l-15",onClick:function(){return e("text")}},"文字")),i.a.createElement("div",{className:"form-box mr-t-30"},i.a.createElement("div",{className:"form-box-l"},function(){switch(r.active){case"bgNex":return i.a.createElement(O,null);case"text":return i.a.createElement(C,null);case"normalImg":return i.a.createElement(z,null);default:return i.a.createElement(O,null)}}())),i.a.createElement("div",{className:"mr-t-30 last-tool-box "},i.a.createElement("div",null,i.a.createElement(a.a,{className:"mr-l-15",type:"primary",onClick:function(){if(!m.name)return o.b.error("名称不能为空"),!1;if(!m.describe)return o.b.error("描述不能为空"),!1;if(!m.width||m.width<=0)return o.b.error("底框宽高不能为空，且不小于0"),!1;if(!m.height||m.height<=0)return o.b.error("底框宽高不能为空，且不小于0"),!1;if(1==m.isBgColor){if(m.isTransmit&&!m.bgColor)return o.b.error("底框底色不能为空"),!1;if(!m.transmitName||!m.deflautColor)return o.b.error("参数名和默认值不能为空"),!1}if(2==m.isBgColor&&!m.bgImgSrc)return o.b.error("底框底图地址不能为空"),!1;for(var e=!0,t=0;t<f.length;t++){var r=f[t];if(r.isTransmit&&(!r.transmitName||!r.defaultSrc)){o.b.error("图片参数名和默认值不能为空"),e=!1;break}}if(!e)return!1;for(var n=0;n<u.length;n++){var a=u[n];if(a.isTransmit&&(!a.transmitName||!a.defaultDes)){o.b.error("文案参数名和默认值不能为空"),e=!1;break}}if(!e)return!1;if(!d)return!1;d=!1;var l={bgData:m,textOpt:u,normalOpt:f,creatName:sessionStorage.getItem("userName"),isUse:!0};Object(_.d)(l).then((function(e){o.b.success("保存成功"),p.push("/content/list"),j("reset")})).catch((function(e){o.b.error(e.msg)})).finally((function(){d=!0}))}},"保存"),i.a.createElement(a.a,{className:"mr-l-15"},"重置")),i.a.createElement("div",null,i.a.createElement(n.a,{checkedChildren:"开启网格",unCheckedChildren:"关闭网格",onChange:function(){j("swicthShowNet")}})))),i.a.createElement(B,null))}}}]);