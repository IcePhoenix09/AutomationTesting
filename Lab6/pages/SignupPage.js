const { By, until } = require("selenium-webdriver");

module.exports = class SignupPage {
    constructor(driver) {
        this.driver = driver;
    }

    creareAccount() {
        this.driver.get("https://automationexercise.com/");
    }

    async isSignupVisible() {
        const element = await this.driver.findElement(
            By.xpath("//h2[contains(text(),'New User Signup!')]")
        );
        return element.isDisplayed();
    }

    async isLoginVisible() {
        const element = await this.driver.findElement(
            By.xpath("//h2[contains(text(),'Login to your account')]")
        );
        return element.isDisplayed();
    }

    async enterNewUserData(name, email) {
        await this.driver.findElement(By.css("div.signup-form input[name='name']")).sendKeys(name);
        await this.driver.findElement(By.css("div.signup-form input[name='email']")).sendKeys(email);
    }

    async enterExistedUserData(email, password) {
        await this.driver.findElement(By.css("div.login-form input[name='email']")).sendKeys(email);
        await this.driver.findElement(By.css("div.login-form input[name='password']")).sendKeys(password);
    }

    async isLoginDataIncorect(){
        const element = this.driver.findElement(By.css("div.login-form form p"))
        const text = await element.getText();
        expect(text).toContain("Your email or password is incorrect!");

        return element.isDisplayed();
    }

    async isEmailRegisterError(){
        const element = this.driver.findElement(By.css("div.signup-form form p"));
        const text = await element.getText();
        expect(text).toContain("Email Address already exist!");

        return element.isDisplayed();
    }

    async clickSignupButton() {
        await this.driver.findElement(By.css("div.signup-form button")).click();
    }

    async clickLoginButton() {
        await this.driver.findElement(By.css("div.login-form button")).click();
    }

    async isAccountInfoVisible() {
        const accountCreated = await this.driver.findElement(By.css("h2 b"));
        const elementText = await accountCreated.getText();
        expect(elementText).toContain("ENTER ACCOUNT INFORMATION");
    }

    async fillPersonalDetails({ password, day, month, year }) {
        await this.driver.findElement(By.css("div.login-form form div.clearfix div.radio-inline")).click();
        await this.driver.findElement(By.id("password")).sendKeys(password);
        await this.driver.findElement(By.id("days")).sendKeys(day);
        await this.driver.findElement(By.id("months")).sendKeys(month);
        await this.driver.findElement(By.id("years")).sendKeys(year);        
    }

    async selectCheckboxes() {
        await this.driver.findElement(By.id("newsletter")).click();
        await this.driver.findElement(By.id("optin")).click();
    } 

    async fillAddressDetails({ firstName, lastName, company, address, country, state, city, zipcode, mobile }) {
        await this.driver.findElement(By.id("first_name")).sendKeys(firstName);
        await this.driver.findElement(By.id("last_name")).sendKeys(lastName);
        await this.driver.findElement(By.id("company")).sendKeys(company);
        await this.driver.findElement(By.id("address1")).sendKeys(address);
        await this.driver.findElement(By.id("country")).sendKeys(country);
        await this.driver.findElement(By.id("state")).sendKeys(state);
        await this.driver.findElement(By.id("city")).sendKeys(city);
        await this.driver.findElement(By.id("zipcode")).sendKeys(zipcode);
        await this.driver.findElement(By.id("mobile_number")).sendKeys(mobile);
    }

    async clickCreateAccountButton() {
        await this.driver.findElement(By.css("button[data-qa='create-account']")).click();
        
        // wait for the 'Account Created!' message to appear
        await this.driver.wait(
            until.elementLocated(By.xpath("//b[contains(text(),'Account Created!')]")),
            5000
        );
    }

    async clickContinue() {
        await this.driver.findElement(By.css("a[data-qa='continue-button']")).click();
    }

}
