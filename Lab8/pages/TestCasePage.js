import { By, until } from "selenium-webdriver";
import Actions from "./../Actions.js";
import { expect } from "chai";

export default class TestCasePage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async isUserOnPage() {
        await this.actions.isUserOnPage("https://automationexercise.com/test_cases");
    }

    async clickButton() {
        await this.actions.clickButton("ul.nav.navbar-nav li a[href='/test_cases']");
    }
}
