

const { By, until } = require("selenium-webdriver");
const Actions = require("../Actions.js");

module.exports = class CategoryPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async isUserOnCategoryPage(categoryName) {
        await this.actions.isUserOnPage(`https://hotline.ua/ua/${categoryName}/`);
    }

    async isHeaderVisible(headerText) {
        await this.actions.isElementWithTextVisibleCSS(
            "h1.title-page",
            headerText);
    }
    
    async clickOnOptionsCategory(){

        // const element = await driver.findElement(By.css('a[href="/ua/computer/istochniki-besperebojnogo-pitaniya/"]'));
        // await element.click();

        await this.driver.wait(
            until.elementLocated(By.xpath("//div[contains(text(), 'Джерела безперебійного живлення (ДБЖ)')]")),
            5000
        );

        const element = await this.driver.findElement(
            By.xpath("//div[contains(text(), 'Джерела безперебійного живлення (ДБЖ)')]"));


        await element.click();
    }
}
