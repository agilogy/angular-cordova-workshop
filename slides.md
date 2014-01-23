# HTML5 mobile apps 
with Apache Cordova and AngularJS

by [@_sgimeno](http://www.twitter.com/_sgimeno) and [@amatiasq](http://www.twitter.com/amatiasq)

<img src="angularbcn-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="agilogy-logo.png" style="border:none; background:none; box-shadow: none; height: 100px; margin-bottom:30px;" />
---
## Why Angular on Mobile?


 + Testable code
 + Less code (less bugs, maintainability)
 + Directives (reusable components)
 + Promises
 + Trendy

--
### CONS
 + Wants to own the DOM
  + Directives required
  + Behavior in a declarative way?

 + New framework, still evolving

--
## What is Cordova?

>Cordova is an open-source mobile development framework. It allows you to use standard web technologies such as HTML5, CSS3, and JavaScript for cross-platform development, avoiding each mobile platforms' native development language. 
--
## Cordova in 30s

 + Embeds HTML5 code inside a WebView
 + Makes native accessible from JavaScript
 + Able to be extended with native functionaity via plug-ins
 + Web based mobile app you can put in iOS App Store, or Google Play Store
 + Build & deploy tools allow you to write 1.5x and run everywhere
 + Can be used with many web frameworks (JQM, Sencha, )

---
## The workshop

We are going to incrementally build a simple game

Sorry but there will be no tests (we want to keep it simple)
--
## Tools

We need `grunt-cli` and `npm` for resolving dependencies and development.

And, of course, an editor and a browser 

<img src="node-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="grunt-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="cordova-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="Google-Chrome-Canary-icon.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="angularbcn-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />

--
## Development

 + Resolve dependencies
 ```
 $ npm install
 ```
 + Develop in a browser
 ```
 $ cordova serve [platform]
 ```
 + Watch changes in our sources
```
$grunt watch
```
equivalent to
```
cordova prepare
```

--

## Platforms

We need at least 1 platform **SDK** to deploy our application

<img src="apple-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="android-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="wp-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />
<img src="firefox-logo.png" style="border:none; background:none; box-shadow: none; margin-right:20px;" />

<small>If you are on iOS, you will need to test on simulator.</small>
--

## Building

Add a platform
 ```
 cordova platform add <ios|android|blackberry|..>
 ```
 Add a plugin
 ```
 cordova plugin add org.apache.cordova.file
 ```
 Build
 ```
 cordova build [platform]
 ```

 Emulate
 ```
 cordova emulate [platform]
 ```

 Run
 ```
 cordova run [platform]
 ```


<small>If you are on iOS, you will need to test on simulator.</small>
---
## STEP 0

Set it up

```
$ git clone git@github.com:agilogy/angular-memory-game.git
$ npm install
$ cordova platform add <ios|android>
$ cordova serve
$ grunt ## watch sources for development
```

Point your browser to `http://localhost:8000/<platform>/www/index.html`

<small>If you are on windows, you will need to also run bower install</small>
--
## STEP 0

### YOU SHOULD SEE THIS
---
## STEP 1

Do not call Cordova (native) javascript functions until deviceready fires 



```
document.addEventListener('deviceready', onDeviceReady, false);
```
--
## STEP 1

 Do it the Angular way

 Handle `'deviceready'` event with a promise

```
var deferredReady = $q.defer();
...
_document.addEventListener('deviceready', function() {
      deferredReady.resolve($window.device);
    });
...
```
--
 ## Why should we do so?

 Prevent Cordova calls before it is ready

 Cordova callbacks are executed *OUT* of the Angular loop

 Promises are a way to let AngularJS know when to *update the DOM*

 <small>There are other approcahes, like calling $apply on callbacks</small>

--

### Let's code:

Add two buttons to go to previous and next date

    <button class="btn btn-default btn-lg" ng-click="prev()"> Previous </button>
---
## STEP 2: More templates and data binding

ng-repeat
--

ng-repeat directive

    <td ng-repeat="label in ['Sun','Mon','Tue','Wed','Thu', 'Fri', 'Sat']">
        {{label}}
    </td>

or

    <td ng-repeat="label in labels">
        {{label}}
    </td>
--
### Let's code:

Show a whole month, like here: 
<img src="whole-month.png" />

previous and next move across months, not days

---
## STEP 3: Services and dependency injection
dependency injection

services, values and factories
--
###Dependency injection
Our components are not responsible for the resolution of their dependencies. 

Makes testing easier

Better separation of concerns: Dependency resolution is not a concern for our code anymore

    calendar.controller('CalendarController', 
        function ($scope, $modal, CalendarService) {
        ... this controller depends on $scope, $modal and CalendarService
    });
--
Dependency injection at the module level determines the loading of the module (if no one depends
on module X it will not be loaded)

Dependency injection at the service/controller level determines what is available to the service/controller

--
##Services, values and factories

A service can be either an object or a function that provides some behavior to other components

We can register it by using the Module#factory method:

    var myModule = angular.module('myModule', []);
    myModule.factory('CalendarService', function($http) {
        ... the calendar service depends on the $http service
        });

--
### Let's code:

Refactor your application so that your controller has only presentation logic and domain logic is moved to a service

---

## Other topics to explore with this repo
--
###Angular promises

Angular's $q is a promise implementation inspired by `Q`

    var promise = asyncGreet('Robin Hood');
    promise.then(function(greeting) {
      alert('Success: ' + greeting);
    }, function(reason) {
      alert('Failed: ' + reason);
    }, function(update) {
      alert('Got notification: ' + update);
    });

Promises are a way to avoid callback hell and are easy to compose

--
### Angular UI
A collection of UI-related modules

ui-bootstrap implements bootstrap without depending on jquery

We have used it for the modal component (edit / delete an event)

It provides a promise based API 
--
### Angular HTTP

This service facilitates communication with remote HTTP servers

It provides an API similar to the one of the promises

    $http.get('/someUrl').success(successCallback);

Alternatively, you can also use the `resource` service

Angular also provides a way to mock the server for testing
--
### Let's code

* Edit an event (using AngularUI's modal)
* Delete an event
* Use $http to communicate with a backend (you can use MongoHQ REST API)
---
#Thank you!

