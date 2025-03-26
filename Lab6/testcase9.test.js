const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const ProductPage = require("./pages/ProductPage.js");


describe("TestCase9", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 9", async () => {
        const homePage = new HomePage(driver);
        const productPage = new ProductPage(driver);

    
        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click on 'Test Cases' button
        await productPage.clickProductButton();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        await productPage.isUserOnPage();

        // 6. Enter product name in search input and click search button
        await productPage.searchProduct("Blue");

        // 7. Verify 'SEARCHED PRODUCTS' is visible
        await productPage.isSearchProductLabelVisible();

        // 8. Verify all the products related to search are visible
        await productPage.isProductVisible("Blue");
    }, 10000);
});