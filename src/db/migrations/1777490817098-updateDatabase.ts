import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1777490817098 implements MigrationInterface {
    name = 'UpdateDatabase1777490817098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room\` (\`room_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(55) NOT NULL, \`type\` varchar(55) NOT NULL, \`status\` bit NOT NULL, \`comments\` text NOT NULL, PRIMARY KEY (\`room_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`schedule_id\` int NOT NULL AUTO_INCREMENT, \`startTime\` varchar(55) NOT NULL, \`endTime\` varchar(55) NOT NULL, \`staff\` varchar(55) NOT NULL, \`room_id\` int NULL, PRIMARY KEY (\`schedule_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_017c44638c80d285dd42221f460\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`room_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_017c44638c80d285dd42221f460\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP TABLE \`room\``);
    }

}
