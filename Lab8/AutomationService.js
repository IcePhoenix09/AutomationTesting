import HomePage from "./pages/HomePage.js";
import SignupPage from "./pages/SignupPage.js";
import AccountPage from "./pages/AccountPage.js";


export default class AutomationService {
    constructor(driver) {
        this.homePage = new HomePage(driver);
        this.signupPage = new SignupPage(driver);
        this.accountPage = new AccountPage(driver);
    }
    
    async registerUser(username, email, password) {
        // Navigate to URL
        await this.homePage.open();

        await this.homePage.clickSignupLogin();
    
        await this.signupPage.enterNewUserData(username, email);
    
        await this.signupPage.clickSignupButton();
    
        // Fill details
        await this.signupPage.fillPersonalDetails({
            password: password,
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
    
        // 13. Click 'Create Account'
        await this.signupPage.clickCreateAccountButton();
        await this.signupPage.clickContinue();

        await this.homePage.open();
    }

    async logout() {
        await this.accountPage.clickLogout();
    }

    async deleteUser() {
        await this.accountPage.clickDeleteAccount();
    }
}