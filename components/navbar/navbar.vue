<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<view class="navbar-content" :style="{height: navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app,vue</view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375
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
				// (胶囊底部高度-状态栏高度) + (胶囊顶部高度-状态栏高度) = 导航栏高度
				 this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
				 this.windowWidth = menuButtonInfo.left
			// #endif
			
			
		},
		methods: {
			
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
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>
