import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1784739250961 implements MigrationInterface {
    name = 'Mig1784739250961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "CandidateID" integer NOT NULL, "CandidateName" character varying NOT NULL, "AGE_YR" integer NOT NULL, "Gender" character varying NOT NULL, "PoliticalPartyName" character varying NOT NULL, "SYMBOLCODE" integer NOT NULL, "SymbolName" character varying NOT NULL, "CTZDIST" character varying NOT NULL, "DistrictName" character varying NOT NULL, "StateName" character varying NOT NULL, "STATE_ID" integer NOT NULL, "SCConstID" integer NOT NULL, "ConstName" integer NOT NULL, "TotalVoteReceived" integer NOT NULL, "R" integer NOT NULL, "E_STATUS" character varying, "DOB" integer NOT NULL, "FATHER_NAME" character varying NOT NULL, "SPOUCE_NAME" character varying NOT NULL, "QUALIFICATION" character varying NOT NULL, "NAMEOFINST" character varying NOT NULL, "EXPERIENCE" character varying NOT NULL, "OTHERDETAILS" character varying NOT NULL, "ADDRESS" character varying NOT NULL, "PROFILE_IMAGE" character varying NOT NULL, "PARTY_LOGO" character varying NOT NULL, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "middleName" character varying, "lastName" character varying, "fullName" character varying, "gender" character varying, "registerType" character varying NOT NULL DEFAULT 'EMAIL', "email" character varying, "phoneNumber" character varying, "address" character varying, "password" character varying, "profileImage" character varying, "roleId" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
