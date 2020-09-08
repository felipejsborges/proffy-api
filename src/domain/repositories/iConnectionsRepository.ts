export interface createConnectionDTO {
	user_id: number;
}

export default interface iConnectionsRepository {
	create(data: createConnectionDTO): Promise<void>;
	index(): Promise<number>;
}
