<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id:"5f06eaf4e03eac00013be69c",
			}).then(res =>{
				const {data} = res;
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
