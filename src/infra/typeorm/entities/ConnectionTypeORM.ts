import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import Connection from '../../../domain/models/Connection';

@Entity('connections')
class ConnectionTypeORM implements Connection {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@Column()
	teacher_id: string;
}

export default ConnectionTypeORM;
