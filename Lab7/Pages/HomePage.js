const { By, Key, until } = require("selenium-webdriver");
const MyActions = require("../Actions.js");

module.exports = class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new MyActions(driver);
    }

    async open() {
        await this.driver.get("https://hotline.ua/");
    }

    async isHomePageVisible() {
        return await this.driver.wait(
            until.elementLocated(By.id("__layout")),
            5000
        );
    }

    async EnterAtSearch() {
        const container = await this.driver.findElement(By.id("autosuggest"));
        const inputField = await container.findElement(By.css("input"));

        await inputField.sendKeys("Volt Polska");
        await inputField.sendKeys(Key.RETURN);
    }

    async clickOnPowerCategory(){
        const element = await this.driver.findElement(
            By.xpath("//*[@id='__layout']/div/div[1]/main/section[2]/div/a[3]"));
        element.click();
    }

    async clickOnPowerCategoryOverlayed(){
        const element = await this.driver.findElement(
            By.css("li a[href='/ua/power/']"));

        await this.driver.wait(until.elementIsVisible(element));
        await this.driver.wait(until.elementIsEnabled(element));

        await this.actions.hoverAtElement(element);

        await this.driver.sleep(500);


        element.click();
    }

    async clickOnCategoryButton() {
        const element = await this.driver.findElement(
            By.css("div.header-catalog-button div.button-menu-main"));

        await this.driver.wait(until.elementIsVisible(element));
        await this.driver.wait(until.elementIsEnabled(element));

        await this.actions.hoverAtElement(element);

        await this.driver.sleep(500);

        await element.click();
    }
}
