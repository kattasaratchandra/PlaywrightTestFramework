const {test} = require('@playwright/test');

/*
1. These tests are executed in Playwright environment that launches 
the browser and provides a fresh page to each test.
2. we use async and await to perform code sequentially as js is asynchronous in nature
3. async we use on function and await  on statements
4. we can declare anonymous function(function which dont have names) as () => instead of using function(){} 
5. playwright fixtures must be declared in between flower braces to recognise them as playwright fixtures
ex {browser}, {page}
6. In config.js if we want to run in chrome, firfox and safari we declare in use browserName as
chromium. firefox and webkit accordingly
7. by default playwright run tests in headless mode. config -> use -> headless:false in order to run in 
browser
8. the other way is to use the command npx playwright test --headed
9. test.only - executes only that test
*/

test('first playwright test using context', async ({browser})=>
{
    // newContext method is used to create new browser instance with cookies
    const context = await browser.newContext();
    // using context we open new page
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test.only('first test case using page fixture', async ({page})=>
{
    await page.goto('https://www.google.co.in/');
});


