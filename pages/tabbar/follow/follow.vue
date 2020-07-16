<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab_box">
				<view class="follow-tab_item" :class="{active:activeIndex===0}" @click="tab(0)">文章</view>
				<view class="follow-tab_item" :class="{active:activeIndex===1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list_swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<view class="swiper-item">
						<list-scroll>
							<uni-load-more v-if="list.length === 0 && !articleShow" status="loading" iconType="snow"></uni-load-more>
							<list-card types="follow" v-for="item in list" :key="item._id" :item="item"></list-card>
							<view class="no-data" v-if="articleShow">没有数据</view>
						</list-scroll>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<list-scroll>
							<list-author v-for="item in authorList" :key="item.id" :item="item"></list-author>
						</list-scroll>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				list:[],
				authorList:[],
				articleShow:false
			}
		},
		onLoad() {
			uni.$on('update_article',()=>{
				this.getFollow()
			})
			this.getFollow()
			
			uni.$on('update_author',()=>{
				this.getAuthor()
			})
			this.getAuthor()
		},
		methods: {
			change(e){
				this.activeIndex = e.detail.current
			},
			tab(index){
				this.activeIndex = index
			},
			getFollow(){
				this.$api.get_follow().then(res  =>{
					const {data} = res
					this.list = data
					this.articleShow = this.list.length === 0 ? true : false
				})
			},
			getAuthor(){
				this.$api.get_author().then(res  =>{
					const {data} = res
					this.authorList = data
					console.log(res,'55')
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.follow{
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab{
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px solid #F5F5F5;
			.follow-tab_box{
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $mk-base-color;
				.follow-tab_item{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #666;
					&:first-child{
						border-right: 1px solid $mk-base-color;
					}
					&.active{
						color: $mk-base-color;
					}
				}
			}
		}
		.follow-list{
			flex: 1;
			.follow-list_swiper{
				height: 100%;
				.swiper-item{
					height: 100%;
				}
			}
		}
	}
	.no-data{
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
