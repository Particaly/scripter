const { fork } = require('child_process')
const { resolve } = require('path')
const { contextBridge } = require('electron')

const file = resolve(__dirname, './node_modules/npm/index.js')

window.npm = {
	install(dir: string) {
		fork(file, ['install'], {
			cwd: dir,
			shell: true,
			windowsHide: true,
			stdio: 'inherit'
		})
	}
}
