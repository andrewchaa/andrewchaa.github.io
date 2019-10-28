---
published: true
---
## Strongly Typed Identifier

GUID or UUID is the almost standard identifier for entity objects these days. It used be INT and I still do love INT as id type, but the trend is GUID.

GUID is also globally unique. It’s not universally unique though 🙂

I come across many methods and constructors that accept multiple Ids.

```csharp
public Shareholder GetShareholder(Guid companyId, Guid shareholderId) {
  ...
}
```

The problem is it’s very easy to misplace ids. You can pass shareholderId first and then companyId. This primitive obsession leads to various kinds of bugs often. When you say the temperature is 20, is it in Celsius or Fahrenheit? Strongly Typing Ids can solve those issues and prevent the bugs from happening.

The use case of Strongly typed Id is like this.

```csharp
public class Shareholder {
  public Id<Company> CompanyId { get; }
  public Id<Shareholder> ShareholderId { get; }
  ...
}
```

The repository signature changes now.

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