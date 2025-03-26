const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const ProductPage = require("./pages/ProductPage.js");


describe("TestCase8", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 8", async () => {
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

        // 6. The products list is visible
        await productPage.isListVisible();

        // 7. Click on 'View Product' of first product
        await productPage.clickOnViewProduct();

        // 8. User is landed to product detail page
        await productPage.isUserOnProductDetailPage();

        // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
        await productPage.isProductInfoVisible();


    }, 15000);
});