---
title: Interview Questions - Database
date: 2023-07-02
tags:
  - interview
  - database
---

### Disclaimer


These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.


### What are the differences between SQL and NoSQL databases? Explain how you've worked with both types in your projects.


SQL databases

- Relational data model with predefined schemas
- SQL for querying and managing data
- strong consistency and ACID (Atomicity, Consistency, Isolation, Durability) support
	- Atomicity: In a traction, either all of the pieces are committed or none are
	- Consistency: If any failure occurs, a transaction returns all data to the earlier state
	- Each transaction is isolated from any other
	- Durability: Committed data is saved and available after system restart
- Scale vertically, requiring more powerful hardware

NoSQL databases

- document-based, key-value, column-family, or graph-based. Flexible or dynamic schemas
- query language or APIs
- Eventual consistency and varying level of consistency. ACID trade-off
- Horizontal scalability and distribute data across multiple nodes

### What do foreign keys do

- A field or key that references a primary key in another table
- Maintain referential integrity by ensuring the relationship between two tables: You can’t add a record with non-existent primary key in the parent table
- Used for navigation and joining tables

### How does cascade on delete work in SQL

- Automatically delete records from child tables when the corresponding records in the parent table are deleted

