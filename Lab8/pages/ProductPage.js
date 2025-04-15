import { By, until } from "selenium-webdriver";
import Actions from "./../Actions.js";
import { expect } from "chai";

export default class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.actions = new Actions(driver);

        this.productInfo = []
    }

    async clickProductButton() {
        await this.actions.clickButton("ul.nav.navbar-nav li a[href='/products']");
    }

    async isUserOnPage() {
        await this.actions.isUserOnPage("https://automationexercise.com/products");
    }

    async isListVisible() {
        await this.actions.isElementVisible("div.features_items");
    }

    async clickOnViewProduct() {
        await this.actions.clickButton("div.features_items div.choose a[href='/product_details/1']");
    }

    async isUserOnProductDetailPage() {
        await this.actions.isUserOnPage("https://automationexercise.com/product_details/1");
    }

    async clickAddToCart() {
        const price = await this.driver.findElement
            (By.css("div.product-information span span")).getText();
        const name = await this.driver.findElement
            (By.css("div.product-information h2")).getText();
        this.productInfo.push({"name": name, "price": price});

        await this.actions.clickButton("button.btn.btn-default.cart");
    }

    async isProductInfoVisible() {
        await this.actions.isElementVisible("div.product-information");
        await this.actions.isElementWithTextVisible("p", "Category:");
        await this.actions.isElementWithTextVisible("b", "Availability:");
        await this.actions.isElementWithTextVisible("b", "Condition:");
        await this.actions.isElementWithTextVisible("b", "Brand:");
    }

    async searchProduct(productName) {
        await this.driver.findElement(By.id("search_product")).sendKeys(productName);
        await this.driver.findElement(By.id("submit_search")).click();
    }

    async isSearchProductLabelVisible() {
        await this.actions.isElementWithTextVisible("h2", "Searched Products");
    }

    async isProductVisible(productName) {
        await this.actions.isElementWithTextVisible("p", productName);
    }

    async hoverAndAddProduct(index) {
        const productList = await this.driver.
            findElements(By.css("div.features_items div.single-products"));
        
        const price = await productList[index].findElement(By.css("h2")).getText();
        const name = await productList[index].findElement(By.css("p")).getText();
        this.productInfo.push({"name": name, "price": price});
        
        this.actions.hoverAtElement(productList[index]);

        const addButton = await productList[index].findElement(By.css("a"));
        await addButton.click();
    }

    async addQuantity(quantity) {
        const inputField = await this.driver.findElement(By.id("quantity"));
        await inputField.clear();

        await inputField.sendKeys(quantity);
    }

    async clickContinueShopping() {
        await this.actions.waitFor('div.modal-content', 3000);

        await this.actions.clickButton("div.modal-content div.modal-footer button");
    }

    async clickViewCartButton() {
        await this.actions.waitFor('div.modal-content', 3000);

        await this.actions.clickButton("div.modal-content div.modal-body a[href='/view_cart']");
    }

    async clickCheckoutButton() {
        const element = await this.driver.findElement(By.xpath(`//a[contains(text(),'Proceed To Checkout')]`));
        await element.click();
    }

    async verifyProductInCart(number, quantity) {
        const product = await this.driver.findElement(By.id(`product-${number + 1}`));
        const productName = await product.findElement(By.css("td.cart_description a")).getText();
        const productPrice = await product.findElement(By.css("td.cart_price p")).getText();
        const productQuantity = await product.findElement
            (By.css("td.cart_quantity button")).getText();

        const totalPriceText = await product.findElement(By.css("td.cart_total p")).getText();
        const totalPrice = parseFloat(totalPriceText.replace("Rs. ", ""));

        expect(productName).toBe(this.productInfo[number].name);
        expect(productPrice).toBe(this.productInfo[number].price);
        expect(productQuantity).toBe(quantity.toString());

        const actualTotalPrice = parseFloat
        (this.productInfo[number].price.replace("Rs. ", "")) * quantity;

        expect(totalPrice).toBe(actualTotalPrice);
    }
}
