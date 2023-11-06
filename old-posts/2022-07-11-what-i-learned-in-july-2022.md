---
title: What I learned in July 2022
date: 2022-07-11
tags:
  - til
---

[Swashbuckle](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) generate schema automatically. Out of the box, it uses class name as the schema id and if you have the same classname from two different namespaces, you get an error. 

```bash
Swashbuckle.AspNetCore.SwaggerGen.SwaggerGeneratorException: Failed to generate Operation for action - PayController.RequestTransfer (PlaygroundApi). See inner exception
 ---> System.InvalidOperationException: Can't use schemaId "$PostalAddress24" for type "$ISO20022.Messages.Camt_054_001.V09.PostalAddress24". The same schemaId is already used for type "$ISO20022.Messages.Pacs_008_001.V10.PostalAddress24"
```

[To fix it](https://stackoverflow.com/questions/61881770/invalidoperationexception-cant-use-schemaid-the-same-schemaid-is-already-us), you have to instruct Swashbuckle to use `fullname`

```bash
builder.Services.AddSwaggerGen(o =>
		{
			o.OperationFilter<CallbacksOperationFilter>();
			o.CustomSchemaIds(type => type.ToString());
		});
```

(Mon. 18)

### Javascript regex. Tue. 12

I had to capture an error message.

```typescript
const errorMessage = /:(.*?):/g.exec(err)[1] 
// capture everything within :

Alert.alert('Error', errorMessage, [{ text: 'Ok' }], {
  cancelable: true,
})
```

AWS AppSync uses request and response resolver. The default resolver doesn’t return the error details. You have to use `$utils.error` resolver command.

```typescript
#if($context.error)
    $utils.error($context.error.message, $context.error.type, $context.arguments)
#else
    $util.toJson($context.result)
#end
```

Also you have to throw an error in the code.

```typescript
if (await isSerialNumberUsed(registration.serialNumber)) {
  const errorMessage = `Serial number ${registration.serialNumber} is already used`
  console.error(errorMessage)
  throw new Error(errorMessage)
}
```

Mon. 11

Setting sentry.io for AWS Lambda Node.js

[https://docs.sentry.io/platforms/node/guides/aws-lambda/?_ga=2.159003514.1119004233.1657568059-1671292282.1657320341](https://docs.sentry.io/platforms/node/guides/aws-lambda/?_ga=2.159003514.1119004233.1657568059-1671292282.1657320341)

You can [sort a collection of objects in javascript](https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value) with `sort` function.

```typescript
const data = await ddbDocClient.send(new QueryCommand(params))
return data
  .Items
  .sort((a, b) => new Date(b.registrationDateIso).getTime()
    - new Date(a.registrationDateIso).getTime())
```

