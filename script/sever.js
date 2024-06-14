module.exports.config = {
  name: 'server',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt', 'openai'],
  description: "descriptio",
  usage: "usage",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({
  api, event, args
}) {
  const puppeteer = require('puppeteer');
  const cheerio = require('cheerio');
  
  let url = 'https://aternos.org/go';
  let opt = args.join("")
  
  const browser = await puppeteer.connect({
    browserWSEndpoint: "wss://brd-customer-hl_50ef5fb0-zone-scraping_browser1:0nb7ehl6m8tu@brd.superproxy.io:9222",
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);
  
  //password 
  await page.evaluate(() => {
    document.querySelector('.login-form .password').removeAttribute('type');
  });
  await page.type('.login-form .password', 'jameslimmabango')
//username
  await page.waitForSelector('.login-form .username');
  await page.type('.login-form .username', 'limjamezsz4040')
  //submit
  await page.click('.login-button')
  
  const cont = await page.content();

const $ = cheerio.load(cont);
  const check = $('.statuslabel-label-container .statuslabel-label').text();


  const status = check.replace(/\s/g, "");
  
  if (opt == "status") {
  if (status == "Offline") {
    api.sendMessage(`status: Offline\n use !𝘀𝗲𝗿𝘃𝗲𝗿 𝘀𝘁𝗮𝗿𝘁 to start the server.`, threadID, messageID);
  };
   if (status == "Online") {
    api.sendMessage(`status: Online`, threadID, messageID);
  };
  };
  
  if (opt == "start") {
   if (status == "Online") {
    api.sendMessage(`SERVER IS ALREADY ONLINE!`, threadID, messageID);
  };
  if (status == "Offline") {
    api.sendMessage("starting, please wait...")
    await page.click('.server-actions #start')
  await page.evaluate(() => {
  hideAlert();
});
  };
  }

  
};
