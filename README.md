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
12. In config we can give timeeouts seperatly for each tests, expect(assertions)
13. its always recommended to use css for element locators
14. to get the locator text we use textContent method
---------------------------------------------

1.css locators:
    1. ID -> tagname#ID or #ID
    2. classname -> tagname.classame or .classname
    3. traversal parent to child -> parentTagname >> childTagname
    4. using text -> text = ''
    5. [attribute *= value] we use * for partial/contains value

-----------------------------------------------

ways to get pop up element locator
1. go to dev tools -> click f8 to freeze the screen
2. use js code setTimeout in console to freeze screen for some seconds
3. dev tools - > elements  -> right click -> break on -> tree modification - this will 
freeze screen if any modification happens in dom

------------------------------------------------
 locators
1. Its recommended to use locator method getByRole('type', {name: 'locatorName'}) to locate elements (name may
    also be a label name in case)
2. for form fields its recommended to use getByLabel('labelName').
3. In case role locators or form locators not available for form fields its recommended to
 use getByPlaceholder() method
4. for non interactive web elements its recommended to yse getByText()
5. its not recommended to use css/xpath as dom keep changing while interacting.
6. if the locator contains multiple elements they playwright throws error "strict mode violation"
7. its not recommended to use first/last/nth element methods for which one locator has multiple elements
8. We can use locator.filter({ }) method to filter the list of elements either by using hasText: or has: another locator
9. best use of filter on parent locator is we get to access child elements even if we accessed one already. we can chain and go to other child element and do actions on other child as well. we can as well do chain filter
method
10. We can even chain filters on locator to get the specific element
11. Getbyrole().click() method throw error "strict role violation" if mulitple elements has same role. If we use either .count() or .all() it wont throw any error
12. We recommend prioritzing user visible locatorslike text or accessible role instead of using CSS that is tied to the implementation and could break when the page changes.

----------------------------------------------------

1. the difference between fill and type are :
    1. Type into the field character by character, as if it was a user with a real keyboard 
    with locator.type().
    2. This method will emit all the necessary keyboard events, with all the keydown, keyup, 
    keypress events in place. You can even specify the optional delay between the key 
    presses to simulate real user behavior.
    3. fill if we send empty string it clears the pre loaded text and other use is 
    we can force the actionability
    4. Most of the time, page.fill() will just work. You only need to type characters if there 
    is special keyboard handling on the page.

----------------------------------------------------

Auto waiting
1. playwright do certain actionability checks and ensure before performing any actions. if any checks fails 
it throws time out error
2. this checks will happen only to certain methods check auto wait in documentation
3. if we want to wait for particular element to load then we can use waitFor() method.
4. for service based applications (when navigating to new website after clicking) we can use "wait for load state" method and "network idle" 
such that this will wait until all network api requests are done. we can use this in order to wait
as all text contents method dont have auto wait 
5. for non service based application we use "wait for navigation" method. (when navigating to new website after clicking) 
    1. for waiting we use two ways here since auto wait doesnt work for all text contents we need to find other
    alternatives
        1. after clicking and navigating to new page use waitfornaviagtion method directly
        2. using promise.all as shown 

----------------------------------------------------
drop downs , check/radio boxes, switch to new page/tab, attribute assertions

1. we can execute single js file test by giving the path in npx playwright test command
ex npx playwright test tests/UIBasic1Tests.spec.js
2. select drop downs we call as static drop downs we use selectOption method and send argument 
as value
3. we have method check() for both radio and check boxes to check and for assertion/validations we have 
toBeChecked(), toBeTruthy(), toBeFalsy() methods 
4. await be used when we perform actions based on that we may have to use await inside or outside
the expect condition
5. we have assertion in playwright to assert attribute values using toHaveAttribute() method.
6. using context, promises, waitforevent() method to switch to other page and sending argument 
as "page"

---------------------------------------------------------


