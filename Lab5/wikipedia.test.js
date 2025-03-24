const { Builder, By, until, Key } = require('selenium-webdriver');

describe('Wikipedia search functionality', () => {
    test('Test1', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        
        try {
            await driver.get('https://www.wikipedia.org/');
            
            const searchBox = await driver.findElement(By.name('search'));
            const isSearchBoxDisplayed = await searchBox.isDisplayed();
            expect(isSearchBoxDisplayed).toBe(true);

            const logo = await driver.findElement(By.className('central-featured-logo'));
            const isLogoDisplayed = await logo.isDisplayed();
            expect(isLogoDisplayed).toBe(true);
        } finally {
            await driver.quit();
        }
      }, 7000);


  test('Test2', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://www.wikipedia.org/');
        const searchBox = await driver.findElement(By.name('search'));
        await searchBox.sendKeys('Selenium');
        await searchBox.submit();

        await driver.wait(until.titleContains('Selenium'), 5000);
    } finally {
        await driver.quit();
    }
  }, 7000);

  test('Test3', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://www.wikipedia.org/');
        const searchBox = await driver.findElement(By.name('search'));

        const searchForm = await driver.findElement(By.name('search'));
        const isSearchFormDisplayed = await searchForm.isDisplayed();
        expect(isSearchFormDisplayed).toBe(true);

        await searchBox.sendKeys('Selenium');
        await searchBox.sendKeys(Key.ENTER);

        const titleElement = await driver.findElement(By.xpath('//h1[@id="firstHeading"]'));
        const pageTitle = await titleElement.getText();
        expect(pageTitle).toBe('Selenium');

        const navigationLinks = await driver.findElements(By.css('#p-navigation a'));
        for (let link of navigationLinks) {
            const href = await link.getAttribute('href');
            expect(href).toMatch(/wikipedia\.org/);
        }

        
    } finally {
        await driver.quit();
    }
  }, 7000);

  describe('Test4', () => {
    test('Click Test', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        
        try {
            await driver.get('https://www.wikipedia.org/');
            
            const link = await driver.findElement(By.id('js-link-box-en'));
            await link.click();

            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toMatch('https://en.wikipedia.org/wiki/Main_Page');
        } finally {
            await driver.quit();
        }
      }, 7000);

      test('Wait Test', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        
        try {
            await driver.get('https://www.wikipedia.org/');
            
            const link = await driver.findElement(By.id('js-link-box-en'));
            await link.click();
            
            await driver.wait(
                until.elementLocated(By.id('Welcome_to_Wikipedia')),
                5000
            );


        } finally {
            await driver.quit();
        }
      }, 7000);

      test("CSS test", async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        
        try {
            await driver.get('https://en.wikipedia.org/wiki/Main_Page');
            
            const menu = await driver.findElement(By.css('.vector-menu-content-list'));

            const margin = await menu.getCssValue('margin');

            expect(margin).toBe('0px');

        } finally {
            await driver.quit();
        }
    }, 7000); // I need more time for test
  });

});
