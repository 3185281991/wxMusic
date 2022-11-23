<script>
	export default {
		onLaunch: function() {
			this.$store.commit('setinnerAudioContext');
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/iconfont.css");
</style>
