# PlaywrightTestFramework
# using read me file as notes 
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
10. we use npx playwright show-report command to see the reports
11. we can declare in use headless to either ture/false to run tests i.e headless:true/false in use 

----------------------------------------------
