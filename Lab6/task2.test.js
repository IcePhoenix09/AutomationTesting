const { Builder, By, until } = require('selenium-webdriver');

describe("Task2", () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    }, 10000);

    afterAll(async () => {
        await driver.quit();
    });

    test("Menu test", async () => {
        const navMenu = await driver.findElement(By.className('nav navbar-nav'));
        const homeButton = await navMenu.findElement(By.css('li a'));
        let elementText = await homeButton.getText();
        expect(elementText).toBe('Home');
    });

    test("Logo test", async () => {
        const logo = await driver.findElement(By.css('div.logo.pull-left img'));
        const logoSrc = await logo.getAttribute('src');
        const altText = await logo.getAttribute('alt');

        expect(logoSrc).toBe('https://automationexercise.com/static/images/home/logo.png');
        expect(altText).toBe('Website for automation practice');
    });

    test("Signup/Login test", async () => {
        const signupButton = await driver.findElement(By.xpath('//a[contains(text(), "Signup / Login")]'));
        const buttonText = await signupButton.getText();

        expect(buttonText).toBe('Signup / Login');
    });
});
