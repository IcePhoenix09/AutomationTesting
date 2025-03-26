const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const SignupPage = require("./pages/SignupPage.js");
const AccountPage = require("./pages/AccountPage.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase1", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 1: Register User", async () => {
        const homePage = new HomePage(driver);
        const signupPage = new SignupPage(driver);
        const accountPage = new AccountPage(driver);
    
        // 1. Launch browser & navigate to URL
        await homePage.open();
    
        // 3. Verify homepage is visible
        expect(await homePage.isHomePageVisible()).toBeTruthy();
    
        // 4. Click 'Signup / Login'
        await homePage.clickSignupLogin();
    
        // 5. Verify 'New User Signup!' is visible
        expect(await signupPage.isSignupVisible()).toBeTruthy();
    
        // 6. Enter name and email
        let name = "TestUser" + getRandomInt(3000);
        let email = "test2@aaa.com" + getRandomInt(3000);
        await signupPage.enterNewUserData(name, email);
    
        // 7. Click 'Signup'
        await signupPage.clickSignupButton();
    
        // 8. Verify 'ENTER ACCOUNT INFORMATION' is visible
        await signupPage.isAccountInfoVisible();
    
        // 9-12. Fill details
        await signupPage.fillPersonalDetails({
            password: "password123",
            day: "15",
            month: "June",
            year: "1990"
        });
    
        await signupPage.fillAddressDetails({
            firstName: "John",
            lastName: "Doe",
            company: "TestCorp",
            address: "123 Test St",
            country: "United States",
            state: "California",
            city: "LA",
            zipcode: "90001",
            mobile: "1234567890"
        });
    
        // 13. Click 'Create Account'
        // 14. Verify 'ACCOUNT CREATED!' is visible
        await signupPage.clickCreateAccountButton();
    
        // 15. Click 'Continue'
        await signupPage.clickContinue();
    
        // 16. Verify 'Logged in as username' is visible
        await accountPage.isLoggedIn(name);
    
        // 17. Click 'Delete Account'
        await accountPage.clickDeleteAccount();
    
        // 18. Verify 'ACCOUNT DELETED!' is visible
        await accountPage.isAccountDeletedVisible();
    }, 15000);
});