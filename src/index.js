const puppeteer = require("puppeteer");
const path = require("path");
const list = require("../data/list.js");

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

  await browser.close();
  return pdf;
}

list.forEach((fio) => printPDF(fio));
