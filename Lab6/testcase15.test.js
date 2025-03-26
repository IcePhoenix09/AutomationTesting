const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require("./pages/HomePage.js");
const CartPage = require("./pages/CartPage.js");
const ProductPage = require("./pages/ProductPage.js");
const CheckoutPage = require("./pages/CheckoutPage.js");
const SignupPage = require("./pages/SignupPage.js");
const AccountPage = require("./pages/AccountPage.js");
const PaymentPage = require("./pages/PaymentPage.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

describe("TestCase14", () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://automationexercise.com');
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    });

    test("Test Case 14", async () => {
        const homePage = new HomePage(driver);
        const cartPage = new CartPage(driver);
        const productPage = new ProductPage(driver);
        const signupPage = new SignupPage(driver);
        const accountPage = new AccountPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        const paymentPage = new PaymentPage(driver);

        let username = "TestUser" + getRandomInt(3000);
        let email = "test2@aaa.com" + getRandomInt(3000);
        let personalDetails = {
            password: "password123",
            day: "15",
            month: "June",
            year: "1990"
        };

        let addressDetails = {
            firstName: "John",
            lastName: "Doe",
            company: "TestCorp",
            address: "123 Test St",
            country: "United States",
            state: "California",
            city: "LA",
            zipcode: "90001",
            mobile: "1234567890"
        }

        // 1. Launch browser 
        // 2. Navigate to URL
        await homePage.open();
    
        // 3. Verify that home page is visible successfully
        expect(await homePage.isHomePageVisible()).toBeTruthy();

        // 4. Click 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 5. Fill all details in Signup and create account
        await signupPage.enterNewUserData(username, email);
        await signupPage.clickSignupButton();
 
        await signupPage.fillPersonalDetails(personalDetails);
    
        await signupPage.fillAddressDetails(addressDetails);
    
        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await signupPage.clickCreateAccountButton();
        await signupPage.clickContinue();
    
        // 7. Verify ' Logged in as username' at top
        await accountPage.isLoggedIn(username);

        // 8. Add products to cart
        await productPage.clickProductButton();
        await productPage.hoverAndAddProduct(0);
        await productPage.clickContinueShopping();
        await productPage.hoverAndAddProduct(1);

        // 9. Click 'Cart' button
        await cartPage.clickCartButton();

        // 10. Verify that cart page is displayed
        await cartPage.isPageVisible();

        // 11. Click Proceed To Checkout
        await cartPage.clickCheckoutButton();

        //12. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(
            addressDetails.firstName,
            addressDetails.lastName,
            addressDetails.address,
            addressDetails.city,
            addressDetails.state,
            addressDetails.zipcode,
            addressDetails.country,
            addressDetails.mobile,
        );

        //13. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterDescription("Comment");
        await checkoutPage.clickPlaceOrder();

        // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.enterPaymentDetails("John Doe", "4242424242424242", "12", "23", "123");

        // 15. Click 'Pay and Confirm Order' button
        await paymentPage.clickPay();

        // 16. Verify success message 'Your order has been placed successfully!'
        await paymentPage.isPaymentSuccessMessageVisible();

        // 17. Click 'Delete Account'
        await accountPage.clickDeleteAccount();

        // 18. Verify 'ACCOUNT DELETED!' is visible
        await accountPage.isAccountDeletedVisible();
    }, 30000);
});