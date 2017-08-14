const fs = require('fs')
const path = require('path')
const svgson = require('svgson')
const generate = require('./generate')

const ICON_DIR = path.join(__dirname, '..', 'node_modules', '@mapbox', 'maki', 'icons')

class Asset {
  constructor (filename, svgJSON) {
    this.filename = filename
    this.svgJSON = svgJSON
  }
}

async function getAllFilenames () {
  return new Promise ((resolve, reject) => {
    fs.readdir(ICON_DIR, 'utf-8', resolvePromise(resolve, reject))
  })
}

async function readSVGfile (filename) {
  return new Promise ((resolve, reject) => {
    const filePath = `${ICON_DIR}/${filename}`
    console.log(`Generating component for ${filename}`)
    fs.readFile(filePath, resolvePromise(resolve, reject))
  })
}

async function convertSVGToJSON (filename, svgData) {
  return new Promise ((resolve, _reject) => {
    svgson(svgData, { svgo: true, title: filename }, (svgJSON) => {
      return resolve(svgJSON)
    })
  })
}

function resolvePromise (resolve, reject) {
  return function (err, data) {
    if (err) {
      return reject(err)
    }
    return resolve(data)
  }
}

async function main () {
  const assets = []

  try {
    const filenames = await getAllFilenames()

    for (let filename of filenames) {
      const svgData = await readSVGfile(filename)
      const svgJSON = await convertSVGToJSON(filename, svgData)
      const asset = new Asset(filename, svgJSON)
      assets.push(asset)
    }

    generate(assets)
  } catch (e) {
    console.log(e)
  }
}

main()
