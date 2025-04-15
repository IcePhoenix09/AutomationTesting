import { By, until } from "selenium-webdriver";
import Actions from "./../Actions.js";
import { expect } from "chai";


export default class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }
    async clickCartButton() {
        await this.actions.clickButton("ul.nav.navbar-nav li a[href='/view_cart']");
    }

    async clickCheckoutButton() {
        const section = await this.driver.findElement(By.id("do_action"));

        await section.findElement(By.css("a")).click();
    }

    async isPageVisible() {
        await this.actions.isUserOnPage("https://automationexercise.com/view_cart");
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

    async clickRegisterLogin(){
        await this.actions.waitFor('div.modal-content', 3000);

        await this.actions.clickButton("div.modal-content div.modal-body a[href='/login']");
    }

    async clickContinueOnCart() {
        await this.actions.waitFor('div.modal-content', 3000);

        await this.actions.clickButton("div.modal-content div.modal-footer button");
    }
}
