const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const ContactFormPage = require("./pages/ContactFormPage.js");
const TestCasePage = require("./pages/TestCasePage.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase7", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 7", async () => {
        const homePage = new HomePage(driver);
        const contactFormPage = new ContactFormPage(driver);
        const testCasePage = new TestCasePage(driver);

    
        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click on 'Test Cases' button
        await testCasePage.clickButton();

        // 5. Verify user is navigated to test cases page successfully
        await testCasePage.isUserOnPage();
    }, 5000);
});