const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./Pages/HomePage.js");
const CategoryPage = require("./Pages/CategoryPage.js");
const SubCategoryPage = require("./Pages/SubCategoryPage.js");
const ProductDetailPage = require("./Pages/ProductDetailPage.js");


describe("Test Case 2.3", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().setRect({ width: 1920, height: 1080 });;
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 2.3: Search Filter Category", async () => {
        const homePage = new HomePage(driver);
        const categoryPage = new CategoryPage(driver);
        const subCategoryPage = new SubCategoryPage(driver);
        const productDetailPage = new ProductDetailPage(driver);

        // 1. Launch browser & navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
        
        // 4. Click on “Енергозабезпечення” button
        await homePage.clickOnPowerCategory();

        // 5. Verify user is on category page
        await categoryPage.isUserOnCategoryPage("power");

        // 6. Verify that the header “Енергозабезпечення” is visible.
        await categoryPage.isHeaderVisible('Енергозабезпечення');

        // 7. Click on “Джерела безперебійного живлення (ДБЖ)” option
        await categoryPage.clickOnOptionsCategory();

        // 8. Verify that the header “Джерела безперебійного живлення (ДБЖ)” is visible.
        await subCategoryPage.isHeaderVisible('Джерела безперебійного живлення (ДБЖ)');

        // 9. Enter “Чиста синусоїда” in the search filter
        await subCategoryPage.searchInFilter("Чиста синусоїда");

        // 10. Select “Чиста синусоїда” from the menu
        await subCategoryPage.selectFilterItem2("Чиста синусоїда");

       // 11. Click on first item list
       await subCategoryPage.clickOnFirstProduct();

       // 12. Verify that the characteristic states  “чиста синусоїда”
       await productDetailPage.productCharacteristicsContains("чиста синусоїда");

    }, 60000);
});
