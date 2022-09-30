const node = window.utools.getPath('exe')
const {fork, spawn} = require('child_process')
const {resolve} = require('path')

const file = resolve(__dirname, '../node_modules/npm/index.js')
const packageDir = resolve(__dirname, '../test')
console.log(node, file, packageDir);

const electron = require('electron')
console.log(electron);
fork(`${file}`, ['install'], {
	cwd: packageDir,
	shell: true,
	windowsHide: true,
	stdio: 'inherit'
})
