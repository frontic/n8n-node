import { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties, ICredentialTestRequest } from "n8n-workflow";

export class FrontstackIngestApi implements ICredentialType {
  name = 'frontstackIngestApi';

  displayName = 'Frontstack Ingest API';

  icon: Icon = 'file:frontstack.svg';

  documentationUrl = 'https://docs.frontstack.dev/reference/ingest-api';
  
  properties: INodeProperties[] = [
    {
      displayName: 'Create a new Ingest API key in your <a href="https://app.frontstack.dev/settings/secrets" target="_blank">Frontstack Settings</a>',
      name: 'docsNotice',
      type: 'notice',
      default: '',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      description: 'Create a new API key in your Frontstack project settings',
      typeOptions: {
        password: true,
      },
      required: true,
    },
    {
      displayName: 'Upsert Endpoint',
      name: 'upsertEndpoint',
      type: 'string',
      default: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/upsert',
      placeholder: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/upsert',
      description: 'Find this endpoint in your integration feed setup',
      required: true,
    },
    {
      displayName: 'Delete Endpoint',
      name: 'deleteEndpoint',
      type: 'string',
      default: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/delete',
      placeholder: 'https://ingest-project-hash.frontstack.dev/ingest/feed-hash/delete',
      description: 'Find this endpoint in your integration feed setup',
      required: true,
    }
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '={{$credentials.apiKey}}',
      }
    }
  };
  
  test: ICredentialTestRequest = {
    request: {
      method: 'POST',
      url: '={{$credentials.upsertEndpoint}}',
      headers: {
        'Authorization': '={{$credentials.apiKey}}',
        'Content-Type': 'application/json',
      },
      body: {
        data: [],
      },
    }
  };  
}
