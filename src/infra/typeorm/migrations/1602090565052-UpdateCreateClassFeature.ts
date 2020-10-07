import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class UpdateCreateClassFeature1602090565052
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('favorited_teachers');

		await queryRunner.createTable(
			new Table({
				name: 'favorited_classes',
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
						name: 'class_id',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'favorited_classes',
			new TableForeignKey({
				name: 'classInFavoritedClassesFK',
				columnNames: ['class_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'classes',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'favorited_classes',
			'classInFavoritedClassesFK',
		);

		await queryRunner.dropTable('favorited_classes');

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
	}
}
