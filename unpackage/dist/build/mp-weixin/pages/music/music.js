(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/music/music"],{4267:function(n,t,e){"use strict";(function(n){e("d895");a(e("66fd"));var t=a(e("42a5"));function a(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])},"42a5":function(n,t,e){"use strict";e.r(t);var a=e("eba9"),i=e("58bb");for(var o in i)"default"!==o&&function(n){e.d(t,n,(function(){return i[n]}))}(o);e("bb5a");var u,r=e("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"4ae2ac09",null,!1,a["a"],u);t["default"]=c.exports},"58bb":function(n,t,e){"use strict";e.r(t);var a=e("e0a0"),i=e.n(a);for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);t["default"]=i.a},bb5a:function(n,t,e){"use strict";var a=e("edc2"),i=e.n(a);i.a},e0a0:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=e("8696"),i=e("adeb"),o=e("0f32"),u=e("1efd"),r=function(){Promise.all([e.e("common/vendor"),e.e("components/search")]).then(function(){return resolve(e("3bdd"))}.bind(null,e)).catch(e.oe)},c={data:function(){return{privateList:[],newAblum:[],newSong:[],trackList:[],index:1,menuW:[]}},components:{search:r},onLoad:function(){this.getprivatecontent(),this.getnewAlbum(),this.getnewSong(),this.getmenuW(),this.gettoplistDetail()},methods:{getmenuW:function(){var n=this;(0,a.menuW)().then((function(t){n.menuW=t.data.playlists}))},getprivatecontent:function(){var n=this;(0,a.privatecontent)().then((function(t){n.privateList=t.data.result}))},getnewAlbum:function(){var n=this;(0,a.newAlbum)().then((function(t){var e=t.data.monthData.slice(12,24);n.newAblum=(0,u.slice)(e,3)}))},getnewSong:function(){var n=this;(0,o.newSong)().then((function(t){var e=t.data.data.slice(12,24);n.newSong=(0,u.slice)(e,3)}))},gettoplistDetail:function(){var n=this;(0,a.toplistDetail)().then((function(t){n.trackList=t.data.list.slice(0,4)}))},bofang:function(t){var e=this,a=null,o=t.id,u="",r="",c="";t.song?(u=t.song.album.artists[0].name,r=t.song.name,c=t.picUrl):(u=t.album.artists[0].name,r=t.name,c=t.album.picUrl),(0,i.getMusicUrl)(o).then((function(t){a=t.data.data[0].url,null===a?n.showToast({title:"未找到播放路径。"}):(e.playInfo={id:o,url:a,name:r,author:u,poster:c},n.$emit("playinfo",e.playInfo))}))},getEditor:function(t){var e=this,a="",o=t.artist.name,u=t.name,r=t.artist.picUrl;(0,i.editorInfo)(t.id).then((function(t){var c=t.data.songs[0].id;(0,i.getMusicUrl)(c).then((function(t){a=t.data.data[0].url,null===a?n.showToast({title:"未找到播放路径。"}):(e.playInfo={id:c,url:a,name:u,author:o,poster:r},n.$emit("playinfo",e.playInfo))}))}))},changeIndex:function(n){this.index=n},jumptoMv:function(t){n.navigateTo({url:"../bofang/bofang?id="+t+"&type=独家"})},jumpTo:function(n){},jumToSe:function(){n.navigateTo({url:"../newSE/newSE"})},conreteInfo:function(t,e){n.navigateTo({url:"../gedan/gedan?id="+t})},jumpToGd:function(){n.navigateTo({url:"../gedan/gedan?"})},jumpToTrack:function(){n.navigateTo({url:"../track/track"})},jumpToAllGD:function(){n.navigateTo({url:"../allGd/allGd"})},jumpToAllsinger:function(){n.navigateTo({url:"../allSinger/allSinger"})}}};t.default=c}).call(this,e("543d")["default"])},eba9:function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return a}));var i=function(){var n=this,t=n.$createElement;n._self._c},o=[]},edc2:function(n,t,e){}},[["4267","common/runtime","common/vendor"]]]);