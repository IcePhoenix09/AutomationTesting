import { By, until } from "selenium-webdriver";
import { expect } from "chai";
import Actions from "./../Actions.js";

class AccountPage {
    constructor(driver) {
        this.driver = driver;
        this.action = new Actions(driver);
    }

    async isLoggedIn(username) {
        await this.action.waitUntilVisible(
            "li:has(b)",
            5000
        )

        const loggedInElement = await this.driver.findElement(
            By.css("li:has(b)")
        );
        
        const elementText = await loggedInElement.getText();
        
        expect(elementText).contain(`Logged in as ${username}`);
    }

    async clickDeleteAccount() {
        await this.driver.findElement(By.linkText("Delete Account")).click();
    }

    async isAccountDeletedVisible() {
        await this.driver.wait(
            until.elementLocated(By.xpath("//b[contains(text(),'Account Deleted!')]")),
            5000
        );
    }

    async clickLogout() {
        await this.driver.findElement(By.linkText("Logout")).click();
    }

    async isUserOnLoginPage() {
        const currentUrl = await this.driver.getCurrentUrl();
        expect(currentUrl).to.equal("https://automationexercise.com/login");
    }
}

export default AccountPage;
