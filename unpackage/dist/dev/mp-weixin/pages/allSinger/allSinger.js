(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/allSinger/allSinger"],{100:function(n,t,e){"use strict";e.r(t);var i=e(101),s=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=s.a},101:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e(52),s={data:function(){return{area:[{type:"全部",index:-1},{type:"华语",index:7},{type:"欧美",index:96},{type:"日本",index:8},{type:"韩国",index:16},{type:"其他",index:0}],type:[{type:"全部",index:-1},{type:"男",index:1},{type:"女",index:2},{type:"乐队",index:3}],aIndex:0,tIndex:0,areaF:-1,typeF:-1,singList:[],name:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],nameIndex:0}},onReachBottom:function(){this.moreSinger(this.areaF,this.typeF)},onLoad:function(){this.gethotsinglist()},methods:{gethotsinglist:function(){var n=this;(0,i.singlist)(-1,-1,-1,0,20).then((function(t){var e=t.data.artists;n.singList=n.singList.concat(e)}))},moreSinger:function(n,t){var e=this,s=this.name[this.nameIndex];(0,i.singlist)(t,n,s,0,10).then((function(n){var t=n.data.artists;e.nameIndex++,e.singList=e.singList.concat(t)}))},getsingList:function(n,t){var e=this;this.singList=[],-1===n&&-1===t&&this.gethotsinglist();var s=this.name[this.nameIndex];(0,i.singlist)(n,t,s,0,10).then((function(n){var t=n.data.artists;e.nameIndex++,e.singList=e.singList.concat(t)}))},search1:function(n,t){this.aIndex=t,this.areaF=n.index,this.nameIndex=0,this.getsingList(this.typeF,this.areaF)},search2:function(n,t){this.tIndex=t,this.typeF=n.index,this.nameIndex=0,this.getsingList(this.typeF,this.areaF)},jumpTosingInfo:function(t){n.navigateTo({url:"../singInfo/singInfo?id="+t})}}};t.default=s}).call(this,e(1)["default"])},102:function(n,t,e){"use strict";e.r(t);var i=e(103),s=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=s.a},103:function(n,t,e){},96:function(n,t,e){"use strict";(function(n){e(5);i(e(3));var t=i(e(97));function i(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e(1)["createPage"])},97:function(n,t,e){"use strict";e.r(t);var i=e(98),s=e(100);for(var r in s)"default"!==r&&function(n){e.d(t,n,(function(){return s[n]}))}(r);e(102);var a,o=e(11),u=Object(o["default"])(s["default"],i["render"],i["staticRenderFns"],!1,null,"a0476dfc",null,!1,i["components"],a);u.options.__file="pages/allSinger/allSinger.vue",t["default"]=u.exports},98:function(n,t,e){"use strict";e.r(t);var i=e(99);e.d(t,"render",(function(){return i["render"]})),e.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),e.d(t,"components",(function(){return i["components"]}))},99:function(n,t,e){"use strict";var i;e.r(t),e.d(t,"render",(function(){return s})),e.d(t,"staticRenderFns",(function(){return a})),e.d(t,"recyclableRender",(function(){return r})),e.d(t,"components",(function(){return i}));var s=function(){var n=this,t=n.$createElement;n._self._c},r=!1,a=[];s._withStripped=!0}},[[96,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/allSinger/allSinger.js.map