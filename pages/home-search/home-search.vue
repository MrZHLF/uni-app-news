<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view v-if="is_history" class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content-item" v-for="(item,index) in historyList" :key="index" @click="openHistory(item)">{{item.name}}</view>
				</view>
				<view v-else class="no-data">没有搜索历史</view>
			</view>
		</view>
		<list-scroll v-else class="list-scroll">
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="searchList.length > 0">
				<list-card :item='item' v-for="(item,index) in searchList" :key="item._id" @click="setHistory"></list-card>
			</view>
			<view v-if="searchList.length ==0&& !loading" class="no-data">没有搜索到相关数据</view>
		</list-scroll>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value:"",
				is_history:true,
				searchList:[],
				loading:false
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			change(value){
				if(!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				if(!this.mark) {
					this.timer = setTimeout(() =>{
						this.getSearch(value)
						this.mark = true
					},1000)
				}
			},
			getSearch(value) {
				if(!value) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.loading = true
				this.$api.get_search({ value}).then(res => {
					let data = res.data;
					this.loading = false
					this.searchList=data
				}).catch(()=>{
					this.loading = false
				})
			},
			setHistory() {
				// 保存历史记录	
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			openHistory(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			clear(){
				this.$store.dispatch('clear_history')
				uni.showToast({
					title:'清空完成',
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		.label-box{
			background-color: #FFFFFF;
			margin-bottom: 10rpx;
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				.label-title{
					color: $mk-base-color;
				}
				.label-clear{
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content-item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
	.no-data{
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
</style>
