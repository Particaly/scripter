<template>
	<router-view></router-view>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()
function checkParams(params) {
	if (params) {
		const {code, type, payload} = params;
		switch (type) {
			case "files": {
				router.push('/create')
				break
			}
			default: {
				break
			}
		}
	}
	console.log(params);
}
window.utools.onPluginEnter(checkParams)
</script>

<style lang="scss">
#app {
	background: #363636;
}
</style>
