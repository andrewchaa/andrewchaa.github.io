---
title: Introduction to KQL (Kusto Query Language)
date: 2022-12-19
tags:

---

Kusto Query Language (KQL) is a powerful and highly interactive query language designed specifically for exploring and analyzing data in Azure Data Explorer. It is a simple, yet powerful language that allows you to perform a wide range of data analysis tasks, from simple data filtering and aggregation to more complex machine learning and predictive modeling.

One of the key benefits of KQL is its ease of use. It has a simple and intuitive syntax that is easy to learn, even for those with no prior experience with query languages. Additionally, KQL provides a rich set of functions and operators that allow you to manipulate and analyze your data in a variety of ways.

KQLs are can be used 1) Azure Data Explorer, 2) Azure Log Analytics, and 3) PowerBI

To give you an idea of what KQL can do, let's look at a few examples.

### Example 1: Filtering and Aggregation

Suppose we have a table of sales data, and we want to find the total sales for each product category. We can do this using the following KQL query:

```sql
SalesData
| summarize sum(SalesAmount) by Category
```

This query filters the **`SalesData`** table for only the **`Category`** column, and then aggregates the data by summing up the **`SalesAmount`** column for each unique category. The result of this query will be a table with two columns: **`Category`** and **`sum_SalesAmount`**.

### Example 2: Joining Tables

Suppose we have two tables: one containing sales data, and another containing product information. We can join these tables using the **`join`** operator to get a combined view of the data. For example:

```sql
SalesData
| join (ProductInfo) on SalesData.ProductID == ProductInfo.ProductID
| summarize sum(SalesAmount) by Category, ProductName
```

This query first joins the **`SalesData`** and **`ProductInfo`** tables on the **`ProductID`** column, and then aggregates the data by summing up the **`SalesAmount`** column for each unique combination of **`Category`** and **`ProductName`**. The result of this query will be a table with three columns: **`Category`**, **`ProductName`**, and **`sum_SalesAmount`**.

### Summarize

In Kusto Query Language, the **`summarize`** operator is used to perform aggregations on a set of rows and return a single value for each group.

Here is an example of how to use **`summarize`**:

```sql
let T = datatable(name:string, age:int, salary:int)
[
    "John", 29, 50000,
    "Mary", 35, 75000,
    "Bob", 50, 60000,
    "Alice", 40, 80000
];
T
| summarize sum(salary)
```

This will return the sum of all salaries in the table **`T`**.

You can also use **`summarize`** to perform aggregations on a specific column and group the results by one or more columns. For example:

```sql
let T = datatable(name:string, age:int, salary:int, department:string)
[
    "John", 29, 50000, "Marketing",
    "Mary", 35, 75000, "Sales",
    "Bob", 50, 60000, "IT",
    "Alice", 40, 80000, "HR"
];
T
| summarize sum(salary) by department
```

This will return the sum of salaries for each department. The output will look like this:

```sql
department  sum_salary
----------  -----------
HR          80000
IT          60000
Marketing   50000
Sales       75000
```

You can also use multiple aggregation functions in a single **`summarize`** operator. For example:

```sql
let T = datatable(name:string, age:int, salary:int, department:string)
[    "John", 29, 50000, "Marketing",    "Mary", 35, 75000, "Sales",    "Bob", 50, 60000, "IT",    "Alice", 40, 80000, "HR"];
T
| summarize min(age), max(age), avg(salary) by department
```

This will return the minimum age, maximum age, and average salary for each department. The output will look like this:

```sql
department  min_age  max_age  avg_salary
----------  -------  -------  ----------
HR          40       40       80000
IT          50       50       60000
Marketing   29      29      50000
Sales       35       35       75000
```

I hope this helps! Let me know if you have any questions.

Add examples of using 'countif()'

**`countif()`** is a function in Kusto Query Language that counts the number of rows in a table that satisfy a given condition.

Here is an example of how to use **`countif()`**:

```sql
let T = datatable(name:string, age:int, salary:int)
[
    "John", 29, 50000,
    "Mary", 35, 75000,
    "Bob", 50, 60000,
    "Alice", 40, 80000
];
T
| summarize countif(age > 35)
```

This will return the number of rows in the table **`T`** where the value of the **`age`** column is greater than 35. In this case, the output will be **`2`**, because there are two rows where the value of **`age`** is greater than 35 (i.e., the rows for **`Bob`** and **`Alice`**).

You can also use **`countif()`** in combination with the **`summarize`** operator to count the number of rows in each group. For example:

```sql
let T = datatable(name:string, age:int, salary:int, department:string)
[
    "John", 29, 50000, "Marketing",
    "Mary", 35, 75000, "Sales",
    "Bob", 50, 60000, "IT",
    "Alice", 40, 80000, "HR"
];
T
| summarize countif(age > 35) by department
```

This will return the number of rows in each department where the value of the **`age`** column is greater than 35. The output will look like this:

```sql
department  countif_age
----------  -----------
HR          1
IT          1
Marketing   0
Sales       0
```

You can also use **`countif()`** to count the number of rows that satisfy multiple conditions. For example:

```sql
let T = datatable(name:string, age:int, salary:int, department:string)
[
    "John", 29, 50000, "Marketing",
    "Mary", 35, 75000, "Sales",
    "Bob", 50, 60000, "IT",
    "Alice", 40, 80000, "HR"
];
T
| summarize countif(age > 35 and salary > 65000) by department
```

This will return the number of rows in each department where the value of the **`age`** column is greater than 35 and the value of the **`salary`** column is greater than 65000. The output will look like this:

```sql
department  countif_age
----------  -----------
HR          1
IT          0
Marketing    0
Sales       1
```

I hope these examples are helpful! Let me know if you have any questions

