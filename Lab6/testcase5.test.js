const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const SignupPage = require("./pages/SignupPage.js");
const AccountPage = require("./pages/AccountPage.js");
const AutomationService = require("./AutomationService.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase5", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');

    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 5", async () => {
        const homePage = new HomePage(driver);
        const signupPage = new SignupPage(driver);

        const automationService = new AutomationService(driver);
        let username = "TestUser" + getRandomInt(3000);
        let email = "test2@aaa.com" + getRandomInt(3000);
        let password = "password123";
        await automationService.registerUser(username, email, password);
        await automationService.logout();

    
        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click 'Signup / Login'
        await homePage.clickSignupLogin();
    
        // 5. Verify 'New User Signup!' is visible
        expect(await signupPage.isSignupVisible()).toBeTruthy();
    
        // 6. Enter name and already registered email address
        await signupPage.enterNewUserData(username, email);
    
        // 7. Click 'Signup' button
        await signupPage.clickSignupButton();

        // 8. Verify error 'Your email or password is incorrect!' is visible
        expect(await signupPage.isEmailRegisterError()).toBeTruthy();

    }, 20000);
});