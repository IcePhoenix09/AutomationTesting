const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const CartPage = require("./pages/CartPage.js");


describe("TestCase11", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 11", async () => {
        const homePage = new HomePage(driver);
        const cartPage = new CartPage(driver);

        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click 'Cart' button
        await cartPage.clickCartButton();

        // 5. Scroll down to footer
        await cartPage.scrollToBottom();

        // 5. Verify text 'SUBSCRIPTION'
        await cartPage.isSubscriptionTextVisible();
        
        // 6. Enter email address in input and click arrow button
        await cartPage.subscribeWithEmail("test@tt");

        //7. Verify success message 'You have been successfully subscribed!' is visible
        await cartPage.isSubscriptionSuccessMessageVisible();

    }, 10000);
});