import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import ClassTypeORM from './ClassTypeORM';
import User from '../../../domain/models/User';
import FavoritedTeacherTypeORM from './FavoritedTeacherTypeORM';

@Entity('users')
class UserTypeORM implements User {
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

	@OneToMany(
		() => FavoritedTeacherTypeORM,
		favoritedTeacher => favoritedTeacher.teacher,
	)
	favoritedTeacher: FavoritedTeacherTypeORM[];
}

export default UserTypeORM;
