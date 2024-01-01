import { readFileSync } from 'fs'
import PDFJS from 'pdfjs-dist'

let PDF = "/Users/abhash/Documents/resume/abhash-latest.pdf"
let data = readFileSync(PDF)

console.log(data)

let pdf = await PDFJS.getDocument(data).promise
let pageData = await pdf.getPage(1)
let textData = await pageData.getTextContent()

let sections = await pdf.getDestinations()
console.log(JSON.stringify(sections))

//let lastY = null
let simpleText = ""
textData.items.forEach((item) => {
    simpleText += item.str
    if (item.hasEOL) {
        simpleText += "\n"
    }
})
console.log(simpleText)


