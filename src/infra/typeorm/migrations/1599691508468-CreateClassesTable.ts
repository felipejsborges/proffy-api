import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassesTable1599691508468 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'classes',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: `uuid_generate_v4()`,
					},
					{
						name: 'subject',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'cost',
						type: 'decimal',
						precision: 5,
						scale: 2,
						isNullable: false,
					},
					{
						name: 'user_id',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('classes');
	}
}
