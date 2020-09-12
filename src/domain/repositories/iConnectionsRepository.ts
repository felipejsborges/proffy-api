import Connection from '../models/Connection';

export interface createConnectionDTO {
	user_id: string;
}

export default interface iConnectionsRepository {
	create(data: createConnectionDTO): Promise<Connection>;
	countTotal(): Promise<number>;
}
