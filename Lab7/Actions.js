const { By, until } = require("selenium-webdriver");

module.exports = class Actions {
    constructor(driver) {
        this.driver = driver;
    }

    async clickButton(cssSelector) {
        await this.driver.findElement(By.css(cssSelector)).click();
    }

    async isUserOnPage(url, timeout = 5000) {
        await this.driver.wait(until.urlContains(url), timeout);
    }

    async isElementVisible(cssSelector) {
        const element = await this.driver.findElement(By.css(cssSelector));
        expect(element.isDisplayed()).toBeTruthy();
    }

    async isElementWithTextVisibleXPath(tag, text) {
        const element = await this.driver.findElement(By.xpath(`//${tag}[contains(text(),'${text}')]`));
        expect(element.isDisplayed()).toBeTruthy();
    }

    async isElementWithTextVisibleCSS(cssLocator, text) {
        const element = await this.driver.wait(
            until.elementLocated(By.css(cssLocator)),
            5000,
            `Element with locator "${cssLocator}" not found`
        );
        
        const elementText = await element.getText();
        expect(elementText).toContain(text);
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

    async waitUntilVisible(cssLocator, timeout) {
        await this.driver.wait(
            until.elementLocated(By.css(cssLocator)),
            timeout
        );
        await this.driver.wait(
            until.elementIsVisible(this.driver.findElement(By.css(cssLocator))),
            timeout
        );
        await this.driver.wait(
            until.elementIsEnabled(this.driver.findElement(By.css(cssLocator))),
            timeout
          );
    }

    async waitUntilDisappears(cssLocator, timeout) {
        try {
            await this.driver.wait(
                until.elementLocated(By.css(cssLocator)),
                timeout
            );
        } catch (e) {
            // If element never appeared, maybe it's already gone — that's okay
            return;
        }
    
        // Wait for element to become not visible
        const element = await this.driver.findElement(By.css(cssLocator));
        await this.driver.wait(
            async () => {
                try {
                    return !(await element.isDisplayed());
                } catch (e) {
                    // If the element gets detached from the DOM
                    return true;
                }
            },
            timeout
        );
    }

    async enterText(cssSelector, text) {
        const inputField = await this.driver.findElement(By.css(cssSelector));
        await inputField.sendKeys(text);
    }
}
