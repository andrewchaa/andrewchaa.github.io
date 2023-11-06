---
title: Interview Questions - Testing
date: 2023-07-02
tags:
  - react-testing-library
  - interview
---

### Disclaimer


These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.


### How do you approach UI testing?

- **Define the Scope of Testing**: What areas of the application's UI are you testing? What specific functionalities will be tested?
- **Design and Develop Test Cases**: a mix of positive (expected use) and negative (unexpected or edge case use) scenarios.
- **Manual Testing**: Exploratory testing
- **Automated Testing**: Selenium, Puppeteer, or Cypress can be used to automate browser-based testing, while Jest and React Testing Library (or Enzyme) can be used for unit testing in React. End-to-end testing frameworks such as Cypress or Nightwatch.js are also powerful tools.
- **Usability Testing**: With real users to understand how intuitive and user-friendly the application is.
- **Accessibility Testing**: Ensuring your application is accessible to all users, including those with disabilities, is extremely important. Tools like Google Lighthouse can be used to automate some accessibility tests, but manual testing may also be required.
- **Responsive Testing**: In this modern era, applications should work flawlessly on different devices (desktop, tablets, mobile phones) and different screen sizes. Tools like BrowserStack or responsive design checker tools can be helpful.
- **Cross-Browser Testing**: Applications should also be tested across different browsers (like Chrome, Firefox, Safari, Edge) to ensure compatibility.
- **Performance Testing**: It's also important to test the UI under different network and server conditions to see how it performs. Load testing can be used to ensure that the UI remains responsive and stable under heavy load.
- **Continuous Integration/Continuous Delivery (CI/CD)**: Incorporate the UI tests into your CI/CD pipeline to ensure that any changes or updates to the application do not break existing functionality.

### How do you approach adding integration tests and unit tests in your development process?

- Write unit test and then integration test
- Write integration tests first and then unit test.
- Component test

### Describe your experience monitoring service metrics and logs. What tools or strategies do you use to ensure the reliability and performance of your services?

- Every morning, I check on CloudWatch dashboard to see if there are messages in DLQ. Check error responses in the API calls.
- Set alarm on the number messages in DLQ, API response time, failed API requests on Slack and on mobile phone
- Set SLO: Service Level Objective

