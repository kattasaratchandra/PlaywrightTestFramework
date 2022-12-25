const {test, expect} = require('@playwright/test');



test('first playwright test using context', async ({browser})=>
{
    // newContext method is used to create new browser instance with cookies
    const context = await browser.newContext();
    // using context we open new page
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    // locators 
    const username = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await username.type("rahulshetty");
    await page.locator("#password").type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
    await username.fill("");
    await username.fill("rahulshettyacademy");
    /*
    for waiting we use two ways here since auto wait doesnt work for all text contents we need to find other
    alternatives
    1. after clicking and navigating to new page use waitfornaviagtion method directly
    2. using promise.all as shown 
    */

    // await signIn.click();

    // // console.log(await page.locator(".card-body a").first().textContent());
    // await page.waitForNavigation();

    await Promise.all([
        page.waitForNavigation(),
        signIn.click()
    ]

    );
    const list = await cardTitles.allTextContents();
    console.log(list);

});
/*
1. we can execute single js file test by giving the path in npx playwright test command
ex npx playwright test tests/UIBasic1Tests.spec.js
*/


/*
1. select drop downs we call as static drop downs we use selectOption method and send argument 
as value
2. we have method check() for both radio and check boxes to check and for assertion/validations we have 
toBeChecked(), toBeTruthy(), toBeFalsy() methods 
3. await be used when we perform actions based on that we may have to use await inside or outside
the expect condition
4. we have assertion in playwright to assert attribute values using toHaveAttribute() method

*/

test('UI actions', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // static drop down
    const select = page.locator("select.form-control");
    await select.selectOption("teach");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // await page.pause();
    const checkbox = page.getByRole('checkbox', {name: "terms"});
    // check checknox and assert
    await checkbox.check();
    expect(await checkbox.isChecked()).toBeTruthy();
    // await page.pause();
    // uncheck and validate
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    // attribute assertion using expect
    const blinkLink = page.locator("a.blinkingText");
    await expect(blinkLink).toHaveAttribute("class", "blinkingText");

});

/*
1. using context, promises, waitforevent() method to switch to other page and sending argument as "page"
*/

test("child window", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkLink = page.locator("a.blinkingText");
// method 1 : 

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkLink.click()
    ]);

// method 2:

    // const pagePromise = context.waitForEvent('page');
    // await blinkLink.click();
    // const page1 = await pagePromise; 

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const textArray = text.split("@");
    const emailArray = textArray[1].split(" ");
    const email = emailArray[0];
    console.log(email);
    const username = page.locator("#username");
    await username.fill(email);
    await page.pause();

})

test.only("e2e", async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('katta@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Abc@12345');
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.pause();
    // using locator method and css to the entire card and filter the card with text and then clicking
    // on add to cart button
    await page.locator(".card-body")
                .filter({hasText: "zara coat 3"})
                .getByRole('button', { name: ' Add To Cart' }).click();
    await expect(page.getByText("Product Added To Cart")).toHaveText("Product Added To Cart");
    //   await page.getByText('zara coat 3').click();
    //   await page.getByRole('button', { name: ' Add To Cart' }).first().click();
    await page.getByRole('button', { name: ' Cart 1' }).click();

    await expect(page.getByRole('heading', { name: 'zara coat 3' })).toHaveText("zara coat 3");
    await page.getByRole('button', { name: 'Checkout❯' }).click();
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('katta');

    await expect(page.getByText('katta@gmail.com')).toHaveText("katta@gmail.com");
    await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
    await page.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page.getByText('* Coupon Applied')).toContainText("Coupon Applied");
    await page.getByPlaceholder('Select Country').click();
    await page.getByPlaceholder('Select Country').type('indi');
    await page.getByRole('button', { name: ' India' }).click();
    await page.getByText('Place Order').click();

    await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toHaveText("Thankyou for the order.");
    const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
    const orderIdArray = orderId.split(" ");
    console.log(orderIdArray);
    const actualorderId = orderIdArray[2];
    console.log(actualorderId);
    await page.getByText('Orders History Page').click();
    await expect(page.getByRole('rowheader', { name: actualorderId })).toHaveText(actualorderId);
    await page.locator("tr[class='ng-star-inserted']")
                .filter({hasText: actualorderId})
                .getByRole('button', { name: 'View' })
                .click();
    // await page.getByRole('button', { name: 'View' }).click();
    await expect(page.getByText(actualorderId)).toHaveText(actualorderId);
    await page.getByText('View Orders').click();
    await page.locator("tr[class='ng-star-inserted']")
    .filter({hasText: actualorderId})
    .getByRole('button', { name: 'Delete' })
    .click();


    

    



    
})

