import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import UserTypeORM from './UserTypeORM';

@Entity('favorited_teachers')
class FavoritedTeacherTypeORM implements FavoritedTeacher {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@Column()
	teacher_id: string;

	@ManyToOne(() => UserTypeORM, user => user.favoritedTeacher, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		eager: true,
	})
	@JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
	teacher: UserTypeORM;
}

export default FavoritedTeacherTypeORM;
