import { EngineResponse, IExecuteFunctions, IHttpRequestOptions, NodeConnectionTypes, NodeOutput } from 'n8n-workflow';
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
    properties: [
      {
        displayName: 'Upsert Endpoint',
        name: 'upsertEndpoint',
        type: 'string',
        default: 'https://ingest-some-id.frontstack.dev/ingest/<some-id>/upsert',
        placeholder: 'https://ingest-some-id.frontstack.dev/ingest/<some-id>/upsert',
        description: 'Find this endpoint in your integration feed setup',
      },
      {
        displayName: 'Delete Endpoint',
        name: 'deleteEndpoint',
        type: 'string',
        default: 'https://ingest-some-id.frontstack.dev/ingest/<some-id>/delete',
        placeholder: 'https://ingest-some-id.frontstack.dev/ingest/<some-id>/delete',
        description: 'Find this endpoint in your integration feed setup',
      },
      {
        displayName: 'Ingest Operation',
        name: 'ingestOperation',
        type: 'options',
        noDataExpression: true,
        options: [{
          name: 'Upsert',
          value: 'upsert',
        }, {
          name: 'Delete',
          value: 'delete',
        }],
        default: 'upsert',
      }
    ],
  };

  async execute(this: IExecuteFunctions, response?: EngineResponse): Promise<NodeOutput> {
    const rawPayload = this.getInputData();

    let ingestPayload = []

    let responseData: any = [];

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

    responseData = await this.helpers.requestWithAuthentication.call(this, 'frontstackIngestApi', options);

    return [this.helpers.returnJsonArray(responseData)];
  }
}
