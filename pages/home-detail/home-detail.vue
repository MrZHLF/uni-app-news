<template>
	<view class="detail">
		<view class="detail-title">{{formData.title}}</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">{{formData.author.author_name}}</view>
				<view class="detail-header_content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header_button" @click="follow(formData.author.id)">{{formData.is_author_like ? '取消关注':'关注'}}</button>
		</view>
		<!-- 内容 -->
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData='noData'></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id"> 
					<comments-box :comments="item" @reply='reply'></comments-box>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="detail-bottom">
			<view class="detail-bottom_icons-input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like ? 'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' :'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" placeholder="请输入评论内容" fixed maxlength="200" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from "@/components/gaoyia-parse/parse.vue"
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsValue:"",//输入值
				commentsList:[],
				replyFormData:{}
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods: {
			open(){
				uni.navigateTo({
					url:"/pages/detail-comments/detail-comments?id="+this.formData._id
				})
			},
			thumbsup(article_id){
				// 点赞
				this.setUpdateThumbsup(article_id)
			},
			setUpdateThumbsup(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({article_id}).then(res =>{
					console.log(res)
					uni.hideLoading()
					this.formData.is_thumbs_up= true
					this.formData.thumbs_up_count++
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				})
			},
			likeTap(article_id){
				// 收藏
				this.setUpdateLike(article_id)
			},
			setUpdateLike(article_id){
				uni.showLoading()
				this.$api.update_like({article_id}).then(res =>{
					console.log(res)
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article','follow')
					uni.showToast({
						title:this.formData.is_like?'收藏成功':"取消收藏",
						icon:"none"
					})
				})
			},
			follow(author_id){
				// 关注和取消关注
				this.setUpdateAuthor(author_id)
			},
			setUpdateAuthor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title:this.formData.is_author_like?'关注作者成功':"取消关注",
						icon:"none"
					})
				})
			},
			openComment(){
				//打开评论窗口
				this.$refs.popup.open()
			},
			close(){
				//关闭评论窗口
				this.$refs.popup.close()
			},
			submit(){
				// 发布
				if(!this.commentsValue) {
					uni.showToast({
						title:'请输入评论内容',
						icon:"none"
					})
				}
				this.setUpdateComment({
					content:this.commentsValue,
					...this.replyFormData
				})
			},
			setUpdateComment(content){
				const formData = {
					article_id:this.formData._id,
					...content
				}
				uni.showLoading()
				this.$api.update_comment(formData).then(res =>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComments()
					this.commentsValue = ''
					this.close()
					this.replyFormData = {}
				})
			},
			reply(e){
				this.replyFormData={
					'comment_id':e.comments.comment_id,
					'is_reply':e.is_reply
				}
				if(e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			},
			getDetail() {
				this.$api.get_detail({
					article_id:this.formData._id
				}).then((res) =>{
					const { data } = res;
					this.formData = data
				})
			},
			getComments(){
				this.$api.get_comments({
					article_id:this.formData._id
				}).then(res =>{
					console.log(res)
					const {data} = res
					this.commentsList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		padding-bottom: 54px;
	}
	.detail-title{
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-header_logo{
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-header_content{
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			.detail-header_content-title{
				font-size: 14px;
				color: #333333;
			}
			.detail-header_content-info{
				color: #999999;
				text{
					margin-right: 10px;
				}
			}
		}
		.detail-header_button{
			padding: 0 15px;
			flex-shrink: 0;
			height: 30px;
			line-height: 30px;
			border-radius: 5px;
			font-size: 12px;
			color: #fff;
			background-color: $mk-base-color;
		}
	}
	.detail-content{
		margin-top: 20px;
		min-height: 500px;
		.detail-html{
			padding: 0 15px;
		}
		.detail-comment{
			margin-top: 30rpx;
			.comment-title{
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1pxp solid #F5F5F5;
			}
			.comment-content{
				padding: 0 15px;
				border-top: 1px solid #EEE;
			}
		}
	}
	.detail-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px solid #f5f5f5;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.detail-bottom_icons-input{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #dddddd;
			border-radius: 5px;
			text{
				font-size: 14px;
				color: #999;
			}
		}
		.detail-bottom_icons{
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;
			.detail-bottom_icons-box{
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
	.popup-wrap{
		background-color: #FFFFFF;
		.popup-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
			.popup-header_item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea{
				width: 100%;
				height: 200px;
			}
			.popup-count{
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
