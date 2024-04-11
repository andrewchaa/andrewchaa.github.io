---
title: Java Instant Class
date: 2024-04-11
tags:
  - java
  - Instant
---
`Instant` class is like a single moment in time in the UTC time zone. If time is a line, `Instant` represents a single point on the line. It's Unix epoch time based. 

### Examples

```java
Instant twelveHoursFromNow = Instant.now().plus(12, ChronoUnit.HOURS);
Instant thirtyDaysAgo = instantSource.instant().minus(30, ChronoUnit.DAYS);
Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
```

We can compare two Instants
```java
Instant instant1 = Instant.now();
Instant instant2 = instant1.plus(1, ChronoUnit.SECONDS);
assertTrue(instant1.isBefore(instant2));
assertFalse(instant1.isAfter(instant2));
```