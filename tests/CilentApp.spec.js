const {test, expect} = require('@playwright/test');

/*
1. for service based applications we can use "wait for load state" method and "network idle" 
in order this will wait until all network api requests are done. we can use this in order to wait
as all text contents method dont have auto wait 
2. for non service based application we use "wait for navigation" method
*/

test('first test case using page fixture', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    await page.getByPlaceholder("email@example.com").fill("katta@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Abc@12345");
    await page.getByRole('button', { name: 'login' }).click();
    console.log(await page.title());
    await page.waitForLoadState("networkidle");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});
