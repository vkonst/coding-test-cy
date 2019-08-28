import Client from '../models/atmClient/atmClient.interface';
import Service from './service';
import IService from './service.interface';

const mockClient: Client = {
    id: '333',
    name: 'Henry M. Dee',
    password: '<some_hash>',
    status: undefined,
};

class AtmClientService extends Service implements IService<Client> {
    public async find(id: string): Promise<Client | undefined> {
        AtmClientService.log.debug(`Find a client with id=${id}`);
        return Promise.resolve(id === mockClient.id ? mockClient : undefined);
    }

    public async create(client: Client): Promise<Client> {
        throw new Error('atmClient.create not yet implemented');
    }

    public async delete(id: string): Promise<Client> {
        throw new Error('atmClient.delete not yet implemented');
    }

    public async authenticate(client: Client): Promise<boolean> {
        AtmClientService.log.debug(`authenticate a client with id=${client.id}`);
        return Promise.resolve(client.id === mockClient.id);
    }
}

const atmService = AtmClientService.Instance;
