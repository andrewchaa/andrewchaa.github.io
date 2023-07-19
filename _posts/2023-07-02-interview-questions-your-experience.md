---
title: Interview Questions - Your experience
date: 2023-07-02
tags:
  - interview
---

### Disclaimer

These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.

### Talk us through your current role

- Senior Full Stack engineer in Platform team and Practitioner team

- Platform team

	- Created IDS endpoint with terraform

	- Duplicate the network traffic to the endpoint

	- Fix and patch NPM package vulnerabilities

	- Fork a repository that’s not maintained any more and update the ruby syntax

	- Update docker images and upgrade vulnerable dependencies

- Practitioner team

	- Write Cypress E2E tests

	- React app using react hook form

	- Jest and react-testing library tests

- Deepeyes

	- Provision Lambdas, API Gateway, DynamoDB, Cognito, CloudWatch with terraform

	- RESTful APIs and GraphQL queries and mutations

	- Next.js web app and React Native mobile apps.

	- Use React Query for Offline support in mobile apps

### How did you approach the coding test and where did you start?

- Build walking skeleton, implementing only the happy path to understand what it does and how it works

- Write tests and work on unhappy paths and validations, refactoring the existing code

- Consider Domain language and refactor code, following the emerging pattern

### What do you understand by operability and how do you use it in your current role?

- Operability means how easy it is to keep running a software system smoothly and to maintain it.

- Monitoring: track errors, slow transactions, and infrastructure metrics to detect and address issues proactively

- Logging: emit useful logs, entry and exit of each module that can aid in debugging and provide valuable insight into how the system behaves in production

- Documentation: ADR, On call documentation, usage of various tools, run book

- Automation: automate routine tasks to reduce human errors and to improve efficiency

- Incident response: well-defined incident response procedures

- Postmortems and continuous improvement

### How do you keep updated with tech news

- Hacker news

- Twitter. Kent Beck, Martin Fowler

- ThoughtWorks Tech Radar

- Tech Meet up

### Can you provide an overview of your experience working in Agile environments? How do you ensure effective communication and collaboration within the team?

Agile environment

- Work in a cross-function team

- Sprint and Kanban

- Agile is about receiving feedback early and often

- Retrospective is the foundation

Effective communication

- daily stand-up meeting

- team channel

- pair-programming

- regular demo and show and tell

- open discussions and active listening

### How do you approach estimating task complexity and time requirements during sprint planning sessions?

- Estimation is an ongoing process

- Break down larger tasks into smaller, manageable subtasks

- Use techniques like story points, T-shirt sizing, planning poker

- Use historical data

- Collaborative estimation

- Consider risks and dependencies

### Describe your experience working with solution designers and DevOps architects to design and implement technical solutions.

- Weekly catch up with a principal engineer and a DevOps engineer

- In case of Data Bricks data migration, a principal engineer, MS consultant, and a platform engineer were involved

- Validation rules on API endpoints. Together with other teams, involving a principal developer

### Can you share your experience mentoring less experienced colleagues within a team? How do you approach knowledge sharing and supporting their growth?

- Pair programming: show that I make mistakes, have gaps in my knowledge and not afraid to google to find the answer. Share my shortcuts, my practices, and how to solve a problem step by step, learning something new on the way

- Show and tell. Encourage everyone to share what he or she has learned. People can ask questions

- Whiteboard session. Present a challenge what we have. Provide a few options we can think about. Then we discuss them

### How do you ensure that code reviews are thorough and lead to best practices being followed within the team?

- Team coding convention

- Ensure at least 2 people review the code

- Make the PR small and more often

- It should have accompanying tests

- Automate common checks: use linters and formatting tools

### What was a time when you have been responsible for taking an influential technical decision and implementing it? What was the outcome?

- Go for messaging service, rather than API calls between services to make them loosely coupled. From Bi-monthly release to multiple releases a day

- BFF: Backend for FrontEnd. The website was based on replication data. Built a new APIs for FrontEnd that can modify and delete data.

- Data migration with Data Bricks, rather than using CosmosDB change feed. One time job, quickly done. No need to provision the resource and destroy it.

### How do you motivate colleagues and create a positive working environment?

- Create an intellectually safe environment - people can ask questions without fear of being seen incapable. Nurture growth mindset. We learn something along the way

- However small, try to take a step towards our technical North Star

- Encourage open communication: Active listening and let people talk and be heard before we make a team decision

- Recognise achievements and hard work, and show appreciation

- Offer opportunities: brown bag session talk, show and tell, go to team leads meeting

- Transparent and honest

- Healthy work-life balance

### What is your experience with mentoring and supporting fellow developers and team members?

- Open and honest, and approachable. Create an environment where they feel comfortable sharing their concerns or challenges

- Share my knowledge and experience. Show I approach a problem and learn along the way.

- Offer support and resources

