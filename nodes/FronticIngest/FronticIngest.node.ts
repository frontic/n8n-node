import { IExecuteFunctions, IHttpRequestOptions, INodeType, INodeTypeDescription, NodeConnectionTypes, NodeOutput } from 'n8n-workflow';

export class FronticIngest implements INodeType {

  description: INodeTypeDescription = {
    displayName: 'Frontic Ingest API',
    name: 'fronticIngest',
    icon: 'file:frontic.svg',
    group: ['input'],
    version: [1, 0, 0],
    description: 'Send data to Frontics Ingest API',
    defaults: {
      name: 'Frontic Ingest API',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    documentationUrl: 'https://docs.frontic.com/reference/ingest-api',
    credentials: [
      {
        displayName: 'Frontic Ingest API Credentials',
        name: 'fronticIngestApi',
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

    const credentials = await this.getCredentials('fronticIngestApi');

    let endpoint: string;
    if (this.getNodeParameter('ingestOperation', 0, 'upsert') === 'upsert') {
      endpoint = credentials.upsertEndpoint as string;
    } else {
      endpoint = credentials.deleteEndpoint as string;
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

    responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'fronticIngestApi', options);

    return [this.helpers.returnJsonArray(responseData)];
  }
}
