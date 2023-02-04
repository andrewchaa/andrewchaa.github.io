---
title: Azure Databricks
date: 2023-01-19
tags:
  - azure
  - databricks
---

Azure Databricks is a fully managed platform for running Apache Spark on Microsoft Azure. It provides a collaborative, cloud-based environment for data engineers, data scientists, and business analysts to work with big data. Databricks allows users to build and deploy data pipelines, train machine learning models, and create interactive dashboards and notebooks. It also integrates with other Azure services, such as Azure Data Lake Storage and Azure SQL Database, to provide a complete data processing solution. Additionally, it supports multiple languages including Python, R, SQL, and Scala.

### Notebook

In Azure Databricks, a notebook is a web-based interface that allows users to interactively work with their data, write and run code, and create visualizations. The notebook is based on the open-source Jupyter notebook and supports multiple programming languages including Python, R, SQL, and Scala.

### Sqls

Get current timestamp and unix timestamp

```sql
%sql
SELECT unix_timestamp('2016-04-08', 'yyyy-MM-dd'), 
  current_timestamp(), 
  unix_timestamp(current_timestamp(), 'yyyy-MM-dd HH:mm:ss'),
  date_sub(current_timestamp(), 44),
  unix_timestamp(date_sub(current_timestamp(), 44))
```

