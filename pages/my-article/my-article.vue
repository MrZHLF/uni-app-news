<template>
	<view>
		<uni-load-more v-if="list.length === 0" status="loading" iconType="snow"></uni-load-more>
		<list-card v-for="item in list" :key="item.id" :item="item"></list-card>
		<view class="no-data" v-if="articleShow">没有数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				articleShow:false
			}
		},
		onLoad() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle() {
				this.$api.get_my_article().then(res =>{
					const {data} = res
					this.list = data
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-data{
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
