import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Builder } from 'selenium-webdriver';
import HomePage from '../../pages/HomePage.js';
import SignupPage from '../../pages/SignupPage.js';
import AccountPage from '../../pages/AccountPage.js';
import AutomationService from '../../AutomationService.js';
import chrome from 'selenium-webdriver/chrome.js';

// I will create random username and email, 
// because i can't clear server database
function getRandomInt() {
  return Math.floor(Math.random() * 1000000);
}

Before({ timeout: 20000 }, async function () {

  this.driver = await new Builder()
    .forBrowser('chrome')
    .build();

  await this.driver.get('http://automationexercise.com');


  this.homePage = new HomePage(this.driver);
  this.signupPage = new SignupPage(this.driver);
  this.accountPage = new AccountPage(this.driver);
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});

When('I launch browser and navigate to website', async function () {
  await this.homePage.open();
});

Then('homepage is visible', async function () {
  await this.homePage.isHomePageVisible();
});

When("I click 'Signup and Login'", async function () {
  await this.homePage.clickSignupLogin();
});

Then("'New User Signup!' is visible", async function () {
  await this.signupPage.isSignupVisible();
});

Given('my username', async function () {
  this.username = "test" + getRandomInt();
});

Given('my email', async function () {
  this.email = "test@test" + getRandomInt();
});

When("I click 'Signup'", async function () {
  await this.signupPage.clickSignupButton();
});

Then("'ENTER ACCOUNT INFORMATION' is visible", async function () {
  await this.signupPage.isAccountInfoVisible();
});

When('I fill the acount details', async function () {
  await this.signupPage.fillPersonalDetails({
    password: "password123",
    day: "15",
    month: "June",
    year: "1990"
  });

  await this.signupPage.fillAddressDetails({
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
});

When("I click 'Create Account'", async function () {
  await this.signupPage.clickCreateAccountButton();
});

Then("'ACCOUNT CREATED!' is visible", async function () {
  await this.signupPage.isAccountCreatedVisible();
});

When("I click 'Continue'", async function () {
  await this.signupPage.clickContinue();
});

Then("I logged and my username is visible", async function () {
  await this.accountPage.isLoggedIn(this.username);
});

When("I click 'Delete Account'", async function () {
  await this.accountPage.clickDeleteAccount();
});

Then("'ACCOUNT DELETED!' is visible", async function () {
  await this.accountPage.isAccountDeletedVisible();
});

Given('the user has registered with username and email', { timeout: 30000 }, async function () {
  this.username = "test" + getRandomInt();
  this.email = "test@test" + getRandomInt();
  this.password = "password" + getRandomInt();
  this.automationService = new AutomationService(this.driver);
  
  await this.automationService.registerUser(this.username, this.email, this.password);
  await this.automationService.logout();
});

Then('the "Login to your account" form is visible', async function () {
  this.signupPage = new SignupPage(this.driver);
  await this.signupPage.isLoginVisible();
});

When('I enter the email and password into {string} form', async function (formName) {
  if (formName === "Login") {
    await this.signupPage.enterExistedUserData(this.email, this.password);
  } else if (formName === "Signup") {
    await this.signupPage.enterNewUserData(this.username, this.email);
  }
});

When('I click the "login" button', async function () {
  await this.signupPage.clickLoginButton();
});

When('I enter incorrect email and password', async function () {
  let email = "test2@aaa.com" + getRandomInt();
  let password = "password098";
  await this.signupPage.enterExistedUserData(email, password);
});

Then("I should see the error message 'Your email or password is incorrect!'", async function () {
  await this.signupPage.isLoginDataIncorect();
});

When('I click the logout button', async function () {
  await this.accountPage.clickLogout();
});

Then('I should be redirected to the login page', async function () {
  await this.accountPage.isUserOnLoginPage();
});

Then('an error message about existing email should be displayed', async function () {
  await this.signupPage.isEmailRegisterError();
});
