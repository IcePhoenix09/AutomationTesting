import { By, until } from "selenium-webdriver";
import Actions from "./../Actions.js";
import { expect } from "chai";

export default class PaymentPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    async enterPaymentDetails(nameOnCard, cardNumber, expiryMonth, expiryYear, cvv) {
        await this.driver.findElement(By.css("div.form-row input[name='name_on_card']")).sendKeys(nameOnCard);
        await this.driver.findElement(By.css("div.form-row input[name='card_number']")).sendKeys(cardNumber);
        await this.driver.findElement(By.css("div.form-row input[name='cvc']")).sendKeys(cvv);
        await this.driver.findElement(By.css("div.form-row input[name='expiry_month']")).sendKeys(expiryMonth);
        await this.driver.findElement(By.css("div.form-row input[name='expiry_year']")).sendKeys(expiryYear);
    }

    async clickPay(){
        await this.driver.findElement(By.id("submit")).click();
    }

    async isPaymentSuccessMessageVisible(){
        await this.driver.wait(
            until.elementIsVisible(this.driver.findElement
                (By.xpath("//b[contains(text(),'Order Placed!')]"))),
            3000
        );
    }
}
