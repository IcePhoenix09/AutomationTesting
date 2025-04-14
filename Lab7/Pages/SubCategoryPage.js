const { By, until, Key } = require("selenium-webdriver");
const Actions = require("../Actions.js");

module.exports = class ProductDetailPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async isHeaderVisible() {
        await this.actions.isElementWithTextVisibleCSS(
            "h1.catalog-title__main",
            "Джерела безперебійного живлення (ДБЖ)"
        )
    }

    async setFilterPrice(minPrice, maxPrice) {
        const container = await this.driver.findElement(By.css("div.filter-price"));
        const inputFields = await container.findElements(By.css("input.filter-price__range-field"));

        const minPriceInput = inputFields[0];
        const maxPriceInput = inputFields[1];

        await minPriceInput.clear();
        await minPriceInput.sendKeys(minPrice);

        // For some reason, the clear method doesn't work on second input field
        // await maxPriceInput.clear();
        await maxPriceInput.sendKeys(Key.CONTROL, 'a');
        await maxPriceInput.sendKeys(Key.BACK_SPACE);
        await maxPriceInput.sendKeys(maxPrice);

        const applyButton = await this.driver.findElement(By.css("button.filter-price__range-btn"));
        await applyButton.click();
    }

    async clickOnFirstProduct() {
        const productLocator = "div.list-item__info a.item-title"
        const loaderLocator = "div.catalog-list__preloader";

        await this.actions.waitUntilVisible(productLocator, 10000);
        await this.actions.waitUntilDisappears(loaderLocator, 10000);
        await this.actions.clickButton(productLocator);
    }

    async selectFilterItem(name) {
        const link = await this.driver.findElement(By.xpath(`//a[span[contains(normalize-space(text()), '${name}')]]`));
        await link.click();
    }

    async selectFilterItem2(name) {
        const link = await this.driver.findElement(By.xpath(`//span[contains(normalize-space(text()), '${name}')]`));
        await link.click();
    }

    async searchInFilter(filterName) {
        const inputField = await this.driver.findElement(By.css("input.field"));
        await inputField.sendKeys(filterName);
        await inputField.sendKeys(Key.RETURN);
    }
}
