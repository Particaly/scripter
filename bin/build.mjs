import { spawn } from 'child_process'
import { build } from 'vite'
import { resolve } from "path";
import url from 'url'

const defaultShellOptions = {
	shell: true,
	windowsHide: true,
	stdio: 'inherit'
}

function buildPreload() {
	return build({
		configFile: 'preload/vite.config.ts',
		mode: 'production',
	})
}

function buildInterface() {
	const child = spawn('vue-tsc --noEmit && vite build', [], {
		...defaultShellOptions
	})
	return new Promise(resolve => {
		child.on('close', resolve)
	})
}

function runScript(script, dir) {
	const t = script.split(' ');
	const a = t.shift();
	console.log(a, t);
	console.log(dir);
	const task = spawn(a, [t.join(' ')], {
		cwd: dir,
		...defaultShellOptions
	})
	return new Promise(resolve => {
		task.on('close', resolve)
		task.stderr.on('data', chunk => {
			console.log(chunk.toString());
		})
	})
}

Object.defineProperty(global, '__dirname', {
	get() {
		return url.fileURLToPath(import.meta.url)
	},
	enumerable: true,
	configurable: false
})

const dist = resolve(global.__dirname, '../dist')

// buildInterface()
// 	.then(buildPreload)
// 	.then(() => {
// 	    return runScript('npm init -y', dist)
// 	})
// 	.then(() => {
// 	    return runScript('npm install npm', dist)
// 	})
spawn('npm install', [], {
	cwd: dist,
	shell: true
})
