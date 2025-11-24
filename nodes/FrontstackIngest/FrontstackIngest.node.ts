import { IExecuteFunctions, IHttpRequestOptions, NodeConnectionTypes, NodeOutput } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class FrontstackIngest implements INodeType {

  description: INodeTypeDescription = {
    displayName: 'Frontstack Ingest API',
    name: 'frontstackIngest',
    icon: 'file:frontstack.svg',
    group: ['input'],
    version: [1, 0, 0],
    description: 'Send data to Frontstacks Ingest API',
    defaults: {
      name: 'Frontstack Ingest API',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    documentationUrl: 'https://docs.frontstack.dev/reference/ingest-api',
    credentials: [
      {
        displayName: 'Frontstack Ingest API Credentials',
        name: 'frontstackIngestApi',
        required: true,
      },
    ],
    requestDefaults: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    },
    usableAsTool: true,
    properties: [
      {
        displayName: 'Upsert Endpoint',
        name: 'upsertEndpoint',
        type: 'string',
        default: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/upsert',
        placeholder: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/upsert',
        description: 'Find this endpoint in your integration feed setup',
      },
      {
        displayName: 'Delete Endpoint',
        name: 'deleteEndpoint',
        type: 'string',
        default: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/delete',
        placeholder: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/delete',
        description: 'Find this endpoint in your integration feed setup',
      },
      {
        displayName: 'Ingest Operation',
        name: 'ingestOperation',
        type: 'options',
        noDataExpression: true,
        options: [{
          name: 'Create or Update',
          value: 'upsert',
        }, {
          name: 'Delete',
          value: 'delete',
        }],
        default: 'upsert',
      }
    ],
  };

  async execute(this: IExecuteFunctions): Promise<NodeOutput> {
    const rawPayload = this.getInputData();

    const ingestPayload = [];

    let responseData = [];

    let endpoint: string;
    if (this.getNodeParameter('ingestOperation', 0, 'upsert') === 'upsert') {
      endpoint = this.getNodeParameter('upsertEndpoint', 0, '') as string;
    } else {
      endpoint = this.getNodeParameter('deleteEndpoint', 0, '') as string;
    }

    for (const item of rawPayload) {
      ingestPayload.push(item.json);
    }

    const options: IHttpRequestOptions = {
      url: endpoint,
      method: 'POST',
      body: ingestPayload,
      json: true,
    };

    responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'frontstackIngestApi', options);

    return [this.helpers.returnJsonArray(responseData)];
  }
}
