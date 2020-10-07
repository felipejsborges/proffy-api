import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

import FavoritedClass from '../../../domain/models/FavoritedClass';
import ClassTypeORM from './ClassTypeORM';

@Entity('favorited_classes')
class FavoritedClassTypeORM implements FavoritedClass {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@Column()
	class_id: string;

	@ManyToOne(() => ClassTypeORM, classItem => classItem.favoritedClass, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		eager: true,
	})
	@JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
	class: ClassTypeORM;
}

export default FavoritedClassTypeORM;
