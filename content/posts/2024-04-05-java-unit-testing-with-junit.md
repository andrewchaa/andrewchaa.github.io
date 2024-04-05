---
title: Java Unit testing with junit
date: 2024-03-25
tags:
  - java
  - mockito
---
JUnit is a popular open-source unit testing framework for Java applications. It provides a simple and elegant way to write and execute unit tests for individual components or methods of a Java codebase. Unit testing is an essential practice in software development, as it helps catch bugs early, ensures code correctness, and facilitates refactoring and maintenance.


### Introduction
Here are the key concepts and components of JUnit:

- **Test Case**: A test case is a single unit test that tests a specific scenario or behavior of a method or component. In JUnit, a test case is represented by a method annotated with `@Test`.

```java
@Test
public void testAddition() {
    int result = calculator.add(2, 3);
    assertEquals(5, result);
}
```

- **Test Suite**: A test suite is a collection of test cases that are intended to be run together. JUnit provides an annotation `@Suite` to define a test suite, or you can use the `@RunWith` and `@SuiteClasses` annotations to specify the test suite.

- **Assertions**: Assertions are statements that verify the expected behavior of a method or component. JUnit provides various assertion methods, such as `assertEquals`, `assertNotNull`, `assertTrue`, and `assertFalse`, to assert the expected outcomes of a test case.

- **Test Fixtures**: Test fixtures are the initial conditions or prerequisites that need to be set up before running a test case and the cleanup actions that need to be performed after running the test case. JUnit provides `@Before` and `@After` annotations to define setup and teardown methods, respectively.

- **Test Runner**: A test runner is a component that executes the test cases and reports the results. JUnit provides various test runners, such as `JUnitCore` and `BlockJUnit4ClassRunner`, which can be used to run tests from the command line or within an integrated development environment (IDE).

- **Test Annotations**: JUnit provides several annotations to specify the behavior and configuration of tests, such as `@Ignore` (to ignore a test case), `@Disabled` (to disable a test case), `@ParameterizedTest` (to run a test case with different input parameters), and `@RepeatedTest` (to repeat a test case multiple times).

Here's an example of a simple JUnit test class:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    @Test
    public void testAddition() {
        Calculator calculator = new Calculator();
        int result = calculator.add(2, 3);
        assertEquals(5, result);
    }

    @Test
    public void testSubtraction() {
        Calculator calculator = new Calculator();
        int result = calculator.subtract(5, 3);
        assertEquals(2, result);
    }
}
```

In this example, we have a `CalculatorTest` class that contains two test cases: `testAddition` and `testSubtraction`. Each test case instantiates a `Calculator` object and tests the corresponding method with the expected input and output values.

### Parameterised Test
JUnit's `@ParameterizedTest` and `@ValueSource` annotations are used together to execute a single test case multiple times with different input values or parameters. This approach is particularly useful when you want to test a method or component with a range of input values without having to write separate test cases for each input.

Here's an example that demonstrates how to use `@ParameterizedTest` and `@ValueSource`:
```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@ParameterizedTest
@ValueSource(booleans = {true, false})
void startReview(boolean isSpeakerCheckEnabled) {
    // GIVEN
    given(configuration.isSpeakerCheckEnabled())
	    .willReturn(isSpeakerCheckEnabled);

    // WHEN
    underTest.startReview(reviewRequest);

    // THEN
    verify(facialRecognitionCheck)
	    .runPrerequisites(any(AccountAccessReviewRequest.class));
    if (isSingleSpeakerCheckEnabled) {
        verify(speakerCheck)
	        .runPrerequisites(any(ReviewRequest.class));
    } else {
        verify(speakerCheck, never())
	        .runPrerequisites(any(ReviewRequest.class));
    }
}
```