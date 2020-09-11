import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import ClassTypeORM from './ClassTypeORM';
import User from '../../../domain/models/User';

@Entity('users')
export default class UserTypeORM implements User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	avatar?: string;

	@Column()
	whatsapp?: string;

	@Column()
	bio?: string;

	@OneToMany(() => ClassTypeORM, classItem => classItem.user)
	class: ClassTypeORM;
}
