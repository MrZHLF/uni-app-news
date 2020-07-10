<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y="true" @scroll="loadmoer">
			<view><slot></slot></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		loadmoer(){
			this.$emit('loadmoer')
		}
	}
};
</script>

<style lang="scss">
.scroll {
	flex: 1;
	overflow: hidden;
	box-sizing: border-box;
	.list-scroll {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
}
</style>
