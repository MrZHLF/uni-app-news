<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<view class="navbar-content" :class="{search:isSearch}" :style="{height: navBarHeight+'px',width:windowWidth+'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-content_search-icons" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					<!-- 非搜索页 -->
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app,vue</view>
				</view>
				<view v-else class="navbar-search">
					<!-- 搜索页 -->
					<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入搜索的内容" @input="inputChange"/>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default:false
			},
			value:{
				type:[String,Number],
				default:''
			}
		},
		watch:{
			value(newValue) {
				this.val = newValue
			}	
		},
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375,
				val:""
			}
		},
		created() {
			let info = uni.getSystemInfoSync()
			// 状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 获取胶囊位置
			
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				// (胶囊底部高度-状态栏高度) + (胶囊顶部高度-状态栏高度) = s
				 this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
				 this.windowWidth = menuButtonInfo.left
			// #endif
			
			
		},
		methods: {
			open(){
				if(this.isSearch) return
				uni.navigateTo({
					url:'/pages/home-search/home-search'
				})
			},
			back(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			inputChange(e){
				const {value} = e.detail
				this.$emit('input',value)
			}
		}
	}
</script>

<style  lang="scss">
	@import '../../common/css/icons.css';
	.navbar {
		.navbar-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color:$mk-base-color;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;
				.navbar-search{
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #FFFFFF;
					.navbar-search_icon{
						margin-right: 10px;
					}
					.navbar-search_text{
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search{
					padding-left:0;
					.navbar-content_search-icons{
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search{
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
