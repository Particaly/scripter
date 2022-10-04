import { fork } from 'child_process'
import { resolve } from "path";
import { Core } from "./Core";

const file = resolve(__dirname, './node_modules/npm/index.js')

window.npm = {
	install(dir: string) {
		fork(file, ['install'], {
			cwd: dir,
			stdio: 'inherit'
		})
	},
}
window.api = Core;
