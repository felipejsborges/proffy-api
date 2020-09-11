import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateClassesSchedulesTable1599692119303
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'classes_schedules',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: `uuid_generate_v4()`,
					},
					{
						name: 'week_day',
						type: 'integer',
						isNullable: false,
					},
					{
						name: 'from',
						type: 'integer',
						isNullable: false,
					},
					{
						name: 'to',
						type: 'integer',
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
			'classes_schedules',
			new TableForeignKey({
				name: 'classInClassesScheduleFK',
				columnNames: ['class_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'classes',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'classes_schedules',
			'classInClassesScheduleFK',
		);
		await queryRunner.dropTable('classes_schedules');
	}
}
