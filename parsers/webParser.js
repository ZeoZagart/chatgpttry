import * as cheerio from 'cheerio'
import * as puppeteer from "puppeteer";

//const url = 'https://www.coinbase.com/careers/positions/4572705';
const url = 'https://careers.google.com/jobs/results/79052159854748358/'


let html = await getPageHtml(url)
const $ = cheerio.load(html);

$('button, header, footer, [name*="header"], [name*="footer"], [name*="sidebar"], [id*="header"], [id*="footer"], [id*="sidebar"], [class*="footer"], [class*="sidebar"]').remove();

const elements = $('h2, h3, p, li');

let description = '';

let ignoringList = false
for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    const elementText = $(element).text();
    if (isEmpty(elementText)) {
        continue
    }
    if (isInList(element)) {
        if (ignoringList) {
            continue;
        }
        description += '*'
    } else {
        ignoringList = false;
    }
    if (is(element, 'p')) {
        description += '\n'
    }
    if (isIgnorablePara(elementText)) {
        // if next is list --> ignore it
        if (is(elements[i + 1],'ul')) {
            ignoringList = true
        }
    } else {
        if (is(elements[i + 1],'ul')) {
            description += '\n';
        }
        let addable = elementText.trim()
        description += addable + '\n';
    }
}

console.log(description);

function isEmpty(txt) {
    if (txt == null) return true
    return txt.trim() == ""
}

function isIgnorablePara(txt) {
    if (typeof txt != "string") {
        return false
    }
    let text = txt.toLowerCase()
    return text.includes("general data protection regulation") ||
            text.includes("california consumer privacy") ||
            text.includes("equal opportunity") ||
            text.includes("accommodation because of a disability") ||
            text.includes("data privacy notice") ||
            text.includes("privacy policy") ||
            text.includes("covid vaccination")
}

function isInList(element, count = 0) {
    if (element['tagName'] == null || count > 2) return false;
    return element['tagName'] === 'li' || isInList(element['parent'], count + 1)
}

function is(element, other) {
    if (element == null) return false
    return element['tagName'] === other
}

async function getPageHtml(url) {
    let browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url)
    let op = await page.content()
    await browser.close()
    return op
}

async function fastPageHtml(url) {
    let page = await fetch(url)
    return page.text()
}



