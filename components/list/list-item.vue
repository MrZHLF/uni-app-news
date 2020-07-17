<template>
	<list-scroll class="list-scroll" @loadmoer="loadmoer">
		<view>
			<list-card :item='item' v-for="(item,index) in list" :key="item._id"></list-card>
		</view>
		<uni-load-more v-if="list.length==0 || list.length > 9" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:"loading"
					}
				}
			}
		},
		methods:{
			loadmoer(){
				this.$emit('loadmoer')
			}
		}
	}
</script>

<style>
	.list-scroll{
		height: 100%;
	}
</style>
