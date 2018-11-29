# Solution(s)
There are a couple of solutions depending to the business model. i.e. one-off project for the customer or productization.

All solutions were designed around APIs, this means, the solutions may have different client devices or use different ways of notifying user, i.e. sms, mobile app push notification, web push notification etc., or even web sockets and polling.

![Alt text](/solution.png?raw=true "Solution")

The particular solution demonstrated here is the simplest one and for the customer only using web push notification.

## Getting started

start the server

`npm i && npm run start:dev`

This will install the requisite dependencies and start the server on port 3000.

** Use chrome

Open `http://localhost:3000/` to access to main page and subscribe notification.
Open `http://localhost:3000/api-docs` and use swagger UI to maintain sensor data: -
* register sensor
* update current temperature to trigger notification

** if server ever restarted, Open dev tool -> Application -> Service worker -> unregister and refresh the page to subscribe again.

## Assumptions
1. Internet access is always available
2. Sensors are able to make http call to the APIs periodically to report current temperature
3. Faulty sensor scenario is out of scope
3. User has devices that support web push notification, i.e. chrome in Android phone
4. Only one user supported, so authentication and authorization isn't required
5. Only support latest browsers
6. Automated testing for web push notification feature can be very tricky, so the automated tests are only created for APIs, which is the core of all solutions

## Things could be improved
1. if internet connection is an issue, perhaps consider running the server inside phone, so the service won't be impacted even if there is no internet connection.
However, this creates extra complexity for users as they will need to install extra things in the phone.
2. Can be further extended to a SaaS.

## Unit Tests and Integration Tests
* Use `npm run test:coverage` to run all tests and see coverage report
* Use `npm run test:unit` to run only unit tests
* Use `npm run test:integration` to run only integration tests
