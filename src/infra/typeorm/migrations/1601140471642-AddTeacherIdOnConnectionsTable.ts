import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTeacherIdOnConnectionsTable1601140471642
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'connections',
			new TableColumn({
				name: 'teacher_id',
				type: 'varchar',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('connections', 'teacher_id');
	}
}
