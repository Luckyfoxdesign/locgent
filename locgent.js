const { readdir, readFile, writeFile } = require("fs/promises")

;(async function () {
	let mailDirectories = []
	const SRC_PATH = "./src"
	const DEFAULT_FOlDERS = ["badge", "button", "core", "divider", "grid", "notice", "summary", "table", "typography"]

	console.log("\x1b[33m%s\x1b[0m", "... 📝 Checking directories in the src folder ...")

	await getFolders(SRC_PATH, mailDirectories, DEFAULT_FOlDERS).then(() => {
		mailDirectories.forEach(async (dirName) => {
			let srcFile = []
			let srcLocVars = []
			const EXAMPLE_FOLDER_PATH = `${SRC_PATH}/${dirName}/examples`

			console.log("\x1b[33m%s\x1b[0m", `... 📝 Opening the src file in the ${dirName} folder ...`)

			await readF(`${EXAMPLE_FOLDER_PATH}/src.html`, srcFile).then(async () => {
				let locFiles = []
				const LOC_FOLDER_PATH = `${SRC_PATH}/${dirName}/localizations/`
				const regexp = new RegExp("{[^}]*}", "g")
				const srcVars = Array.from(srcFile[0].matchAll(regexp))
				srcVars.forEach((e) => {
					srcLocVars.push(e[0].replace("{", "").replace("}", ""))
				})

				console.log("\x1b[33m%s\x1b[0m", `... 📝 Checking the loc files in the ${dirName} folder ...`)

				await getFolders(LOC_FOLDER_PATH, locFiles, DEFAULT_FOlDERS).then(() => {
					locFiles.forEach(async (locFileName) => {
						let localization = []

						console.log("\x1b[33m%s\x1b[0m", `... 📝 Reading the loc files in the ${dirName} folder...`)

						await readF(`${LOC_FOLDER_PATH}${locFileName}`, localization).then(async () => {
							let locFileData = JSON.parse(localization[0])
							let newSrcSource = srcFile[0]
							let fileName = `${locFileName.replace(".json", "")}.html`

							srcLocVars.forEach((locVar) => {
								for (locVar in locFileData) {
									if (locFileData.hasOwnProperty(locVar)) {
										newSrcSource = newSrcSource.replace(`{${locVar}}`, locFileData[locVar])
									}
								}
							})

							console.log(
								"\x1b[33m%s\x1b[0m",
								`... 📝 Writing a new localization in to the ${fileName} in the ${dirName} folder ...`
							)

							await writeF(`${EXAMPLE_FOLDER_PATH}/${fileName}`, newSrcSource)
						})
					})
				})
			})
		})
	})
})()

async function getFolders(path, output, defaultFolders) {
	const filePromise = readdir(path, { encoding: "utf8" })

	for (const name of await filePromise) {
		let dirName = defaultFolders.find((defaultFolderName) => defaultFolderName === name)
		if (dirName === undefined) {
			output.push(name)
		}
	}
}

async function readF(path, output) {
	await readFile(path, { encoding: "utf8" }).then((readingFileResult) => {
		output.push(readingFileResult)
	})
}

async function writeF(path, data) {
	await writeFile(path, data)
}
