import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: () => import('../pages/home/index.vue')
	},
	{
		path: '/create',
		component: () => import('../pages/create/index.vue')
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
