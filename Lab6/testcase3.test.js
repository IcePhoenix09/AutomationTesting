const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const SignupPage = require("./pages/SignupPage.js");
const AccountPage = require("./pages/AccountPage.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase3", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 3", async () => {
        const homePage = new HomePage(driver);
        const signupPage = new SignupPage(driver);

        let email = "test2@aaa.com" + getRandomInt(3000);
        let password = "password098";

    
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

        // 8. Verify error 'Your email or password is incorrect!' is visible
        expect(await signupPage.isLoginDataIncorect()).toBeTruthy();

    }, 10000);
});