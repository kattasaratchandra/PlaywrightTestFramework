const {test, expect} = require('@playwright/test');



test.only('first playwright test using context', async ({browser})=>
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

test('first test case using page fixture', async ({page})=>
{
    await page.goto('https://www.google.co.in/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});



