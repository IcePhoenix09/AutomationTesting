const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./Pages/HomePage.js");
const SearchPage = require("./Pages/Search.js");
const CategoryPage = require("./Pages/CategoryPage.js");
const SubCategoryPage = require("./Pages/SubCategoryPage.js");


describe("TestCase1.2", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().setRect({ width: 1920, height: 1080 });
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 1.2: Category Search. Full window", async () => {
        const homePage = new HomePage(driver);
        const categoryPage = new CategoryPage(driver);
        const subCategoryPage = new SubCategoryPage(driver);
        const searchPage = new SearchPage(driver);

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
    }, 60000);
});
