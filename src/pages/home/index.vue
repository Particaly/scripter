<template>
	<div class="Home">
		<Nav @switch="actions.whenSwitchNav"></Nav>
	</div>
</template>

<script setup>
import Nav from "./nav.vue";
import {provide, reactive} from "vue";

const list = reactive([
	{
		name: '已安装的脚本',
		checked: true
	},
	{
		name: '设置',
		checked: false
	},
	{
		name: '关于',
		checked: false
	}
])
provide('nav-list', list);

const actions = {
	whenSwitchNav(nav) {
		list.forEach(item => {
			item.checked = nav === item;
		})
	}
}

</script>

<style scoped lang="scss">
.Home {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 200px 1fr;
}
</style>
