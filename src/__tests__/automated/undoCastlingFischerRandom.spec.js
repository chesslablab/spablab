const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { getDriver, stopDriver } = require('./helpers'); // You'll need to implement these helper functions to start and stop the WebDriver.

describe('Undo castling in a Fischer Random game', () => {
  let driver;

  beforeAll(async () => {
    driver = getDriver();
  });

  afterAll(async () => {
    stopDriver(driver);
  });

  it('Undo castling in a Fischer Random game', async () => {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.manage().window().setRect({ width: 1366, height: 742 });

    await driver.findElement(By.id("Nav-analysisBoard")).click();
    await driver.findElement(By.id("Nav-analysisBoard-MenuItem-fenString")).click();
    await driver.findElement(By.id("LoadFenDialog-TextField-fen")).click();
    await driver.findElement(By.id("LoadFenDialog-TextField-fen")).sendKeys("qnrnbkrb/pppppppp/8/8/8/8/PPPPPPPP/QNRNBKRB w KQkq -");

    const variantElement = await driver.findElement(By.id("TextField-variant"));
    await driver.actions({ bridge: true }).moveToElement(variantElement).click().perform();

    await driver.findElement(By.id("TextField-variant-MenuItem-960")).click();
    await driver.findElement(By.id("Variant-TextField-startPos")).sendKeys("QNRNBKRB");
    await driver.findElement(By.id("LoadFenDialog-Button-load")).click();
    await driver.findElement(By.css(".f1 > img")).click();
    await driver.findElement(By.css(".g1")).click();
    await driver.findElement(By.css(".f8 > img")).click();
    await driver.findElement(By.css(".g8")).click();

    await driver.findElement(By.id("StartedButtons-Button-undoMove")).click();
    await driver.findElement(By.id("StartedButtons-Button-undoMove")).click();
  });
});
