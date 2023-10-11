const { Builder, By } = require("selenium-webdriver");

describe("Castling in a Fischer Random game", function () {
  jest.setTimeout(30000);
  let driver;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("Castling in a Fischer Random game", async function () {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.findElement(By.css(".e2 > img")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".b8 > img")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f1 > img")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".b7 > img")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".b6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e1")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g1")).click();
  });
});
