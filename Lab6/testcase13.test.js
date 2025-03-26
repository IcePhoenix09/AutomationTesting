const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const ProductPage = require("./pages/ProductPage.js");


describe("TestCase13", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 13", async () => {
        const homePage = new HomePage(driver);
        const productPage = new ProductPage(driver);

        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify that home page is visible successfully
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click 'View Product' for any product on home page
        await productPage.clickOnViewProduct();

        // 5. Verify product detail is opened
        await productPage.isUserOnProductDetailPage();

        // 6. Increase quantity to 4
        await productPage.addQuantity(4);

        // 7. Click 'Add to cart' button
        await productPage.clickAddToCart();

        // 8. Click 'View Cart' button
        await productPage.clickViewCartButton();

        // 9. Verify that product is displayed in cart page with exact quantity
        await productPage.verifyProductInCart(0, 4);

    }, 15000);
});