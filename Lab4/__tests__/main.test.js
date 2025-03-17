
const services = require('../labAssignment-lab4');

describe('UserServeice test', () => {

    const getFullName = (firstName, lastName) => firstName.toUpperCase() + " " + lastName.toUpperCase();

    test('was getFullName called', () => {
        const userService = new services.UserService(getFullName);

        const spy = jest.spyOn(userService, 'getFullName');

        userService.greet("John", "Doe");

        expect(spy).toHaveBeenCalled();
    }),

    test('getUserData', () => {
        const userService = new services.UserService(getFullName);

        let result = userService.greet("John", "Doe");

        expect(result).toEqual("HELLO, JOHN DOE!");
    })
})

test('asyncHello', async () => {
    const result = await services.asyncHello();

    expect(result).toEqual("hello world");
})

test('computeValue', async () => {
    const result = await services.computeValue();

    expect(result).toEqual(94);
})

test('asyncError', async () => {
    await expect(services.asyncError()).rejects.toThrow("Something went wrong");
})

test('fetchData', async () => {
    const apiClient = new services.ApiClient();

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => ({
            name: "John",
            age: 30
        })
    }));

    const result = await apiClient.fetchData();

    expect(result.name).toEqual("John");
    expect(result.age).toEqual(30);
    expect(result).toHaveProperty('fetchedAt');
    expect(typeof result.fetchedAt).toBe('number');
})

test('fetchViaHelper', async () => {
    const apiHelper = new services.ApiHelper();

    const apiCallFunction = jest.fn(() => Promise.resolve({
        name: "John",
        age: 30
    }));

    const result = await apiHelper.fetchViaHelper(apiCallFunction);

    expect(result.name).toEqual("John");
    expect(result.age).toEqual(30);
})

describe('calculateFinalPrice', () => {
    test('no items in list', () => {
        const order = {
            items: []
        }

        expect(() => services.calculateFinalPrice(order)).toThrow("Invalid order");
    })

    test('negative price', () => {
        const order = {
            items: [
                {
                    price: -10,
                    quantity: 1
                }
            ]
        }

        expect(() => services.calculateFinalPrice(order)).toThrow("Invalid item data");
    })

    test('negative quantity', () => {
        const order = {
            items: [
                {
                    price: 10,
                    quantity: -1
                }
            ]
        }

        expect(() => services.calculateFinalPrice(order)).toThrow("Invalid item data");
    })

    test('calculate price', () => {
        const order = {
            items: [
                {
                    price: 10,
                    quantity: 2,
                }
            ],
            taxRate: 0.1
        }

        const discountService = {
            getDiscount: (subtotal) => {
                if (subtotal > 15) {
                    return 0.7;
            }
        }}

        const result = services.calculateFinalPrice(order, discountService);

        expect(result).toEqual(11);
    })

})

describe('OrderProcessor', () => {
    test('processOrder', async () => {
        const currencyConverter = jest.fn(() => Promise.resolve(12));

        const order = {
            items: [
                {
                    price: 10,
                    quantity: 2
                }
            ],
            taxRate: 0.1,
            currency: "USD",
            discountService: {
                getDiscount: (subtotal) => {
                    if (subtotal > 15) {
                        return 0.7;
                    }
                }
            }
        }

        const orderProcessor = new services.OrderProcessor(currencyConverter);

        const result = await orderProcessor.processOrder(order, "EUR");

        expect(result).toEqual(12);
    })

    test('currencyConverter raise error', async () => {
        const currencyConverter = jest.fn(() => Promise.reject(new Error("Currency conversion failed")));

        const order = {
            items: [
                {
                    price: 10,
                    quantity: 2
                }
            ],
            taxRate: 0.1,
            currency: "USD",
            discountService: {
                getDiscount: (subtotal) => {
                    if (subtotal > 15) {
                        return 0.7;
                    }
                }
            }
        }

        const orderProcessor = new services.OrderProcessor(currencyConverter);

        const result = await orderProcessor.processOrder(order, "EUR");
        expect(result).toEqual(11);
    })
})
