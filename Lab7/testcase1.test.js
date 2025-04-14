const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./Pages/HomePage.js");
const SearchPage = require("./Pages/Search.js");
const ProductDetailPage = require("./Pages/ProductDetailPage.js");
const Actions = require("./Actions.js");

describe("TestCase1.1", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 1.1: Product Search", async () => {
        const homePage = new HomePage(driver);
        const searchPage = new SearchPage(driver);
        const productDetailPage = new ProductDetailPage(driver);


        // 1. Launch browser & navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Enter at search bar “volt polska”
        await homePage.EnterAtSearch("volt polska");

        // 5. Verify user is on search page
        await searchPage.UserAtSearchPage("Volt Polska");

        // 6. Verify that the header “Volt Polska” is visible.
        await searchPage.isHeaderVisible('Volt Polska');

        // 7. Click on the first product
        await searchPage.ClickOnFirstProduct();

        // 8. Verify that the product properties are visible
        await productDetailPage.isUserOnPage();
    
    }, 60000);
});
