const puppeteer = require("puppeteer");
const path = require("path");
const list = require("../data/list.js");

let myList = list.map(el => el.replace(/\s+/g, ' ').trim());
myList = [...new Set(myList)]
  .sort((a, b) => a.localeCompare(b))
  .map((el) => {
    return el
      .split(" ")
      .map((x) => capitalizeFirstLetter(x.trim()))
      .join(" ");
  });

let offset = 0;
for (let i = 0; i < myList.length; i++) {
  setTimeout(() => {
    (async () => {
      await printPDF(myList[i]);
      console.log(i + 1 + ". Готово: " + myList[i]);
    })();
  }, 10000 + offset);
  offset += 10000;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function printPDF(name) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("file:///" + path.resolve("./data/index.html#" + name), {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A4",
    path: "./result/" + name + ".pdf",
    printBackground: true,
  });
  await page.close();
  await browser.close();
  return pdf;
}
