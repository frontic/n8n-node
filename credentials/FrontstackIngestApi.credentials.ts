import { IAuthenticateGeneric, ICredentialType, INodeProperties } from "n8n-workflow";

export class FrontstackIngestApi implements ICredentialType {
  name = 'frontstackIngestApi';

  displayName = 'Frontstack Ingest API Credentials';
  
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
}
