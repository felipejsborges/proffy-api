import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import ClassTypeORM from './ClassTypeORM';
import User from '../../../domain/models/User';

@Entity('users')
class UserTypeORM implements User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column({ nullable: true })
	avatar?: string;

	@Column()
	whatsapp?: string;

	@Column()
	bio?: string;

	@OneToMany(() => ClassTypeORM, classItem => classItem.user)
	class: ClassTypeORM;

	@Expose({ name: 'avatar_url' })
	getAvatarUrl(): string | null {
		return this.avatar
			? `${process.env.APP_API_URL}/files/${this.avatar}`
			: null;
	}
}

export default UserTypeORM;
