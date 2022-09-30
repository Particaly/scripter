const { fork } = require('child_process')
const { resolve } = require('path')
const { ipcRenderer } = require('electron')

const file = resolve(__dirname, './node_modules/npm/index.js')

function installDependencies(dir: string) {
	fork(file, ['install'], {
		cwd: dir,
		shell: true,
		windowsHide: true,
		stdio: 'inherit'
	})
}

// ipcRenderer.exp
