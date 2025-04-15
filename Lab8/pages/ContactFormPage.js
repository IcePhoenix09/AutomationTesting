import { By, until } from "selenium-webdriver";
import { expect } from "chai";

export default class ContactFormPage {
    constructor(driver) {
        this.driver = driver;
    }

    async clickOnContactUsButton() {
        await this.driver.findElement(By.linkText("Contact us")).click();
    }

    async isGetInTouchVisible() {
        const element = await this.driver.findElement(
            By.xpath("//h2[contains(text(),'Get In Touch')]")
        );
        expect(await element.isDisplayed()).to.be.true;
    }

    async enterContactData(name, email, subject, message) {
        await this.driver.findElement(By.css("div.contact-form input[name='name']")).sendKeys(name);
        await this.driver.findElement(By.css("div.contact-form input[name='email']")).sendKeys(email);
        await this.driver.findElement(By.css("div.contact-form input[name='subject']")).sendKeys(subject);
        await this.driver.findElement(By.css("div.contact-form textarea[name='message']")).sendKeys(message);
    }

    async clickSubmitButton() {
        await this.driver.findElement(By.css("div.contact-form input[type='submit']")).click();
    }

    async clickOkButton() {
        await this.driver.switchTo().alert().accept();
    }

    async isSuccessMessageVisible() {
        await this.driver.wait(
            until.elementLocated(By.xpath("//div[contains(text(),'Success! Your details have been submitted successfully.')]")),
            5000
        );
    }

    async clickHomeButton() {
        await this.driver.findElement(By.linkText("Home")).click();
    }

    async uploadFile() {
        const fileInput = await this.driver.findElement(By.css("input[type='file']"));
        await fileInput.sendKeys("/home/roma/HM/AutomationTesting/Lab6/static/test.txt");
    }
}
