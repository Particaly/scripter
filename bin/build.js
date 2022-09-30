const { spawn } = require('child_process')
const { build } = require('vite')
const { resolve } = require("path")

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
	const task = spawn(a, [t.join(' ')], {
		cwd: dir,
		...defaultShellOptions
	})
	return new Promise(resolve => {
		task.on('close', resolve)
	})
}

const dist = resolve(__dirname, '../dist')

buildInterface()
	.then(buildPreload)
	.then(() => {
	    return runScript('npm init -y', dist)
	})
	.then(() => {
	    return runScript('npm install npm', dist)
	})
