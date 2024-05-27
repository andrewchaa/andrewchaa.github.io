---
title: Understanding Terraform Variables
date: 2024-05-23
tags:
  - terraform
---
Terraform is an open-source infrastructure as code (IaC) tool developed by HashiCorp. It allows developers and system administrators to define and provision data center infrastructure using a high-level configuration language known as HashiCorp Configuration Language (HCL). By using Terraform, you can manage both cloud and on-premises resources in a consistent and repeatable manner.

Variables in Terraform provide a way to parameterise configurations, making your scripts more flexible and reusable. By defining variables, you can customize your configurations without hardcoding values directly into the scripts.

### Types of Terraform Variables

Terraform supports several types of variables, including:

1. **String:** Represents textual data.
2. **Number:** Represents numeric values.
3. **Boolean:** Represents true or false values.
4. **List:** Represents a collection of values of the same type.
5. **Map:** Represents a collection of key-value pairs.
6. **Set:** Similar to lists but with unique elements.
7. **Object:** A collection of named attributes that each have their own type.
8. **Tuple:** A collection of elements of potentially different types.

## Examples of Terraform Variables by Type

### String Variable

```hcl
variable "environment" {
  description = "The environment to deploy to"
  type        = string
  default     = "development"
}

resource "aws_instance" "example" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  tags = {
    Environment = var.environment
  }
}
```

### Number Variable

```hcl
variable "instance_count" {
  description = "The number of instances to create"
  type        = number
  default     = 1
}

resource "aws_instance" "example" {
  count         = var.instance_count
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
```

### Boolean Variable

```hcl
variable "enable_monitoring" {
  description = "Whether to enable detailed monitoring"
  type        = bool
  default     = false
}

resource "aws_instance" "example" {
  ami                  = "ami-12345678"
  instance_type        = "t2.micro"
  monitoring           = var.enable_monitoring
}
```

### List Variable

```hcl
variable "availability_zones" {
  description = "A list of availability zones to deploy into"
  type        = list(string)
  default     = ["us-west-1a", "us-west-1b"]
}

resource "aws_instance" "example" {
  count         = length(var.availability_zones)
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  availability_zone = element(var.availability_zones, count.index)
}
```

### Map Variable

```hcl
variable "instance_types" {
  description = "A map of instance types for different environments"
  type        = map(string)
  default     = {
    dev  = "t2.micro"
    prod = "m5.large"
  }
}

resource "aws_instance" "example" {
  ami           = "ami-12345678"
  instance_type = var.instance_types["dev"]
}
```

### Set Variable

```hcl
variable "allowed_ip_cidrs" {
  description = "A set of allowed IP CIDRs"
  type        = set(string)
  default     = ["192.168.1.0/24", "10.0.0.0/16"]
}

resource "aws_security_group" "example" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_ip_cidrs
  }
}
```

### Object Variable

```hcl
variable "instance_config" {
  description = "Configuration for the instance"
  type = object({
    instance_type = string
    ami           = string
  })
  default = {
    instance_type = "t2.micro"
    ami           = "ami-12345678"
  }
}

resource "aws_instance" "example" {
  ami           = var.instance_config.ami
  instance_type = var.instance_config.instance_type
}
```

### Tuple Variable

```hcl
variable "instance_attributes" {
  description = "A tuple of instance attributes"
  type = tuple([string, number, bool])
  default = ["t2.micro", 1, true]
}

resource "aws_instance" "example" {
  instance_type = element(var.instance_attributes, 0)
  count         = element(var.instance_attributes, 1)
  monitoring    = element(var.instance_attributes, 2)
}
```

## Conclusion

Terraform is a powerful tool for managing infrastructure as code, and understanding how to use variables effectively can greatly enhance the flexibility and reusability of your configurations. By leveraging different types of variables, you can parameterize your scripts, allowing them to adapt to various environments and use cases with ease. Whether you're defining simple string variables or complex objects and tuples, Terraform provides the tools you need to build scalable, maintainable infrastructure.