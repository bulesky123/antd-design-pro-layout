const express = require('express')
const chalk = require('chalk')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const opn = require('opn')

const app = express()

const resolveRealPath = dir => path.join(__dirname, dir)

const entryFilePath = resolveRealPath('../dist/index.html')

const openStaticServer = () => {
  app.use('/static/js', express.static(resolveRealPath('../dist/static/js/')))
  app.use('/static/css', express.static(resolveRealPath('../dist/static/css/')))
  app.use('/static/img', express.static(resolveRealPath('../dist/static/img/')))
  app.use('/', express.static(resolveRealPath('../dist/')))

  app.get('*', (req, res) => {
    const content = fs.readFileSync(entryFilePath, 'utf8')
    res.send(content)
  })

  app.listen(3000, () => {
    console.log(chalk.cyan('Example app listening on port 3000!\n'))
    console.log(chalk.yellow('You Can Visit: ') + chalk.green('http://localhost:3000/'))
    opn('http://localhost:3000')
  })
}

const main = () => {
  const isExist = fs.existsSync(entryFilePath)
  if (isExist) {
    openStaticServer()
  } else {
    const commandStr = 'npm run release'
    const output = childProcess.execSync(commandStr, {
      cwd: process.cwd(),
      timeout: 60000,
      encoding: 'utf8',
    })
    openStaticServer()
    console.log(output)
  }
}

main()
