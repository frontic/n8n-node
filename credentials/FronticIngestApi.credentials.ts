import {
	IAuthenticateGeneric,
	Icon,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';
import { version } from '../package.json';

export class FronticIngestApi implements ICredentialType {
	name = 'fronticIngestApi';

	displayName = 'Frontic Ingest API';

	icon: Icon = 'file:frontic.svg';

	documentationUrl = 'https://docs.frontic.com/reference/ingest-api';

	properties: INodeProperties[] = [
		{
			displayName:
				'Create a new Ingest API key in your <a href="https://app.frontic.com/settings/secrets" target="_blank">Frontic Settings</a>',
			name: 'docsNotice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			description: 'Create a new Ingest API key in your Frontic project settings',
			typeOptions: {
				password: true,
			},
			required: true,
		},
		{
			displayName: 'Upsert Endpoint',
			name: 'upsertEndpoint',
			type: 'string',
			default: '',
			placeholder: 'https://ingest-TOKEN.frontic.com/ingest/-TOKEN-/upsert',
			description: 'Find this endpoint in your integration feed setup',
			required: true,
		},
		{
			displayName: 'Delete Endpoint',
			name: 'deleteEndpoint',
			type: 'string',
			default: '',
			placeholder: 'https://ingest-TOKEN.frontic.com/ingest/-TOKEN-/delete',
			description: 'Find this endpoint in your integration feed setup',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
				'User-Agent': 'frontic-n8n-nodes-ingest/' + version,
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: '={{$credentials.upsertEndpoint}}',
			headers: {
				Authorization: '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
				'User-Agent': 'frontic-n8n-nodes-ingest/' + version,
			},
			body: {
				data: [],
			},
		},
	};
}
