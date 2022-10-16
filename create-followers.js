module.exports = async (page, INSTAGRAM_USERNAME) => {
  await page.goto("https://lionsprovedor.com");
  await page.select("#orderform-category", "1135");
  await page.select("#orderform-service", "140");
  await page.focus("#field-orderform-fields-link");
  await page.keyboard.type(`https://www.instagram.com/${INSTAGRAM_USERNAME}/`);
  await page.focus("#field-orderform-fields-quantity");
  await page.keyboard.type("10");
  await page.evaluate(() => {
    document
      .querySelector("#order-form")
      .querySelector("button[type=submit]")
      .click();
  });
  await page.waitForNavigation();
  const url = page.url();
  const orderId = url.split("/")[4];
  return orderId;
};
