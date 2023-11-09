const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('En passant capture and promote', function() {
  jest.setTimeout(60000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('En passant capture and promote', async function() {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.wait(until.elementLocated(By.css(".h2 > svg"))).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h4 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h5 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a5 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g6 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a4 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a3")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("PawnPromotionDialog-Button-promote")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".a3 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".b2 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".h8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f8 > svg")).click();
  })
})
