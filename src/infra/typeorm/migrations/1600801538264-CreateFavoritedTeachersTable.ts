import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateFavoritedTeachersTable1600801538264
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'favorited_teachers',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: `uuid_generate_v4()`,
					},
					{
						name: 'user_id',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'teacher_id',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'favorited_teachers',
			new TableForeignKey({
				name: 'userInFavoritedTeachersFK',
				columnNames: ['teacher_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'favorited_teachers',
			'userInFavoritedTeachersFK',
		);
		await queryRunner.dropTable('favorited_teachers');
	}
}
