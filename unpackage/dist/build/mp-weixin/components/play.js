(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/play"],{"066a":function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=n("adeb"),o=n("1efd"),a={name:"play",data:function(){return{info:{id:"",url:"",author:"暂无",name:"暂无",poster:""},playList:[],index:0,altitutde:"icon-bofang",currentTime:0}},computed:{getInfo:function(){return this.info}},mounted:function(){var i=this;t.$on("playinfo",(function(n){t.setStorage({key:"info",data:n}),i.info=n,i.$store.commit("setinnerAudioContextSrc",i.info.url),i.$store.commit("setPlay"),i.altitutde="icon-zanting",i.getsimilarMusic(n.id)})),t.$on("audioChnage",(function(){i.altitutde="icon-bofang",i.$store.commit("setPause")})),t.$on("pause",(function(){i.altitutde="icon-bofang",i.$store.commit("setPause")})),t.$on("audioPlay",(function(t){i.info.id=t,i.getmusicDetialInfo(t),i.altitutde="icon-zanting",i.$store.commit("setPlay"),i.playList=i.$store.getters.getPlayList}));var n=t.getStorageSync("info");n&&(this.info=n,this.$store.commit("setinnerAudioContextSrc",this.info.url),this.$store.commit("setPause"),this.getsimilarMusic(this.info.id)),this.$store.getters.getinnerAudioContext.onEnded((function(){i.next()}))},methods:{throttle:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;(0,o.throttle)(t,i)()},getsimilarMusic:function(t){var i=this;(0,e.similarMusic)(t).then((function(t){i.playList=t.data.songs}))},getMusicUrl:function(t){var i=this;return(0,e.getMusicUrl)(t).then((function(t){i.info.url=t.data.data[0].url,i.$store.commit("setinnerAudioContextSrc",i.info.url)}))},play:function(){"icon-bofang"===this.altitutde?(this.altitutde="icon-zanting",this.$store.commit("setPlay")):(this.altitutde="icon-bofang",this.$store.commit("setPause"))},getmusicDetialInfo:function(t){var i=this;return(0,e.musicDetialInfo)(t).then((function(t){i.info.author=t.data.songs[0].ar[0].name,i.info.name=t.data.songs[0].al.name,i.info.poster=t.data.songs[0].al.picUrl}))},getMusic:function(i){var n=this;this.info.id=i.id,i.album?(this.info.author=i.album.name,this.info.poster=i.album.picUrl):(this.info.author=i.ar[0].name,this.info.poster=i.al.picUrl),this.info.name=i.name,Promise.all([this.getmusicDetialInfo(i.id),this.getMusicUrl(i.id)]).then((function(){t.setStorage({key:"info",data:n.info})})),this.getsimilarMusic(this.info.id)},next:function(){var i=this.playList.length;if(0!==i){if(this.index===i-1){var n=this.playList[0];this.getMusic(n),this.index=0}else{var e=this.playList[this.index+1];this.getMusic(e),this.index++}this.altitutde="icon-zanting"}else t.showToast({title:"暂无曲目"})},jumpToPlayer:function(i){""!==i?t.navigateTo({url:"../player/player?id="+i+"&from=play"}):t.showToast({title:"暂无曲目"})}}};i.default=a}).call(this,n("543d")["default"])},"0b7d":function(t,i,n){"use strict";var e=n("9ce3"),o=n.n(e);o.a},1144:function(t,i,n){"use strict";n.r(i);var e=n("3b2e"),o=n("a96c");for(var a in o)"default"!==a&&function(t){n.d(i,t,(function(){return o[t]}))}(a);n("0b7d");var s,u=n("f0c5"),r=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,"9e62594c",null,!1,e["a"],s);i["default"]=r.exports},"3b2e":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return e}));var o=function(){var t=this,i=t.$createElement;t._self._c},a=[]},"9ce3":function(t,i,n){},a96c:function(t,i,n){"use strict";n.r(i);var e=n("066a"),o=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,(function(){return e[t]}))}(a);i["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/play-create-component',
    {
        'components/play-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1144"))
        })
    },
    [['components/play-create-component']]
]);
