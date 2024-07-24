# GiveLifyHomeAssignment
GiveLify Home Assignment

# Setup and run

Install Git
https://git-scm.com/downloads

Install Node
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm?ref=sfeir.dev

Clone the repo

git clone https://github.com/christiandavidfs/GiveLifyHomeAssignment.git

Go to the  E2E folder

npm install

to run the test one by one:
npx cypress open

to run all the tests:
npx cypress run

to run the tests with a word in the title:
npx cypress run --env grep="keyword"

to run the test with an specific tag:
npx cypress run --env grepTags=keyword

more examples can be found here:
https://www.npmjs.com/package/@cypress/grep


# Additional Documentation

Word files:
Test Plan.docx

A Test Plan is a comprehensive document that outlines the overall approach and scope of testing for a project or release. It serves as a guide for the testing process, detailing what will be tested, how it will be tested, and who will be responsible for it.

Components:

Test Objectives: What the testing aims to achieve.
Scope of Testing: Features and functionalities to be tested and those that are out of scope.
Test Approach: The overall strategy for testing, including methodologies and types of testing (e.g., functional, non-functional).
Test Environment: Details about the hardware, software, and network configurations required for testing.
Test Resources: Team members involved, their roles, and responsibilities.
Schedule: Timeline for testing activities and milestones.
Risk and Mitigation: Potential risks and their mitigation strategies.
Acceptance Criteria: Conditions that need to be met for the software to be considered acceptable.


Test Strategy.docx

A Test Strategy is a high-level document that outlines the overall approach to testing for an organization or project. It defines the testing goals, principles, and methods to be followed, but it is usually less detailed than a Test Plan.

Components:

Testing Objectives: What the testing aims to achieve.
Testing Approach: High-level strategy, including the testing types and methodologies to be employed.
Test Levels: Different levels of testing, such as unit testing, integration testing, system testing, and acceptance testing.
Test Types: Various types of testing like functional, performance, security, usability, etc.
Tools and Resources: Tools and resources needed for testing.
Defect Management: How defects will be reported, tracked, and managed.

Test Suites and Test Cases.docx

A Test Suite is a collection of test cases that are grouped together based on specific criteria, such as the functionality being tested, the type of testing, or the features being validated. It helps in organizing and executing test cases systematically.

Components:

Suite Name: A descriptive name for the suite.
Test Cases: A list of test cases included in the suite.
Purpose: The objective or focus of the test suite (e.g., testing a particular feature or functionality).
Example:
A Test Suite for "User Authentication" might include test cases for login functionality, password recovery, and user registration.

Test Cases
A Test Case is a detailed description of a specific test scenario that includes the conditions, actions, and expected results. Test cases are used to validate that the software behaves as expected under various conditions.

General Document.docx

In this case we are trying to manage this questions

1. What are the needed test scenarios?
2. What is the documentation process for these test scenarios?
3. Which tests should be automated?
4. How do we ensure that the search is performing well? Can it handle load? Are the
search results being returned in a timely manner?

Some of the steps show in the documentation is focused for a work on teams (QA+DEV or QA+QA) like te implementation of pair reviews to ensure the quality of code and/or test cases design.

# Tests Structure

We have inside cypress/e2e a folder structure with different kind of tests.

Api folder

We have positive and negative tests for the api tests.

Negative_api_spec.cy.js
We have tests t validate different error messages

performance.cy.js
We have easy tests to assert the load time for web and api are under 3 seconds (3000ms)

Positive json against response api_spec.cy.js
We are comparing the full json against the api response

Positive_api_spec_BySearch.cy.js
Various tests using the By Search Title

Positive_api_spec_ByTitle.cy.js
Some other positive tests searching by title, expecting valid movie titles and reatings, plus the hability to override the data to be asserted.

Pages folder

Here you can find page elements, a sort of page objects.

ui folder

Here we have the test for the user interface

 
fixture folder

Here we can save json files or other files to compare and use them in the tests

Jmeter folder

Folder for the load tests
