const fs = require('fs-extra')
const path = require('path')

const createDir = (dirPath) => {
    return fs.mkdirSync(path.join(__dirname, dirPath), {recursive: true})
}

const createFile = (path, data) => {
    fs.writeFileSync(path, data)
}
const readFile = (path) => {
    return fs.readFileSync(path,  {encoding: "utf8"})
}

const collect = (value, previous) => {
    return previous.concat([value]);
  }
  

module.exports = {
    createDir,
    createFile,
    readFile,
    collect
}