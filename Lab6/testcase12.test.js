const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const CartPage = require("./pages/CartPage.js");
const ProductPage = require("./pages/ProductPage.js");


describe("TestCase12", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 12", async () => {
        const homePage = new HomePage(driver);
        const cartPage = new CartPage(driver);
        const productPage = new ProductPage(driver);

        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify that home page is visible successfully
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click 'Products' button
        await productPage.clickProductButton();

        // 5. Hover over first product and click 'Add to cart'
        await productPage.hoverAndAddProduct(0);

        // 6. Click 'Continue Shopping' button
        await productPage.clickContinueShopping();

        // 7. Hover over second product and click 'Add to cart'
        await productPage.hoverAndAddProduct(1);

        // 8. Click 'View Cart' button
        await productPage.clickViewCartButton();

        // 9. Verify both products are added to Cart
        // 10. Verify their prices, quantity and total price
        await productPage.verifyProductInCart(0, 1);
        await productPage.verifyProductInCart(1, 1);


    }, 10000);
});