const { By, until } = require("selenium-webdriver");
const Actions = require("./../Actions.js");

module.exports = class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async open() {
        await this.driver.get("http://automationexercise.com");
    }

    async isHomePageVisible() {
        return await this.driver.wait(
            until.elementLocated(By.css("div.carousel-inner")),
            5000
        );
    }

    async clickSignupLogin() {
        await this.driver.findElement(By.linkText("Signup / Login")).click();
    }

    async scrollToBottom() {
        await this.actions.scrollToBottom();
    }

    async isSubscriptionTextVisible() {
        await this.actions.isElementWithTextVisible("h2", "Subscription");
    }

    async subscribeWithEmail(email) {
        await this.driver.findElement(By.id("susbscribe_email")).sendKeys(email);
        await this.driver.findElement(By.id("subscribe")).click();
    }

    async isSubscriptionSuccessMessageVisible() {
        await this.actions.isElementWithTextVisible("div", "You have been successfully subscribed!");
    }
}
