const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Play C50", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("Play C50", async function () {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.manage().window().setRect({ width: 1366, height: 742 });
    await driver.findElement(By.id("Nav-analysisBoard")).click();
    await driver
      .findElement(By.id("Nav-analysisBoard-MenuItem-fenString"))
      .click();
    await driver.findElement(By.id("LoadFenDialog-TextField-fen")).click();
    await driver
      .findElement(By.id("LoadFenDialog-TextField-fen"))
      .sendKeys("rnbqkbrn/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBRN w KQkq -");
    {
      const element = await driver.findElement(
        By.id("TextField-variant")
      );
      await driver
        .actions({ bridge: true })
        .moveToElement(element)
        .clickAndHold()
        .perform();
    }
    await driver
      .findElement(By.id("TextField-variant-MenuItem-960"))
      .click();
    await driver
      .findElement(By.id("Variant-TextField-startPos"))
      .sendKeys("RNBQKBRN");
    await driver.findElement(By.id("LoadFenDialog-Button-load")).click();
    await driver.findElement(By.css(".e2 > img")).click();
    await driver.findElement(By.css(".e4")).click();
    await driver.findElement(By.css(".e7 > img")).click();
    await driver.findElement(By.css(".e5")).click();
    await driver.findElement(By.css(".g1 > img")).click();
    await driver.findElement(By.css(".f3")).click();
    await driver.findElement(By.css(".b8 > img")).click();
    await driver.findElement(By.css(".c6")).click();
    await driver.findElement(By.css(".f1 > img")).click();
    await driver.findElement(By.css(".c4")).click();
  });
});
