---
title: Maintenance database in pgAdmin4
date: 2023-05-21
tags:
  - postgresql
  - AWS
---

I have created an RDS Postgresql instance on AWS. However, when I try to connect to it using [pgAdmin4](https://www.pgadmin.org/download/), it prompts me for the Maintenance database. Since the database instance is newly created, I was uncertain about what to input in that field. 

It turned out the "Maintenance database" was the database that pgAdmin connects to when establishing the connection, and it's also used for certain administrative tasks. By default, PostgreSQL creates a database named "postgres" on every new instance.

In the "Maintenance database" field, you can typically enter "postgres" (without the quotes). This is the default database that PostgreSQL creates, and it's often used for this purpose.

Here is a common configuration:

- **Name**: (Any name for your reference)

- **Host name/address**: (your host ip or dns name)

- **Port**: **`5432`** (Default port for PostgreSQL, unless you've changed it)

- **Maintenance database**: **`postgres`**

- **Username**: (The master username you chose during DB instance creation)

- **Password**: (The master password you chose during DB instance creation)

After entering these details, you should be able to connect to your Amazon RDS PostgreSQL DB instance using pgAdmin4. Remember to save your configurations, and you may opt to save your password as well, though be aware of the potential security implications of doing so.

