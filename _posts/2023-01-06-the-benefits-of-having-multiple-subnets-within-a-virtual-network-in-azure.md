---
title: The benefits of having multiple subnets within a virtual network in Azure
date: 2023-01-06
tags:
  - azure
  - network
---

There are several benefits to creating multiple subnets within a virtual network in Azure:

### Network security

By creating multiple subnets, you can segment your network and better control access between resources within the virtual network. For example, you might allow incoming traffic on port 8080 for one subnet, but restrict all access but to port 1433 on another subnet that hosts a database server.

### Resource organization

Creating multiple subnets can help you organize your resources and make it easier to manage them.

### Scaling

Multiple subnets allow you to scale your network more easily by allowing you to add new resources to different subnets as needed.

### Isolation

Creating multiple subnets can also provide additional isolation for your resources, which can be useful for security or compliance purposes.

### Traffic management

You can also use multiple subnets to manage traffic flow within your virtual network, for example by using network address translation (NAT) to control access to resources.

### Cf. What is NSG (Network Security Group)?

A Network Security Group (NSG) is a security layer for a virtual network that controls inbound and outbound network traffic based on predetermined security rules. These rules can be used to allow or deny traffic to resources within the virtual network, such as virtual machines, based on various criteria such as source IP address, destination port, and protocol.

An NSG can be associated with a subnet or a specific resource, such as a virtual machine, to control traffic to and from that resource. NSGs can be used in conjunction with other Azure security features, such as Azure Firewall and Azure Virtual WAN, to provide a comprehensive security solution for your Azure resources.

### Cf. What is range?

In a TCP/IP network, a range is defined using a combination of an IP address and a subnet mask. The IP address identifies the network, while the subnet mask determines which portion of the IP address is used to identify the network and which portion is used to identify the host on the network.

In the example you provided, 10.1.0.0/28, the IP address 10.1.0.0 represents the network, and the subnet mask /28 indicates that the first 28 bits of the IP address are used to identify the network and the remaining bits are used to identify the host.

This means that the network range in this example includes all IP addresses from 10.1.0.0 to 10.1.0.15, a total of 16 IP addresses. The first IP address (10.1.0.0) is reserved for the network address, and the last IP address (10.1.0.15) is reserved for the broadcast address. The remaining IP addresses in the range can be assigned to devices on the network.

