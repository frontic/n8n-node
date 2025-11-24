# n8n-nodes-frontstack

This is an n8n community node. It lets you use Frontstack Ingest API in your n8n workflows.

Frontstack is a data ingestion and synchronization platform that allows you to send data to your Frontstack project through RESTful API endpoints. The Frontstack Ingest Node enables you to seamlessly integrate Frontstack's data ingestion capabilities into your n8n automation workflows, allowing you to upsert or delete data records programmatically.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Frontstack Ingest Node supports the following operations:

- **Upsert**: Send data to Frontstack's upsert endpoint to create or update records in your Frontstack project. The node accepts input data from previous nodes in your workflow and sends it as a JSON array to the configured upsert endpoint.

- **Delete**: Send data to Frontstack's delete endpoint to remove records from your Frontstack project. Similar to upsert, it processes input data and sends it to the configured delete endpoint.

## Credentials

To use the Frontstack Ingest Node, you need to authenticate with Frontstack using an API key.

### Prerequisites

1. You need a Frontstack account and project
2. You need to create an Ingest API key in your Frontstack project settings

### Setting up credentials

1. In your n8n workflow, add the Frontstack Ingest Node
2. Click on the credentials field and select "Create New"
3. Navigate to your [Frontstack Settings](https://app.frontstack.dev/settings/secrets) to create a new Ingest API key
4. Copy the API key and paste it into the "API Key" field in the credentials form
5. Save the credentials

The API key will be automatically included in the Authorization header of all requests made to Frontstack's Ingest API.

## Compatibility

- **Minimum n8n version**: Compatible with n8n workflows that support n8n Nodes API version 1
- **Node version**: 1.0.0

## Usage

### Configuring the Node

1. **Upsert Endpoint**: Enter your Frontstack upsert endpoint URL. You can find this endpoint in your integration feed setup in the Frontstack dashboard. The format is typically: `https://ingest-<project-id>.frontstack.dev/ingest/<feed-id>/upsert`

2. **Delete Endpoint**: Enter your Frontstack delete endpoint URL. Similar to the upsert endpoint, you can find this in your integration feed setup. The format is typically: `https://ingest-<project-id>.frontstack.dev/ingest/<feed-id>/delete`

3. **Ingest Operation**: Select the operation you want to perform:
   - **Upsert**: To create or update records
   - **Delete**: To remove records

### How It Works

The Frontstack Ingest Node processes data from previous nodes in your workflow:

1. **Input Processing**: The node collects all input items from the previous node(s) in your workflow
2. **Data Transformation**: Each input item's JSON data is extracted and added to an array
3. **API Request**: The node sends a POST request to the selected endpoint (upsert or delete) with the array of data as the request body
4. **Response**: The API response is returned and can be used by subsequent nodes in your workflow

### Example Workflow

A typical use case might involve:
1. Fetching data from a source (e.g., a database, API, or file)
2. Transforming the data using n8n's data transformation nodes
3. Using the Frontstack Ingest Node to send the transformed data to Frontstack
4. Processing the response or triggering additional actions

The node accepts any JSON data structure, making it flexible for various data formats and use cases.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Frontstack Ingest API Documentation](https://docs.frontstack.dev/reference/ingest-api)
* [Frontstack Settings](https://app.frontstack.dev/settings/secrets)

### Test the node

To test the node, follow these steps:

1. Install n8n globally
   ```bash
   npm install n8n -g
   ```

2. Publish the node locally (inside the n8n-nodes-frontstack directory)
   ```bash
   npm run build 
   npm link
   ```

3. Install the node in n8n (inside the n8n directory)
   ```bash
   cd ~/.n8n/custom
   npm link n8n-nodes-frontstack
   ```

4. Start n8n
   ```bash
   n8n start
   ```

**Troubleshooting:**

If the directory `~/.n8n/custom` does not exist, start `n8n` once (this will create `~/.n8n`) and then run 

```bash
# Inside the ~/.n8n directory
mkdir custom 
cd custom 
npm init
```

and continue with step 3.