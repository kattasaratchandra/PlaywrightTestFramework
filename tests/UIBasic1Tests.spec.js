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

test.only("child window", async ({browser})=>{
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



