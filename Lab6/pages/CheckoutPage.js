const { By, until } = require("selenium-webdriver");
const Actions = require("./../Actions.js");

module.exports = class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async verifyAddressDetails(firstName, lastName, address, city, state, zipcode, country, mobile) {
        await this.actions.isElementWithTextVisible("li", `${firstName} ${lastName}`);
        await this.actions.isElementWithTextVisible("li", address);
        await this.actions.isElementWithTextVisible("li", country);
        await this.actions.isElementWithTextVisible("li", mobile);

        const element = await this.driver.findElement
        (By.css("div.checkout-information li.address_city.address_state_name.address_postcode"));
        const cityStateZipcode = await element.getText();
        expect(cityStateZipcode).toBe(`${city} ${state} ${zipcode}`);

        await this.actions.isElementWithTextVisible("h2", "Review Your Order");
    }

    async enterDescription(description) {
        const messageDiv = await this.driver.findElement(By.id("ordermsg"));

        await messageDiv.findElement(By.css("textarea")).sendKeys(description);
    }

    async clickPlaceOrder() {
        await this.actions.clickButton("a[href='/payment']");
    }

}
