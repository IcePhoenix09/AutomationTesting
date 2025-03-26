const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const SignupPage = require("./pages/SignupPage.js");
const AccountPage = require("./pages/AccountPage.js");
const AutomationService = require("./AutomationService.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase2", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 2", async () => {
        const homePage = new HomePage(driver);
        const signupPage = new SignupPage(driver);
        const accountPage = new AccountPage(driver);

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
    
        // 5. Verify 'Login to your account' is visible
        expect(await signupPage.isLoginVisible()).toBeTruthy();
    
        // 6. Enter correct email address and password
        await signupPage.enterExistedUserData(email, password);
    
        // 7. Click 'login' button
        await signupPage.clickLoginButton();

        // 8. Verify that 'Logged in as username' is visible
        await accountPage.isLoggedIn(username);
    
        // 9. Click 'Delete Account' button
        await accountPage.clickDeleteAccount();
    
        // 10. Verify that 'ACCOUNT DELETED!' is visible
        await accountPage.isAccountDeletedVisible();
    }, 20000);
});