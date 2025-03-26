const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");


describe("TestCase10", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 10", async () => {
        const homePage = new HomePage(driver);
    
        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4.  Scroll down to footer
        await homePage.scrollToBottom();

        // 5. Verify text 'SUBSCRIPTION'
        await homePage.isSubscriptionTextVisible();
        
        // 6. Enter email address in input and click arrow button
        await homePage.subscribeWithEmail("test@tt");

        //7. Verify success message 'You have been successfully subscribed!' is visible
        await homePage.isSubscriptionSuccessMessageVisible();

    }, 10000);
});