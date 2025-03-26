const { By, until } = require("selenium-webdriver");

class AccountPage {
    constructor(driver) {
        this.driver = driver;
    }

    async isLoggedIn(username) {
        const loggedInElement = await this.driver.findElement(
            By.css("li:has(b)")
        );
        
        const elementText = await loggedInElement.getText();
        expect(elementText).toContain(`Logged in as ${username}`);
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
        expect(currentUrl).toBe("https://automationexercise.com/login");
    }
}

module.exports = AccountPage;
