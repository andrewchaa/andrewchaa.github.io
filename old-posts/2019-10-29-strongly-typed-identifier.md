---
title: Strongly Typed Identifier
date: 2019-10-29T00:00:00.000Z
categories:
  - programming
tags:
  - domain-driven-design
---

GUID or UUID is the almost standard identifier for entity objects these days. It used be INT and I still do love INT as id type, but the trend is GUID.

GUID is also globally unique. It’s not universally unique though 🙂

I come across methods and constructors that accept multiple Ids.

```csharp
public Shareholder GetShareholder(Guid companyId, Guid shareholderId) {
  ...
}
```

The problem is all GUIDs are interchangeable and it’s very easy for you to make a mistake. You can pass shareholderId first and then companyId, instead of passing companyId and then shareholderId. This [primitive obsession](https://medium.com/@arpitjain.iec/primitive-obsession-code-smell-that-hurt-people-the-most-5cbdd70496e9) leads to various kinds of bugs often. When you say the temperature is 20, is it in Celsius or Fahrenheit? Strongly Typing Ids can solve those issues and prevent the bugs from happening.

Give a specific type to your Id and the compiler will tell you when you make a mistake.

```csharp
public class Shareholder {
  public Id<Company> CompanyId { get; }
  public Id<Shareholder> ShareholderId { get; }
  ...
}
```

With strontly typed id, The repository signature will change like the below.

```csharp
public Shareholder GetShareholder(Id<Company> companyId, Id<Shareholder> shareholderId) {
  ...
}
```

You have two options to create typed Id. The first option is creating Id classes individually like CompanyId and ShareholderId. It’s straightforward. The second is to have a generic Id<T> class. I went for the second, as one class can handle all.

```csharp
public struct Id<T> {
  public Guid Value { get; }
  public Id(Guid value) {
    Value = value;
  }

  public static implicit operator Guid(Id<T> id) => id.Value;

  public override string ToString() {
    return Value.ToString();
  }

  public bool Equals(Id<T> other) {
    return obj is Id<T> other && Equals(other);
  }

  public override int GetHashCode() {
    return Value.GetHashCode();
  }
}
```

Type system is like compile-time unit testing. If the type is not right, test fails. Primitive obsession is very common but let's not fall into it. Let's take advantage of C#'s great type system
