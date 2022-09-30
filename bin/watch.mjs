import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import readline from 'readline'

const query = new URLSearchParams(import.meta.url.split('?')[1])
const debug = query.has('debug')

/** The log will display on the next screen */
function clearConsole() {
	const blank = '\n'.repeat(process.stdout.rows)
	console.log(blank)
	readline.cursorTo(process.stdout, 0, 0)
	readline.clearScreenDown(process.stdout)
}

function watchPreload(server) {
	return build({
		configFile: 'preload/vite.config.ts',
		mode: 'development',
		plugins: [
			{
				name: 'electron-preload-watcher',
				writeBundle() {
					clearConsole()
					server.ws.send({ type: 'full-reload' })
				},
			},
		],
		build: {
			watch: {},
		},
	})
}

// Block the CTRL + C shortcut on a Windows terminal and exit the application without displaying a query
if (process.platform === 'win32') {
	readline.createInterface({ input: process.stdin, output: process.stdout }).on('SIGINT', () => {
		console.log('exit')
		process.exit()
	})
}

// bootstrap
const server = await createServer({ configFile: 'vite.config.ts' })

await server.listen()
await watchPreload(server)
