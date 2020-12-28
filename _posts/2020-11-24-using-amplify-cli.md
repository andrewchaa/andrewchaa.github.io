---
title: Using Amplify CLI
date: 2020-11-24T16:54:34
categories:
  - technical
---


### [To install the CLI](https://docs.amplify.aws/cli/start/install)

```bash
npm i -g @aws-amplify/cli
```

To configure

```bash
amplify configure

Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console
```

Once the user is created, Amplify CLI will ask you to provide the `accessKeyId` and the `secretAccessKey` to connect Amplify CLI with your newly created IAM user.

```text
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

### Amplify commands

amplify &lt;command&gt; &lt;subcommand&gt;

|  |  |
| :--- | :--- |
| init | Initializes a new project, sets up deployment resources in the cloud, and makes your project ready for Amplify. |
| configure | Configures the attributes of your project for amplify-cli, such as switching front-end framework and adding/removing cloud-provider plugins.                                |
| push | Provisions cloud resources with the latest local developments |
| publish | Executes amplify push, and then builds and publishes client-side application for hosting |
| serve | Executes amplify push, and then executes the project's start command to test run the client-side application locally |
| status | Shows the state of local resources not yet pushed to the cloud \(Create/Update/Delete\) |
| delete | Deletes all of the resources tied to the project from the cloud |
| &lt;category&gt; add | Adds a resource for an Amplify category in your local backend |
| &lt;category&gt; update | Update resource for an Amplify category in your local backend |
| &lt;category&gt; push | Provisions all cloud resources in a category with the latest local developments |
| &lt;category&gt; remove | Removes a resource for an Amplify category in your local backend |
| &lt;category&gt; | Displays subcommands of the specified Amplify category |
| mock | Run mock server for testing categories locally |
| codegen | Generates GraphQL statements\(queries, mutations and eventHandlers\) and type annotations |
| env | Displays and manages environment related information for your Amplify project |
| console | Opens the web console for the selected cloud resource |

               .                 

