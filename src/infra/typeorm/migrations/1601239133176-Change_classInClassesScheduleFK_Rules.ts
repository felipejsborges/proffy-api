import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class ChangeClassInClassesScheduleFKRules1601239133176
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'classes_schedules',
			'classInClassesScheduleFK',
		);

		await queryRunner.createForeignKey(
			'classes_schedules',
			new TableForeignKey({
				name: 'classInClassesScheduleFKv2',
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
			'classes_schedules',
			'classInClassesScheduleFKv2',
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
}
