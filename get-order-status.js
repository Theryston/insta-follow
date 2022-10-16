module.exports = async (page, orderId) => {
  await page.goto(`https://lionsprovedor.com/registros?search=${orderId}`);
  const { status } = await page.evaluate(() => {
    const table = document.querySelector(".table");
    const status = table.querySelectorAll("td")[7].innerText;
    return { status };
  });
  return status;
};
