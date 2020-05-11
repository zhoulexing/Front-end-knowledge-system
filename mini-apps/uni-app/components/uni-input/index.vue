<template>
	<input class="uni-input" :class="['uni-input--' + size,]" 
		v-model="value" 
		:placeholder="placeholder"
		placeholder-class="uni-input-ph"
	/>
</template>

<script lang="ts">
	export default {
		name: 'UniInput',
		props: {
			size: {
				type: String,
				default: 'base'
			},
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style lang="scss">
	.uni-input {
		background-color: $uni-bg-color;
	}
	.uni-input--base {
		border-radius: $uni-border-radius-base;
		height: $input-height-base;
	}
	.uni-input--large {
		border-radius: $input-border-lg;
		height: $input-height-lg;
	}
	.uni-input--small {
		border-radius: $uni-border-radius-sm;
		height: $input-height-sm;
	}
	.uni-input-ph {
		padding-left: 30upx;
	}
</style>
