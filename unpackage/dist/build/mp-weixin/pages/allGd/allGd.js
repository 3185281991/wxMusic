(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/allGd/allGd"],{2144:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},i=[]},5683:function(t,n,e){"use strict";(function(t){e("d895");a(e("66fd"));var n=a(e("c26b"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"8f06":function(t,n,e){"use strict";var a=e("f1ca"),u=e.n(a);u.a},a900:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("8696"),u={data:function(){return{tags:[],menuList:[],tindex:0,tagTotal:0,tag:"",lastUpdateTime:""}},onLoad:function(){this.getBestMenuTag(),this.getBestMenu("全部",0)},onReachBottom:function(){this.moreMenu(this.tag,this.lastUpdateTime)},methods:{getBestMenuTag:function(){var t=this;(0,a.BestMenuTag)().then((function(n){t.tags=n.data.tags,t.tags.unshift({name:"全部"})}))},getBestMenu:function(n,e){var u=this;this.tag=n,this.tindex=e,(0,a.BestMenu)(n).then((function(n){u.menuList=n.data.playlists,u.tagTotal=n.data.total,u.lastUpdateTime=u.menuList[u.menuList.length-1].updateTime,t.pageScrollTo({scrollTop:0,duration:300})}))},moreMenu:function(n,e){var u=this;this.menuList.length<=this.tagTotal?(0,a.BestMenu)(n,e).then((function(t){var n=t.data.playlists;u.menuList=u.menuList.concat(n),u.lastUpdateTime=u.menuList[u.menuList.length-1].updateTime})):t.showToast({title:"暂无更多"})},conreteInfo:function(n,e){t.navigateTo({url:"../gedan/gedan?id="+n})}}};n.default=u}).call(this,e("543d")["default"])},c26b:function(t,n,e){"use strict";e.r(n);var a=e("2144"),u=e("f396");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("8f06");var s,o=e("f0c5"),c=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"5886b128",null,!1,a["a"],s);n["default"]=c.exports},f1ca:function(t,n,e){},f396:function(t,n,e){"use strict";e.r(n);var a=e("a900"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a}},[["5683","common/runtime","common/vendor"]]]);