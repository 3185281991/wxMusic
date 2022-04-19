import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		//全局播放器
		innerAudioContext: '',
		//全局播放列表
		playList:null
	},
	getters: {
		getinnerAudioContext(state) {
			return state.innerAudioContext;
		},
		getinnerAudioContextSrc(state) {
			return state.innerAudioContext.src;
		},
		getPlayList(state){
			return state.playList;
		}
	},
	mutations: {
		setinnerAudioContext(state) {
			state.innerAudioContext = uni.createInnerAudioContext();
			state.innerAudioContext.autoplay = true;
		},
		setinnerAudioContextSrc(state, src) {
			state.innerAudioContext.src = src;
		},
		setPlay(state){
			state.innerAudioContext.play();
		},
		setPause(state){
			state.innerAudioContext.pause();
		},
		setPlayList(state,list){
			state.playList=list;
		}
	},
	actions: {},
	modules: {}
})
export default store;
