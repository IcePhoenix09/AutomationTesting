const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const ContactFormPage = require("./pages/ContactFormPage.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase6", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 6", async () => {
        const homePage = new HomePage(driver);
        const contactFormPage = new ContactFormPage(driver);

    
        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click on 'Contact Us' button
        await contactFormPage.clickOnContactUsButton();

        // 5. Verify 'GET IN TOUCH' is visible
        await contactFormPage.isGetInTouchVisible();

        // 6. Enter name, email, subject and message
        await contactFormPage.enterContactData("Test User", "we@ww", "test", "Test message");

        // 7. Upload file
        await contactFormPage.uploadFile();

        // 8. Click 'Submit' button
        await contactFormPage.clickSubmitButton();

        // 9. Click OK button
        await contactFormPage.clickOkButton();

        // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
        await contactFormPage.isSuccessMessageVisible();

        // 11. Click 'Home' button and verify that landed to home page successfully
        await contactFormPage.clickHomeButton();
        expect(await homePage.isHomePageVisible()).toBeTruthy



    }, 10000);
});