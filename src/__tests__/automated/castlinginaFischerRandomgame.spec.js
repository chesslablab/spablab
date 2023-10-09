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
        By.id("LoadFenDialog-TextField-variant")
      );
      await driver
        .actions({ bridge: true })
        .moveToElement(element)
        .clickAndHold()
        .perform();
    }
    await driver
      .findElement(By.id("LoadFenDialog-TextField-variant-MenuItem-960"))
      .click();
    await driver
      .findElement(By.id("LoadFenDialog-TextField-startPos"))
      .sendKeys("RNBQKBRN");
    await driver.findElement(By.id("LoadFenDialog-Button-load")).click();
    await driver.findElement(By.css(".e2 > img")).click();
    await driver.findElement(By.css(".e4")).click();
    await driver.findElement(By.css(".b8 > img")).click();
    await driver.findElement(By.css(".c6")).click();
    await driver.findElement(By.css(".f1 > img")).click();
    await driver.findElement(By.css(".c4")).click();
    await driver.findElement(By.css(".b7 > img")).click();
    await driver.findElement(By.css(".b6")).click();
    await driver.findElement(By.css(".e1")).click();
    await driver.findElement(By.css(".g1")).click();
  });
});
