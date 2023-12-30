---
title: Jest guide
date: 2023-10-12
tags:

---

Jest is a popular JavaScript testing framework developed and maintained by Facebook. It is known for its zero-config setup, good performance, and feature-rich ecosystem.


## Set up


Install packages and [intialise jest](https://jestjs.io/docs/getting-started#using-typescript). 


```bash
yarn add -D jest ts-jest
yarn add -D @types/jest
yarn add -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
yarn add -D ts-node
```


```shell
# to initialise jest
jest --init 
```


`jest --init` will create a configuration file, `jest.config.js`, and add `test` script to the `package.json`


## `jest.mock`


It’s the simplest form of mock and works in various scenarios.


```typescript
// mock npm package
jest.mock('expo-media-library', () => ({
  requestPermissionsAsync: jest.fn(),
}))

// mock an imported function
jest.mock('../../api/serviceAgentUserService', () => ({
  getAllUsers: jest.fn().mockReturnValue({
    status: 200,
    message: 'Successfully retrieved jobs',
    data: [
        {
          lastname: 'Rehman',
          companyId: 'CT01',
          companyName: 'London Service Center',
          firstname: 'Shafiq',
          gasSafetyNumber: '570908',
          email: 'Shafiq.rehman@navienuk.com',
          oftecNumber: 'C500579',
        }
      ]}
    )
}))
```


But make sure `jest.mock` is outside `describe` block. Otherwise, it wouldn’t work!


### Mock and verify


Import the function and mock it with `jest.mock` to perform verification. The reason it works is because `jest.mock()` gets executed first.


```typescript
import { createRegistration } from './registrations'
import { upsertRegistration } from '../repositories'
import dayjs from 'dayjs'

const today = new Date()

jest.mock('../repositories/registrations', () => ({
  upsertRegistration: jest.fn(),
}))

describe('registrations', () => {
  it('should create a registration with registrationDate', async () => {
    const registration = {
      userId: 'userId',
      registrationId: 'registrationId',
      serialNumber: 'serialNumber',
      model: 'model',
      installationDate: '2021-01-01',
      firstName: 'firstName',
      lastName: 'lastName',
      contactNo: 'contactNo',
      emailAddress: 'emailAddress',
      door: 'door',
      street: 'street',
      county: 'county',
      city: 'city',
      postcode: 'postcode',
      country: 'country',
    }

    await createRegistration(registration)

    expect(upsertRegistration).toHaveBeenCalledWith({
      ...registration,
      postCode: 'postcode',
      registrationDate: dayjs(today).format('DD/MM/YYYY'),
      registrationDateIso: expect.any(String),
      updateDateIso: expect.any(String),
      warrantyDate: '',
      warrantyYear: -1,
    })
  })
})
```


### Verify parameters passed to the mocked function


```typescript
jest.mock('../common/repositories/jobsMongo', () => ({
  upsertJobMongo: jest.fn(),
}))

it('should save the job with given details from CIC', async () => {
    await handler({ body: JSON.stringify(job) } as APIGatewayProxyEvent)

    expect(upsertJobDynamo).toHaveBeenCalled()

    const jobSaving = (upsertJobMongo as jest.Mock).mock.calls[0][0] as Job
    expect(jobSaving.jobNo).toEqual('jobNo')
    expect(jobSaving.companyId).toEqual('companyId')
    expect(jobSaving.customer).toEqual('customer')
    expect(jobSaving.product).toEqual({
      id: 'product id',
      name: 'product name',
      serialNumber: serialNumber,
      modelName: 'LCB 700 Combi External 21KW',
    })
    expect(jobSaving.serviceRequestDate).toEqual(dateString)
    expect(jobSaving.estimatedSymptom).toEqual('estimated symptom')
    expect(jobSaving.customerComment).toEqual('customer comment')
    expect(jobSaving.installationDate)
      .toEqual(dayjs().add(-10, 'day').format('YYYY-MM-DD'))
    expect(jobSaving.warrantyExpiryDate)
      .toEqual(dayjs().add(7, 'year').format('YYYY-MM-DD'))
  })
```


### Mock function to return its parameter


```typescript
jest.mock("../common/repositories/registrationsDynamo", () => ({
  upsertRegistrationDynamo: jest.fn(x => Promise.resolve([x, '200', ''])),
}))
```


### Manual mock


A manual mock in Jest is a custom implementation of a module that you want to use in place of the real module in your tests. The purpose of using a manual mock is to isolate your tests from the implementation details of the module and control its behavior in a way that is relevant to your test cases.


A manual mock is created by creating a mock file in a **`__mocks__`** directory and defining the mock implementation for the module. When you import the module in your test file, Jest will automatically use the mock implementation instead of the actual module.


Here's an example of how you can create a manual mock for a module named **`moduleA`**:

1. Create a **`__mocks__`** directory in the same folder as your test file.
2. In the **`__mocks__`** directory, create a file named **`moduleA.js`**

To mock a scoped module called `@scope/project-name`, create a file at `__mocks__/@scope/project-name.js`, creating the `@scope/` directory accordingly.


```bash
root
| -- node_modules
| -- __mocks__
    | -- react-native-keyboard-aware-scroll-view.ts

```


```typescript
export const KeyboardAwareScrollView = () =>
  jest.fn().mockImplementation(
    ({ children }) => children
  )
```


### Mock ES6 class


`@aws-sdk/client-s3` package is a javascript class. To use, you have to create an instance.


```graphql
import { S3 } from '@aws-sdk/client-s3'

const s3 = new S3({ region: config.region })
job.photos.forEach(async photo => {
  await s3.copyObject({
    Bucket: config.photo_storage_bucket_name,
    CopySource: `${config.photo_storage_bucket_name}/${photo.shortFilename}`,
    Key: photo.shortFilename,
    MetadataDirective: 'REPLACE',
    ContentType: 'image/jpeg',
  })
})
```


To mock this, you can simply use `jest.mock()`


Calling `jest.mock('')` returns a useful "automatic mock" you can use to spy on calls to the class constructor and all of its methods. It replaces the ES6 class with a mock constructor, and replaces all of its methods with [mock functions](https://jestjs.io/docs/mock-functions) that always return `undefined`. Method calls are saved in `theAutomaticMock.mock.instances[index].methodName.mock.calls`


```graphql
jest.mock('@aws-sdk/client-s3')
```


### Mock aws sdk v3


```typescript
import axios from 'axios'
import { S3Client } from '@aws-sdk/client-s3'
import { mockClient } from 'aws-sdk-client-mock'
import { handler } from '../../../src/refresh-codes'
import { cicBaseUrl } from '../../../src/common/constants/baseUrls'
import config from '../../../src/config'

jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve({
     data: ['sampleSymptom1', 'sampleSymptom2']
    })),
}))
const mockS3Client = mockClient(S3Client)

describe('refrehs codes', () => {
  it('should refresh symptoms and write to S3', async () => {
    await handler({})

    expect(axios.post).toHaveBeenCalledWith(
      `${cicBaseUrl}/API/szCode.json`,
      { codeType: 'symptom' },
      { headers: { 'Content-Type': 'application/json' } }
    )

    console.log(mockS3Client.call(0).args[0].input)

    expect(mockS3Client.call(0).args[0].input).toEqual(
      {
        Bucket: config.codes_bucket_name,
        Key: 'symptoms.json',
        Body: JSON.stringify(['sampleSymptom1', 'sampleSymptom2']),
        ContentType: 'application/json',
      }
    )
  })
})
```


### Mock axios


```java
import axios from 'axios'
import { handler } from '../../../src/refresh-codes'
import { cicBaseUrl } from '../../../src/common/constants/baseUrls'
import config from '../../../src/config'

jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve({
     data: ['sampleSymptom1', 'sampleSymptom2']
    })),
}))

describe('refrehs codes', () => {
  it('should refresh symptoms and write to S3', async () => {
    await handler({})

    expect(axios.post).toHaveBeenCalledWith(
      `${cicBaseUrl}/API/szCode.json`,
      { codeType: 'symptom' },
      { headers: { 'Content-Type': 'application/json' } }
    )
  })
})
```


The code mocks the **`axios`** library, specifically the **`post`** method. Instead of making actual HTTP requests, any call to **`axios.post`** within the tested code will return a resolved promise with the provided data (**`['sampleSymptom1', 'sampleSymptom2']`**). This ensures that the test doesn't make actual network requests and behaves predictably.


The test invokes the **`handler`** function.It then checks (using the **`expect`** function) if the mocked **`axios.post`** method was called with specific arguments during the **`handler`** execution.The expected arguments are a URL constructed with **`cicBaseUrl`**, a data object **`{ codeType: 'symptom' }`**, and specific headers.


The following code creates a variabled, `mockedAxios`.


```javascript
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue({
  data: {
    "data:": [
      {
        "items": [
          {
            "codeS": "A0100140",
            "codeNameS": "E001 Overheating of heat exchanger"
          },
          {
            "codeS": "A0100160",
            "codeNameS": "E792 Abnormal operation: DHW circulation"
          }
        ],
        "codeM": "A0100012",
        "codeNameM": "Error Code"
      }
    ]
  }
})
```


## Mock popular libraries


### axios


Use the default `axios`


Let’s say you have a helper function like the below and you want to mock it in your test. 


As `axios()` is the default export, you have to add `_esModule` and `default` in `jest.mock()`


```typescript
import axios from 'axios'

export async function axiosPost(
  url: string,
  data: any,
  ): Promise<[number, any]> {

  const response = await axios({
    url,
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data,
  })

  return [response.status, response.data]
}
```


```typescript
import axios from 'axios'

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(Promise.resolve({
    status: 200,
    data: {},
  }))
}))

it('should return a 201 response when a company is created', async () => {
    const request = {
      body: JSON.stringify({
        businessName: 'businessName',
        postcode: 'postcode',
        gasSafeNumber: 'gasSafeNumber',
        address: 'address',
      })
    } as APIGatewayProxyEvent

    const response = await handler(request)

    expect(response.statusCode).toEqual(statusCodes.CREATED)
    expect(response.body).toContain('A company was created successfully')
    expect(axios).toHaveBeenCalledTimes(1)
  })
```


### aws-sdk-client-mock


Easy and powerful mocking of AWS SDK v3 Clients.


```typescript
import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const ddbMock = mockClient(DynamoDBDocumentClient)
ddbMock.on(PutCommand).resolves({
  $metadata: {
    httpStatusCode: Number(statusCodes.CREATED),
  }
})

it('should return a 201 response when a company is created', async () => {
  const request = {
    body: JSON.stringify({
      businessName: 'businessName',
      postcode: 'postcode',
      gasSafeNumber: 'gasSafeNumber',
      address: 'address',
    })
  } as APIGatewayProxyEvent

  const response = await handler(request)

  expect(response.statusCode).toEqual(statusCodes.CREATED)
  expect(response.body).toContain('A company was created successfully')
  expect(ddbMock.calls()).toHaveLength(1)
  expect(axios).toHaveBeenCalledTimes(1)
})
```


## `spyOn`


**`spyOn`** is a method provided by Jest that allows you to create a mock function (i.e., a spy) that wraps the original function. A spy allows you to monitor the behaviour of the original function, including how many times it was called, what arguments it was called with, and what it returned.


`spyOn` is not hoisted to the beginning of the module, so you can use it within the test. If you want to mock the import functions differently depending on your test scenario, I recommend using `spyOn`, rather `mock`. One thing to make sure is you have to import the whole module as `*` to use `spyOn`. `spyOn` doesn’t provide syntax like `spyOn('.../module', 'functioin name')`


	### Mocking


```typescript
import * as usersService from '../common/services/users'

it('should not create registration if user does not exist', async () => {
  jest
    .spyOn(usersService, 'getUser')
    .mockResolvedValueOnce([{} as any, statusCodes.NOT_FOUND, 'User not found'])

  const response = await handler(proxyEvent as any, {} as any)

  expect(response.statusCode).toEqual(statusCodes.NOT_FOUND)
  expect(upsertRegistrationMongo).toBeCalledTimes(0)
  expect(upsertRegistrationDynamo).toBeCalledTimes(0)
})

```


### Verification


```typescript
import graphApi from './graphApi'
const spy = jest.spyOn(graphApi, 'useGetNodesQuery`);

it('renders all the components', () => {
	render(<ReviewGraph />)

  waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
})
```


## Verification


Verification with `jest.mock`


```typescript
import { createRegistration } from './registrations'
import { upsertRegistration } from '../repositories'
import dayjs from 'dayjs'

const today = new Date()

jest.mock('../repositories/registrations', () => ({
  upsertRegistration: jest.fn(),
}))

describe('registrations', () => {
  it('should create a registration with registrationDate', async () => {
    const registration = {
      userId: 'userId',
      registrationId: 'registrationId',
      serialNumber: 'serialNumber',
      model: 'model',
      installationDate: '2021-01-01',
      firstName: 'firstName',
      lastName: 'lastName',
      contactNo: 'contactNo',
      emailAddress: 'emailAddress',
      door: 'door',
      street: 'street',
      county: 'county',
      city: 'city',
      postcode: 'postcode',
      country: 'country',
    }

    await createRegistration(registration)

    expect(upsertRegistration).toHaveBeenCalledWith({
      ...registration,
      postCode: 'postcode',
      registrationDate: dayjs(today).format('DD/MM/YYYY'),
      registrationDateIso: expect.any(String),
      updateDateIso: expect.any(String),
      warrantyDate: '',
      warrantyYear: -1,
    })
  })
})
```


Use `expect.any(String)`and `expect.any(Number)` if the values are not important.


Verification with `spyOn`


## Use cases


### Fail on the first error


If you have too many tests and it’s difficult to locate failing tests, use `bail` feature to make the jest run fail at the first error.


In config


```typescript
module.exports = {  
  // stop after first failing test
  bail: true

  // stop after 3 failed tests
  bail: 3
}
```


Using cli,


```shell
jest --bail 1
```


## Errors


### Cannot use import statement outside a module


The error message "Cannot use import statement outside a module" typically occurs when trying to run Jest tests on code that uses ES6 import syntax without properly configuring Jest to handle this syntax. This error is commonly seen in projects that are set up with a mix of CommonJS (`require`/`module.exports`) and ES6 (`import`/`export`) module syntaxes, or when a dependency (like `react-force-graph` in your case) is distributed as an ES6 module.


Jest, by default, operates in a Node.js environment and expects CommonJS modules. Node.js has only recently started supporting ES6 modules natively, and many tools and libraries are still catching up.


```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // This is important for Jest
        },
      },
    ],
    '@babel/preset-react',
  ],
};
```


```javascript
// jest.config.js, minimum set up
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'],
}
```


### Cannot use import statement outside a module error with a specific package


If `react-force-graph` or any other external module is causing issues during testing and you don't need to test its implementation details, consider mocking it in your tests.


```javascript
jest.mock('react-force-graph', () => ({
  // Mock implementation or just return a dummy component
}));
```


### ReferenceError: Cannot access 'users' before initialisation


The error occurs when you use `mockReturnValue` because the **`jest.mock()`** function is hoisted above the **`users`** array, causing the **`users`** array to be referenced before it is initialised.


To fix this issue, use the **`jest.mock()`** factory parameter to access the **`users`** array after it has been initialised.


```typescript
import { handler } from '../../../src/get-user/index'
import { getUsers } from '../../../src/common/usersRepository'

const users = [
  {
    companyId: 'CT01',
    email: 'first.last@navienuk.com',
    companyName: 'London Service Center',
    firstname: 'first',
    gasSafetyNumber: '000000',
    lastname: 'lasts',
    oftecNumber: 'C000000',
  },
]
jest.mock('../../../src/common/usersRepository', () => ({
  getUsers: jest.fn().mockImplementation(() => [users, '200', '']),
}))

describe('getUsers', () => {
  const event = {
    queryStringParameters: {
      companyId: 'companyId',
    },
  }

  it('should return users by the companyId', async () => {
    const result = await handler(event)

    expect(result.statusCode).toEqual('200')
    expect(result.body).toEqual(
      JSON.stringify({
        data: users,
        message: 'Success',
      })
    )
    expect(getUsers).toHaveBeenCalledWith('companyId')
  })
})
```


