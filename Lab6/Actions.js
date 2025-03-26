const { By, until } = require("selenium-webdriver");

module.exports = class Actions {
    constructor(driver) {
        this.driver = driver;
    }

    async clickButton(cssSelector) {
        await this.driver.findElement(By.css(cssSelector)).click();
    }

    async isUserOnPage(url) {
        const currentUrl = await this.driver.getCurrentUrl();
        expect(currentUrl).toBe(url);
    }

    async isElementVisible(cssSelector) {
        const element = await this.driver.findElement(By.css(cssSelector));
        expect(element.isDisplayed()).toBeTruthy();
    }

    async isElementWithTextVisible(tag, text) {
        const element = await this.driver.findElement(By.xpath(`//${tag}[contains(text(),'${text}')]`));
        expect(element.isDisplayed()).toBeTruthy();
    }

    async scrollToBottom() {
        const iframe = await this.driver.findElement(By.css("iframe"));

        await this.driver.switchTo().frame(iframe);

        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        await this.driver.switchTo().defaultContent();
    }

    async hoverAtElement(element) {
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: element }).perform();
    }

    async waitFor(cssLocator, timeout) {
        await this.driver.wait(
            until.elementIsVisible(this.driver.findElement(By.css(cssLocator))),
            timeout
        );
    }
}
