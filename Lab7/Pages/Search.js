const { By, until, Key } = require("selenium-webdriver");
const Actions = require("../Actions.js");

module.exports = class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async UserAtSearchPage(searchText) {
        const searchField = searchText.replaceAll(" ", "%20");

        await this.actions.isUserOnPage(`https://hotline.ua/ua/sr/?q=${searchField}`);
    }

    async isHeaderVisible(headerText) {
        await this.actions.isElementWithTextVisibleCSS(
            "div.search__title",
            headerText);
    }

    async ClickOnFirstProduct() {
        await this.actions.clickButton('div.list-item__photo-text-container a');
    }
}
