const puppeteer = require("puppeteer");
const createFollowers = require("./create-followers");
const getOrderStatus = require("./get-order-status");
const sleep = require("./sleep");

const INSTAGRAM_USERNAME = "_theryston_";
const MAX_RETRIES = 1000;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 60 * 60 * 1000,
  });
  const page = await browser.newPage();
  await page.goto("https://lionsprovedor.com");
  console.log("Waiting for login...");
  await page.waitForNavigation();
  console.log("Logged in!");

  let followers = 0;
  for (let i = 0; i < MAX_RETRIES; i++) {
    const orderId = await createFollowers(page, INSTAGRAM_USERNAME);
    console.log(`Order created! Order ID: ${orderId}`);
    let status = "";
    while (status !== "Concluído") {
      status = await getOrderStatus(page, orderId);
      console.log(`Order status: ${status}`);
      await sleep(10000);
    }
    followers += 10;
    console.log(`Followers: ${followers}`);
    console.log(`Attempt number ${i + 1} of ${MAX_RETRIES} completed!`);
  }

  await browser.close();
  console.log(`Finished! Followers: ${followers}`);
})();
