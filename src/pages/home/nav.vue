<template>
	<div class="nav">
		<div class="logo-container">
			<img class="logo" :src="logo" alt="">
			<span>Scripter</span>
		</div>
		<div class="nav-container">
			<div class="nav-item"
			     v-for="nav in list"
			     :class="{selected: nav.checked}"
			     @click="emit('switch', nav)"
			>{{ nav.name }}</div>
		</div>
	</div>
</template>

<script setup>
import {computed, inject} from "vue";
import logo from '@/../public/logo.png';

const emit = defineEmits(['switch'])

const list = inject('nav-list');
const current = computed(() => {
    return list.find(item => item.checked) || {}
})

</script>

<style scoped lang="scss">
.nav {
	height: 100%;
	background: #262626;
	display: grid;
	grid-template-rows: auto 1fr;
	.logo-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 0;
		flex-direction: column;
		font-size: 24px;
		font-style: italic;
	}
	.nav-container {
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 5px;
		.nav-item {
			height: 40px;
			line-height: 40px;
			padding: 0 20px;
			padding-right: 60px;
			&:hover,&.selected {
				background: #363636;
			}
		}
	}
}
</style>
