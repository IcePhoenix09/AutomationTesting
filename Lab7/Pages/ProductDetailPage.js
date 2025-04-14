const { By, until } = require("selenium-webdriver");
const Actions = require("../Actions.js");

module.exports = class ProductDetailPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async isUserOnPage() {
        await this.actions.waitUntilVisible("div.price", 3000);
        await this.actions.waitUntilVisible("div.specifications", 3000);
    }

    async isPriceInRange(minPrice, maxPrice) {
        await this.actions.waitUntilVisible("div.many__price", 5000);

        const constainer = await this.driver.findElement(By.css("div.many__price"));
        const priceElement = await constainer.findElements(By.css("span.price__value"));

        const minPriceOnPageString = await priceElement[0].getText();
        const maxPriceOnPageString = await priceElement[1].getText();

        const minPriceOnPage = parseInt(minPriceOnPageString.replace(/\s/g, ""));
        const maxPriceOnPage = parseInt(maxPriceOnPageString.replace(/\s/g, ""));

        expect(minPriceOnPage).toBeGreaterThanOrEqual(minPrice);
        expect(maxPriceOnPage).toBeLessThanOrEqual(maxPrice);
    }

    async productCharacteristicsContains(text) {
        await this.actions.isElementWithTextVisibleCSS(
            "span.specifications-list",
            text
        )
    }   
}
