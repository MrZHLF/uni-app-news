<template>
	<view class="icons" @click.stop="likeType">
		<uni-icons size="20" color="#f07373"  :type="like ? 'heart-filled' : 'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				like:false
			};
		},
		watch:{
			item(newValue){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeType(){
				// 收藏
				this.like = !this.like 
				this.setUpdateLikes()
			},
			setUpdateLikes(){
				uni.showLoading()
				this.$api.update_like({
					user_id:'5f06eaf4e03eac00013be69c',
					article_id:this.item._id
				}).then((res) =>{
					uni.hideLoading()
					uni.showToast({
						title:this.like ? '收藏成功' : '取消收藏',
						icon:"none"
					})
					uni.$emit('update_article',this.types)
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
.icons{
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20px;
	height: 20px;
}
</style>
